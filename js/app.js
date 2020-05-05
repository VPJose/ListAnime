//Variables
var formulaio = document.getElementById("Formulario");
var resultado = document.getElementById('resultado');

formulaio.addEventListener('submit', e => {
  e.preventDefault();
  var bsq = document.querySelector('#nani').value;

  fetch(` https://api.jikan.moe/v3/search/anime?q=${bsq}&limit=30`)
  .then( res => {
    return res.json();
  })
  .then(res => {
    mostrar(res.results);
  })
  .catch( err =>  alert( "Error: " + err) );
});

function mostrar(res) {
  console.log(res[0]);
  var respuesta = document.getElementById('respuesta');

  while (respuesta) {
    resultado.removeChild(respuesta);
    var respuesta = document.getElementById('respuesta');
  }

  for (var i = 0; i < res.length; i++) {
    resultado.innerHTML += `
    <div id="respuesta" class="contenedor-tarjeta">
      <figure>
        <img src="${res[i].image_url}" alt="" class="frontal">
        <h3 class="card-type ${res[i].type}">${res[i].type}</h3>
        <figcaption class="trasera">
          <h3 class="card-title">${res[i].title}</h3>
          <hr>
          <p>${res[i].synopsis}</p>
        </figcaption>
      </figure>
    `;
  }

}
