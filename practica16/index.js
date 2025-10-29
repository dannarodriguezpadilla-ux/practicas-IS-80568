const express = require('express');
const app = express ();
const port = 3000;

app.get('/inicio', (req, res) => {
  res.send('Estás en la seccíon de inicio');
});

app.get('/producto', (req, res) => {
  res.send('Estás en la seccíon de productos');
});

app.get('/servicio', (req, res) => {
  res.send('Estás en la seccíon de servicios');
});

app.get('/proyecto', (req, res) => {
  res.send('Estás en la seccíon de proyectos');
});

app.get('/contacto', (req, res) => {
  res.send('Estas en la seccíon de contacto');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}   );