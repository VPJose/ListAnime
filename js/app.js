//Variables
var formulaio = document.getElementById("Formulario");
var resultado = document.getElementById('resultado');

formulaio.addEventListener('submit', e => {
  e.preventDefault();
  var bsq = document.querySelector('#nani').value;
  var card = document.getElementById('card');


  while (card) {
    resultado.removeChild(card);
    var card = document.getElementById('card');
  }

  fetch(`https://api.jikan.moe/v3/search/anime?q=${bsq}&limit=18`)  // &order_by=title, no quiso agarrar
  .then(res => {
    return res.json();
  })
  .then(res => {
    let results = res.results;
    results.forEach(result => {
      resultado.innerHTML += `
      <div class="item" id="card">
      <div class="card">
      <h3 class="${result.type}">${result.type}: ${result.title.substring(0,37)}</h3>
      <img src="${result.image_url}">
      <p>${result.synopsis.substring(0,35)}...</p>
      <span class="episodio"><strong> Episodes:</strong> ${result.episodes}</span>
      </div>
      </div>`;
    });
  })
  .catch(err =>  alert("Error: " + err) );
});

function mostrar(resultador) {

}
