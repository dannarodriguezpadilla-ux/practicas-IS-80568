document.addEventListener('DOMContentLoaded', () => {
  // --- Helpers ---
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // --- UI refs ---
  const lista = $('#listaCanciones');
  const heroCover = $('#heroCover');
  const songCount = $('#songCount');
  const totalTimeEl = $('#totalTime');
  const btnPlayAll = $('#btnPlayAll');
  const btnShuffle = $('#btnShuffle');
  const searchInput = $('#searchInput');
  const sortSelect = $('#sortSelect');
  const toastEl = $('#appToast');
  const toastMsg = $('#toastMsg');
  const toastUndo = $('#toastUndo');
  const modeToggle = $('#modeToggle');
  const iconTheme = $('#iconTheme');

  const toast = new bootstrap.Toast(toastEl, { delay: 2600 });

  // === Tema claro/oscuro (persistente) ===
  const THEME_KEY = 'miMusica.theme';
  const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(mode){
    document.documentElement.setAttribute('data-theme', mode);
    iconTheme.className = `bi ${mode === 'dark' ? 'bi-brightness-high' : 'bi-moon-stars'}`;
  }
  (function initTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    applyTheme(saved ?? (prefersDark() ? 'dark' : 'light'));
    if (!saved && window.matchMedia){
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', e => applyTheme(e.matches ? 'dark' : 'light'));
    }
  })();
  modeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || (prefersDark() ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  // === Data & storage ===
  const STORAGE_KEY = 'miMusica.playlist.v1';
  const defaultSongs = [
    { id:'1', title:'el sur', artist:'Çantamarta & Tony Grox', album:'nomeolvides', image:'img/1.jpeg', preview:'audio/elsur.mp3', appleMusicUrl:'https://music.apple.com/mx/album/el-sur/1826979360?i=1826979375', duration:15 },
    { id:'2', title:'Nothing Matters', artist:'The Last Dinner Party', album:'Prelude to Ecstasy', image:'img/3.jpg', preview:'audio/nothingmatters.mp3', appleMusicUrl:'https://music.apple.com/mx/album/nothing-matters/1716063932?i=1716065012', duration:15 },
    { id:'3', title:'BBY ROMEO', artist:'Rusowsky y Raplhie Choo', album:'Daisy', image:'img/2.jpeg', preview:'audio/comesifa.mp3', appleMusicUrl:'https://music.apple.com/mx/album/bby-romeo/1810536328?i=1810536332', duration:15 },
    { id:'4', title:'No One Noticed', artist:'The Marías', album:'Submarine', image:'img/4.png', preview:'audio/noonenoticed.mp3', appleMusicUrl:'https://music.apple.com/mx/album/no-one-noticed/1733730985?i=1733731157', duration:15 },
    { id:'5', title:'NADIE MÁS!', artist:'Nsqk', album:'SÍSIFO / NADIE MÁS! - Single', image:'img/5.jpeg', preview:'audio/nadiemas.mp3', appleMusicUrl:'https://music.apple.com/mx/album/nadie-m%C3%A1s/1737278045?i=1737278050', duration:15 }
  ];
  let songs = load() ?? defaultSongs; save();

  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(songs)); }
  function load(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; } }

  // === Utils ===
  const mmss = s => { s = Math.max(0, Math.ceil(s)); const m=Math.floor(s/60), ss=String(s%60).padStart(2,'0'); return `${m}:${ss}`; };
  const notify = (msg, undoCb=null) => {
    toastMsg.textContent = msg;
    if (undoCb){
      toastUndo.style.display = 'inline';
      toastUndo.onclick = () => { undoCb(); toast.hide(); toastUndo.style.display='none'; };
    } else {
      toastUndo.style.display = 'none';
      toastUndo.onclick = null;
    }
    toast.show();
  };

  // === Audio preview (15s) ===
  let currentAudio = null, currentRow = null, countdownTimer = null, remaining = 0;

  function stopPlayback(){
    if (countdownTimer) clearInterval(countdownTimer); countdownTimer = null;
    if (currentAudio){ currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; }
    if (currentRow){
      currentRow.classList.remove('playing');
      const t = currentRow.querySelector('.col-time'); if (t) t.textContent = mmss(15);
      currentRow = null;
    }
  }

  function playPreview(row, song){
    stopPlayback();
    if (!song.preview) return notify('No hay muestra de audio.');
    currentRow = row; row.classList.add('playing');
    currentAudio = new Audio(song.preview);
    remaining = 15;
    const t = row.querySelector('.col-time');

    currentAudio.play().catch(()=>{ notify('No se pudo reproducir la muestra.'); stopPlayback(); });

    countdownTimer = setInterval(()=>{
      remaining -= .2;
      if (remaining <= 0) { stopPlayback(); }
      else if (t) t.textContent = mmss(remaining);
    }, 200);

    currentAudio.addEventListener('ended', stopPlayback, { once:true });
    setTimeout(stopPlayback, 15000);
  }

  // === Render ===
  function computeTotals(list){
    songCount.textContent = list.length;
    const total = list.reduce((a,s)=>a+(s.duration||0),0);
    totalTimeEl.textContent = mmss(total);
    if (list[0]) heroCover.src = list[0].image;
  }

  const rowTpl = s => `
    <div class="am-row" data-id="${s.id}">
      <div class="col-title">
        <img class="thumb" src="${s.image}" alt="Carátula de ${s.title}">
        <div class="title-wrap">
          <span class="title">${s.title}</span>
          <span class="meta d-none d-md-inline">${s.album}</span>
        </div>
      </div>
      <div class="col-artist">${s.artist}</div>
      <div class="col-album">${s.album}</div>
      <div class="col-time">${mmss(s.duration ?? 15)}</div>
      <div class="col-actions">
        <button class="icon-btn" data-action="open" title="Abrir en Apple Music"><i class="bi bi-box-arrow-up-right"></i></button>
        <button class="icon-btn icon-danger" data-action="delete" title="Eliminar"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
  `;

  const collator = new Intl.Collator('es', { sensitivity:'base' });
  const sortList = (list, key) => {
    const desc = key.startsWith('-'); const k = desc ? key.slice(1) : key;
    return [...list].sort((a,b)=>{
      if (k==='duration') return desc ? (b[k]-a[k]) : (a[k]-b[k]);
      const r = collator.compare(String(a[k]??''), String(b[k]??'')); return desc ? -r : r;
    });
  };
  const filterList = (list, q) => !q ? list : list.filter(s =>
    [s.title,s.artist,s.album].some(v => (v||'').toLowerCase().includes(q.toLowerCase()))
  );

  function render(){
    const q = searchInput.value.trim();
    const key = sortSelect.value;
    const filtered = filterList(songs, q);
    const final = sortList(filtered, key);
    lista.innerHTML = final.map(rowTpl).join('');
    computeTotals(final);

    $$('.am-row', lista).forEach(row=>{
      const id = row.dataset.id;
      const song = songs.find(s=>s.id===id);
      row.querySelector('.thumb').addEventListener('click', ()=>playPreview(row, song));
      row.addEventListener('dblclick', ()=>playPreview(row, song));
      row.querySelector('[data-action="open"]').addEventListener('click', ()=>{
        if (song.appleMusicUrl) window.open(song.appleMusicUrl, '_blank');
        else notify('Sin enlace de Apple Music.');
      });
      row.querySelector('[data-action="delete"]').addEventListener('click', ()=>deleteSong(id));
    });
  }

  // === Delete + Deshacer ===
  let lastDeleted = null, undoTimer = null;
  function deleteSong(id){
    const idx = songs.findIndex(s=>s.id===id);
    if (idx < 0) return;
    if (!confirm(`¿Eliminar "${songs[idx].title}" de la playlist?`)) return;

    if (currentRow && currentRow.dataset.id === id) stopPlayback();

    lastDeleted = { song: songs[idx], index: idx };
    songs.splice(idx,1); save(); render();

    if (undoTimer) clearTimeout(undoTimer);
    notify('Canción eliminada.', undoRestore);
    undoTimer = setTimeout(()=>{ lastDeleted=null; toast.hide(); }, 5000);
  }
  function undoRestore(){
    if (!lastDeleted) return;
    songs.splice(lastDeleted.index, 0, lastDeleted.song);
    save(); render();
    lastDeleted = null;
  }

  // === Controles ===
  btnPlayAll.addEventListener('click', () => {
    const first = $('.am-row', lista); if (!first) return;
    const song = songs.find(s=>s.id===first.dataset.id);
    playPreview(first, song);
  });
  btnShuffle.addEventListener('click', () => {
    const rows = $$('.am-row', lista); if (!rows.length) return;
    const row = rows[Math.floor(Math.random()*rows.length)];
    const song = songs.find(s=>s.id===row.dataset.id);
    playPreview(row, song);
  });
  searchInput.addEventListener('input', render);
  sortSelect.addEventListener('change', render);

  // === Init ===
  render();
});
