document.addEventListener('DOMContentLoaded', () => {
    let nc = document.getElementById("nombreCompleto");
    if(nc) nc.textContent = "Danna Rodriguez";
    let f = document.getElementById("formulario");
    let v = document.getElementById("valroRadio");
    let r = document.getElementById("resultado");
    if(f && v && r) {
        f.onsubmit = e => {
            e.preventDefault();
            let radio = parseFloat(v.value);
            r.value = (!isNaN(radio) && radio > 0) ? (3.1416 * radio * radio).toFixed(2) : "Dato inválido";
        }
    }
});