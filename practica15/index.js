let numero = 5;
console.log("El número es:", numero);

const express=require('express');
const app=express();
const port=3000;

app.get('/', (req, res) => {
  res.send('Hola Mundo, de la página principal');
});

app.get('/contact', (req, res) => {
  res.send('Hola Mundo, sección de contacto');
});

app.get('/about', (req, res) => {
  res.send('Hola Mundo, sección de acerca de');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});