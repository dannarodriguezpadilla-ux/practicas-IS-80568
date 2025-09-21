// ===== refs =====
const form = document.getElementById("formRegistro");
const fecha = document.getElementById("fecha");
const email = document.getElementById("email");
const pass1 = document.getElementById("contrasena1");
const pass2 = document.getElementById("contrasena2");
const alertBox = document.getElementById("formAlert");

// ===== util =====
const setInvalid = (el, msg) => {
  el.classList.add("is-invalid"); el.classList.remove("is-valid");
  const fb = el.parentElement.querySelector(".invalid-feedback");
  if (fb && msg) fb.textContent = msg;
};
const setValid = (el) => { el.classList.remove("is-invalid"); el.classList.add("is-valid"); };
const clearState = (el) => el.classList.remove("is-valid","is-invalid");
const showAlert = (msg, type="success") => { alertBox.className = `alert alert-${type}`; alertBox.textContent = msg; };
const hideAlert = () => { alertBox.className = "alert d-none"; alertBox.textContent = ""; };

// ===== fecha hoy (local, sin UTC bug) =====
function setHoyLocal() {
  const d = new Date();
  const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  fecha.value = iso;    // string => respeta zona horaria local
  fecha.max = iso;      // no permitir futuro
}
setHoyLocal();

// ===== reglas =====
const validarEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
const validarPass = (v) => /^(?=.*[A-Z])(?=.*\d)\S{8,}$/.test(v);

// ===== prevenir espacios en pass =====
[pass1, pass2].forEach((el)=>{
  el.addEventListener("keydown", e => { if (e.key === " ") e.preventDefault(); });
  el.addEventListener("input", e => { e.target.value = e.target.value.replace(/\s/g,""); });
});

// ===== realtime =====
email.addEventListener("input", () => {
  hideAlert();
  const v = email.value.trim();
  if (!v) return clearState(email);
  validarEmail(v) ? setValid(email) : setInvalid(email,"Correo inválido: usa usuario@dominio.com.");
});

function validarPassRealtime() {
  hideAlert();
  const p1 = pass1.value, p2 = pass2.value;
  validarPass(p1)
    ? setValid(pass1)
    : setInvalid(pass1,"Mín. 8, 1 mayúscula, 1 número y sin espacios.");
  if (!p2) return clearState(pass2);
  p1 === p2 ? setValid(pass2) : setInvalid(pass2,"Las contraseñas no coinciden.");
}
pass1.addEventListener("input", validarPassRealtime);
pass2.addEventListener("input", validarPassRealtime);

// ===== submit =====
form.addEventListener("submit", (e) => {
  e.preventDefault(); hideAlert();

  // 1) email
  validarEmail(email.value)
    ? setValid(email)
    : setInvalid(email,"Correo inválido: usa usuario@dominio.com.");

  // 2) passwords
  const p1 = pass1.value, p2 = pass2.value;
  validarPass(p1)
    ? setValid(pass1)
    : setInvalid(pass1,"Mín. 8, 1 mayúscula, 1 número y sin espacios.");
  (p2 && p1 === p2)
    ? setValid(pass2)
    : setInvalid(pass2,"Las contraseñas no coinciden.");

  // 3) otros required (incluye fecha con checkValidity)
  let firstInvalid = null;
  form.querySelectorAll("[required]").forEach((el) => {
    if (el === email || el === pass1 || el === pass2) return; // ya validados
    if (el.type === "date" ? !el.checkValidity() : !String(el.value).trim()) {
      setInvalid(el, el.type==="date" ? "Selecciona una fecha válida." : "Este campo es obligatorio.");
      if (!firstInvalid) firstInvalid = el;
    } else {
      setValid(el);
    }
  });

  // ¿hay inválidos?
  const anyInvalid = form.querySelector(".is-invalid");
  if (anyInvalid) {
    (firstInvalid || anyInvalid).scrollIntoView({behavior:"smooth", block:"center"});
    (firstInvalid || anyInvalid).focus();
    return showAlert("Revisa los campos en rojo.", "danger");
  }

  // éxito
  showAlert("Registro exitoso", "success");
  form.reset();
  form.querySelectorAll(".is-valid,.is-invalid").forEach(clearState);
  setHoyLocal(); 
});
