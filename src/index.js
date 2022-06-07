const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let pagination = window.localStorage.getItem('pagination');
let state = true;

//window.localStorage.setItem("pagination", 0);

const getData = async api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        let pageInit = pagination * 10 + 4;
        let pageEnd = pageInit + 10;
        if(product.id > pageInit && product.id <= pageEnd){
          return `<article id="${product.id}"class="Card" alt="${product.description}"><img src="${product.category.image}"/><h2>${product.title}<small>$ ${product.price}</small></h2></article>`;
        }
        else{
          if(pagination === 20){
            intersectionObserver.unobserve($observe);
            finalMessage();
          }
          return undefined;
        }
        // template
      }).filter(function(x){
        return x !== undefined;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async ()  =>  {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(pagination === null)
    pagination = -1;
  loadData();
  window.localStorage.setItem('pagination', pagination++);
// logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.onbeforeunload = function() {
  window.localStorage.clear();
  return '';
};

const finalMessage = () => {
  if(state === true){
    console.log("Entra a validar scroll");
    let message = document.createElement('section');
    message.classList.add('Item');
    message.innerHTML =`<div>Todos los productos Obtenidos</div>`;
    $app.appendChild(message);
  }
  state = false;
}
