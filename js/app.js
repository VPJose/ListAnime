//VARIABLES
var formulaio = document.getElementById("Formulario");
var resultado = document.getElementById('resultado');

//EVENTOS
formulaio.addEventListener('submit', e => {
  e.preventDefault();
  var bsq = document.querySelector('.search').value;

  fetch(` https://api.jikan.moe/v3/search/anime?q=${bsq}&limit=30`)
  .then( res => {
    return res.json();
  })
  .then(res => {
    mostrar(res.results);
  })
  .catch( err =>  alert( "Error: " + err) );
});

resultado.addEventListener('click', e => {
  e.preventDefault();

  const tarjeta = e.target.parentElement;
  const pantalla = e.target.parentElement.parentElement;

  if ((pantalla.className == "pantalla") && (tarjeta.tagName == "FIGURE")) {
    tarjeta.classList.add("voltiar");
    pantalla.classList.add("activo");
  }

});

window.addEventListener('click', e => {

  const close = e.target;
  const ventana = e.target;
  if (close.className == "close") {
    const tarjeta = close.parentElement.parentElement;
    const pantalla = tarjeta.parentElement;
    console.log(tarjeta);
    console.log(pantalla);
    tarjeta.classList.remove("voltiar");
    pantalla.classList.remove("activo");
  }else if (ventana.className == "pantalla activo") {
    const tarjeta = ventana.firstElementChild;
    const pantalla = ventana;
    tarjeta.classList.remove("voltiar");
    pantalla.classList.remove("activo");
  }

});

//FUNCIONES
function mostrar(res) {
  var respuesta = document.getElementById('respuesta');

  while (respuesta) {
    resultado.removeChild(respuesta);
    var respuesta = document.getElementById('respuesta');
  }

  for (var i = 0; i < res.length; i++) {

    resultado.innerHTML += `
    <div id="respuesta" class="contenedor-tarjeta">
      <div class="pantalla">
        <figure>
          <img src="${res[i].image_url}" alt="" class="frontal">
          <h3 class="card-type ${res[i].type}">${res[i].type}</h3>
          <figcaption class="trasera">
            <div id="close" class="close">X</div>
            <h3 class="card-title">${res[i].title}</h3>
            <hr>
            <p>${res[i].synopsis}</p>
          </figcaption>
        </figure>
      </div>
    </div>
    `;
  }

}
