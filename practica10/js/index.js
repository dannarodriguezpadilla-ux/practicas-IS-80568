const persona = {
    nombre: "Meredith",
    apellido: "Grey",
    edad: 27,
    profesion: "Cirujana general",
    foto: "https://www.univision.com/_next/image?url=https%3A%2F%2Fst1.uvnimg.com%2F95%2Ffa%2F5b851c664e02883504c0cc65b2a5%2Fellen-pompeo-en-la-temporada-1-de-greys-anatomy.jpg&w=1280&q=75",
    direccion: {
        calle: "1234 Main St",
        ciudad: "Seattle",
        estado: "WA"
    },
    hobbies: ["leer", "escribir", "correr"]
};

const persona2 = {
    nombre: "Cristina",
    apellido: "Yang",
    edad: 26,
    profesion: "Cirujana cardiotorácica",
    foto: "https://preview.redd.it/b7dv6a8mn0l51.jpg?width=640&crop=smart&auto=webp&s=75131ea6e6fcf49e97d26da409e2b2dedc0a25c5",
    direccion: {
        calle: "1234 Main St",
        ciudad: "Seattle",
        estado: "WA"
    },
    hobbies: ["beber", "jugar"]
};

const persona3 = {
    nombre: "Alex",
    apellido: "Karev",
    edad: 30,
    profesion: "Cirujano pediátrico",
    foto: "https://preview.redd.it/ktb38qn1pdp71.jpg?auto=webp&s=53cab1b0004f5f4760cc98536e6e0fa485a70a31",
    direccion: {
        calle: "1234 Oak St",
        ciudad: "Seattle",
        estado: "WA"
    },
    hobbies: ["futbol", "correr"]
};

const persona4 = {
    nombre: "Izzie",
    apellido: "Stevens",
    edad: 28,
    profesion: "Cirujana general",
    foto: "https://s1.r29static.com/bin/entry/ea5/x,80/1882619/image.jpg",
    direccion: {
        calle: "5678 Elm St",
        ciudad: "Seattle",
        estado: "WA"
    },
    hobbies: ["pintar", "cantar"]
};

const persona5 = {
    nombre: "Derek",
    apellido: "Shepherd",
    edad: 35,
    profesion: "Neurocirujano",
    foto: "https://www.tvstyleguide.com/wp-content/uploads/2016/04/greys_anatomy_derek_shepherd_scrubs.jpg",
    direccion: {
        calle: "7890 Pine St",
        ciudad: "Seattle",
        estado: "WA"
    },
    hobbies: ["pescar", "correr"]
};

const persona6 = {
    nombre: "Miranda",
    apellido: "Bailey",
    edad: 40,
    profesion: "Cirujana general",
    foto: "https://cdn-m-net.dstv.com/images/Character/2016/09/26/63195/14/2%20x%203%20%3A%2060%20percent_Miranda_Bailey.jpg",
    direccion: {
        calle: "2345 Maple St",
        ciudad: "Seattle",
        estado: "WA"
    },
    hobbies: ["leer", "cantar"]
};


document.getElementById("foto").src = persona.foto;
document.getElementById("nombre").innerHTML = persona.nombre + " " + persona.apellido;
document.getElementById("edad").innerHTML = persona.edad + " años";
document.getElementById("profesion").innerHTML = persona.profesion;
document.getElementById("direccion").innerHTML = persona.direccion.calle + ", " + persona.direccion.ciudad + ", " + persona.direccion.estado;

let hobbies = document.getElementById("hobbies");
persona.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies.appendChild(li);
});


document.getElementById("foto2").src = persona2.foto;
document.getElementById("nombre2").innerHTML = persona2.nombre + " " + persona2.apellido;
document.getElementById("edad2").innerHTML = persona2.edad + " años";
document.getElementById("profesion2").innerHTML = persona2.profesion;
document.getElementById("direccion2").innerHTML = persona2.direccion.calle + ", " + persona2.direccion.ciudad + ", " + persona2.direccion.estado;

let hobbies2 = document.getElementById("hobbies2");
persona2.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies2.appendChild(li);
});


document.getElementById("foto3").src = persona3.foto;
document.getElementById("nombre3").innerHTML = persona3.nombre + " " + persona3.apellido;
document.getElementById("edad3").innerHTML = persona3.edad + " años";
document.getElementById("profesion3").innerHTML = persona3.profesion;
document.getElementById("direccion3").innerHTML = persona3.direccion.calle + ", " + persona3.direccion.ciudad + ", " + persona3.direccion.estado;

let hobbies3 = document.getElementById("hobbies3");
persona3.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies3.appendChild(li);
});


document.getElementById("foto4").src = persona4.foto;
document.getElementById("nombre4").innerHTML = persona4.nombre + " " + persona4.apellido;
document.getElementById("edad4").innerHTML = persona4.edad + " años";
document.getElementById("profesion4").innerHTML = persona4.profesion;
document.getElementById("direccion4").innerHTML = persona4.direccion.calle + ", " + persona4.direccion.ciudad + ", " + persona4.direccion.estado;

let hobbies4 = document.getElementById("hobbies4");
persona4.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies4.appendChild(li);
});


document.getElementById("foto5").src = persona5.foto;
document.getElementById("nombre5").innerHTML = persona5.nombre + " " + persona5.apellido;
document.getElementById("edad5").innerHTML = persona5.edad + " años";
document.getElementById("profesion5").innerHTML = persona5.profesion;
document.getElementById("direccion5").innerHTML = persona5.direccion.calle + ", " + persona5.direccion.ciudad + ", " + persona5.direccion.estado;

let hobbies5 = document.getElementById("hobbies5");
persona5.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies5.appendChild(li);
});
