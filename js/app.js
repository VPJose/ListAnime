//VARIABLES
let navFormulario = document.getElementById('nav-formulario');
let barraFormulario = document.getElementById('barra-formulario');
let buscadorFormulario = document.getElementById('formulario-busqueda')
let voltiar = document.getElementById('resultado');
let barraLateral =document.getElementById('barra-lateral');

//EVENTOS
navFormulario.addEventListener('submit', e => {
  e.preventDefault();
  formularioBusqueda('anime',e);
});

barraFormulario.addEventListener('submit', e => {
  e.preventDefault();
  formularioBusqueda('anime',e);
  desplazarFormulario(e);
});

buscadorFormulario.addEventListener('submit', e => {
  e.preventDefault()
  const tipo = e.target.firstElementChild.childNodes[1].value;
  const bsq = e.target.firstElementChild.childNodes[3].value;

  if ((tipo !== "tipo") && (bsq !== "")) {
    formularioBusqueda(tipo,bsq);
  }else {
    alert("falta un parametro");
  }


});

voltiar.addEventListener('click', e => {
  e.preventDefault();

  const tarjeta = e.target.parentElement;
  const pantalla = e.target.parentElement.parentElement;

  if ((pantalla.className == "pantalla") && (tarjeta.tagName == "FIGURE")) {

    tarjeta.classList.add("encoger");
    setTimeout( () => {
      tarjeta.classList.add("centrar");
      pantalla.classList.add("activo");
    }, 300);
    setTimeout( () => {
      tarjeta.classList.add("voltiar");
    }, 500);
    setTimeout( () => {
      tarjeta.classList.remove("encoger");
      tarjeta.classList.add("agrandar");
    }, 1000);
  }

});

window.addEventListener('click', e => {

  const close = e.target.parentElement;
  const ventana = e.target;

  if (close.className == "close") {
    const tarjeta = close.parentElement.parentElement;
    const pantalla = tarjeta.parentElement;

    tarjeta.classList.remove("voltiar");
    setTimeout( () => {
      tarjeta.classList.remove("agrandar");
      tarjeta.classList.add("encoger");
    }, 500);
    setTimeout( () => {
      tarjeta.classList.remove("encoger");
      tarjeta.classList.remove("centrar");
      pantalla.classList.remove("activo");
    },1200);
  }else if (ventana.className == "pantalla activo") {
    const tarjeta = ventana.firstElementChild;
    const pantalla = ventana;

    tarjeta.classList.remove("voltiar");
    setTimeout( () => {
      tarjeta.classList.remove("agrandar");
      tarjeta.classList.add("encoger");
    }, 500);
    setTimeout( () => {
      tarjeta.classList.remove("encoger");
      tarjeta.classList.remove("centrar");
      pantalla.classList.remove("activo");
    },1200);
  }

});

barraLateral.addEventListener('click', e => {
  e.preventDefault();

  const menuLateral = document.getElementById('menu-lateral').firstElementChild;
  const pantalla = menuLateral.parentElement;

  if (menuLateral.className !== "contenedor menu-active") {
    menuLateral.classList.add("menu-active");
    pantalla.classList.remove("menu-Lateral-active");
  }else {
    menuLateral.classList.remove("menu-active");
    pantalla.classList.add("menu-Lateral-active");
  }
});

//FUNCIONES
function formularioBusqueda(tipo,bsq) {

  fetch(` https://api.jikan.moe/v3/search/${tipo}?q=${bsq}&limit=30`)
  .then( res => {
    return res.json();
  })
  .then(res => {
    mostrar(res.results);
  })
  .catch( err =>  alert( "Error: " + err) );
}

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
          <h3 class="card-title-frontal">${res[i].title}</h3>
          <h3 class="card-type ${res[i].type}">${res[i].type}</h3>
          <figcaption class="trasera">
            <div id="close" class="close">
              <span class="icon-cancel"></span>
            </div>
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

function desplazarFormulario(e) {
  e.preventDefault();
  const desplazar = e.target.parentElement;
  const pantalla = desplazar.parentElement;
  if (desplazar.className == "contenedor") {
    setTimeout(() => {
      desplazar.classList.add('menu-active');
      pantalla.classList.remove("menu-Lateral-active");
    }, 1000);
  }
}
