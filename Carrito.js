const btnCart = document.querySelector('.container-cart-icon');
const containerCartProduct = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
  containerCartProduct.classList.toggle('hidden-cart');
});

/* ========================== */
const cartInfo = document.querySelector('.count-products');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productList = document.querySelector('.container-items');

// Variable de arreglos de productos
let allProducts = [];

const valortotal = document.querySelector('.total-pagar');

productList.addEventListener('click', e => {
  if (e.target.classList.contains('btn-add-cart')) {
    const product = e.target.parentElement.parentElement;
    const infoProduct = {
      quantity: 1,
      title: product.querySelector('h2').textContent,
      price: product.querySelector('.price').textContent,
    };

    const existingProduct = allProducts.find(
      product => product.title === infoProduct.title
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      allProducts.push(infoProduct);
    }

    showHTML();
  }
});

rowProduct.addEventListener('click', e => {
  if (e.target.classList.contains('icon-close')) {
    const product = e.target.parentElement;
    const title = product.querySelector('.titulo-producto-carrito').textContent;

    const existingProduct = allProducts.find(
      product => product.title === title
    );

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        allProducts = allProducts.filter(
          product => product.title !== title
        );
      }
    }

    showHTML();
  }
});

// Función para mostrar HTML
const showHTML = () => {
  if (!allProducts.length) {
    rowProduct.innerHTML = `
      <div class="cart-product">
        <p class="cart-empty">El carrito está vacío</p>
      </div>
    `;
    valortotal.innerText = '$0';
  } else {
    rowProduct.innerHTML = '';
    let total = 0;

    allProducts.forEach(product => {
      const containerProduct = document.createElement('div');
      containerProduct.classList.add('cart-product');

      containerProduct.innerHTML = `
        <div class="info-cart-product">
          <span class="cantidad-producto-carrito">${product.quantity}</span>
          <p class="titulo-producto-carrito">${product.title}</p>
          <span class="precio-producto-carrito">${product.price}</span>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="icon-close">
          <path 
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;

      rowProduct.append(containerProduct);

      total += parseInt(product.quantity) * parseInt(product.price.slice(1).replace('.', ''));
    });

    valortotal.innerText = `$${total.toLocaleString('es-CL')}`;
  }

  cartInfo.textContent = allProducts.reduce((total, product) => total + product.quantity, 0);
};

// Llamada inicial a la función para mostrar el HTML
showHTML();
