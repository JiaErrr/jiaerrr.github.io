// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
   if (cartModalOverlay.style.transform === 'translateX(-200%)'){
      cartModalOverlay.style.transform = 'translateX(0)';
   } else {
      cartModalOverlay.style.transform = 'translateX(-200%)';
   }
})
// end of open cart modal

// close cart modal
const closeBtn = document.querySelector ('.close-btn');

closeBtn.addEventListener('click', () => {
   cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
   if (e.target.classList.contains('cart-modal-overlay')){
      cartModalOverlay.style.transform = 'translateX(-200%)'
   }
})
// end of close cart modal

// add products to cart
const addToCart = document.getElementsByClassName('btn'); // Fixed: use '.btn' instead of 'btn'
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
   button = addToCart[i];
   button.addEventListener('click', addToCartClicked);
}


function addToCartClicked (event) {
   button = event.target;
   var cartItem = button.parentElement.parentElement; // Adjusted: navigate up two levels to the product card
   var price = cartItem.querySelector('.price').innerText; // Adjusted: use querySelector instead of getElementsByClassName
   var imageSrc = cartItem.querySelector('.image').src;
   addItemToCart(price, imageSrc);
   updateCartPrice();
}

function addItemToCart (price, imageSrc) {
   var productRow = document.createElement('div');
   productRow.classList.add('product-row');
   var productRows = document.getElementsByClassName('product-rows')[0];
   var cartImage = document.getElementsByClassName('cart-image');
   
   for (var i = 0; i < cartImage.length; i++){
      if (cartImage[i].src == imageSrc){
         alert ('This item has already been added to the cart')
         return;
      }
   }
   
   var cartRowItems = `
   <div class="product-row">
      <img class="cart-image" src="${imageSrc}" alt="">
      <span class ="cart-price">${price}</span>
      <input class="product-quantity" type="number" value="1">
      <button class="remove-btn">Remove</button>
   </div>
         `
   productRow.innerHTML = cartRowItems;
   productRows.append(productRow);
   productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
   productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
   updateCartPrice()
}
// end of add products to cart

// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
   button = removeBtn[i]
   button.addEventListener('click', removeItem)
}

function removeItem (event) {
   btnClicked = event.target
   btnClicked.parentElement.parentElement.remove()
   updateCartPrice()
}

// ... (previous code)

// update quantity input
var quantityInputs = document.querySelectorAll('.product-quantity');

quantityInputs.forEach(input => {
   input.addEventListener('change', changeQuantity);
});

function changeQuantity(event) {
   var input = event.target;
   if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
   }
   updateCartPrice();
}


// update total price
function updateCartPrice() {
   var total = 0;
   var productRows = document.querySelectorAll('.product-row');

   for (var i = 0; i < productRows.length; i +=2) {
      var cartRow = productRows[i];
      var priceElement = cartRow.querySelector('.cart-price');
      var quantityElement = cartRow.querySelector('.product-quantity');
      var price = parseFloat(priceElement.innerText.replace('RM', ''));
      var quantity = quantityElement.value;
      total += price * quantity;
   }

   document.querySelector('.total-price').innerText = 'RM ' + total.toFixed(2);
   document.querySelector('.cart-quantity').textContent = i /= 2
}

// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

purchaseBtn.addEventListener('click', purchaseBtnClicked);

function purchaseBtnClicked() {
   var cartItems = document.querySelector('.product-rows');

   if (cartItems.children.length === 0) {
      alert('Your cart is empty. Add some items before making a purchase.');
      cartModalOverlay.style.transform = 'translateX(-200%)';
      return;
   }

   alert('Thank you for your purchase');
   cartModalOverlay.style.transform = 'translateX(-200%)';

   // Clear the cart
   while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
   }

   updateCartPrice();
}

// ... (rest of your code)
