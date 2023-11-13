
// Fetch data from shop.html
fetch('Project/html/shop.html')
   .then(res => {
      return res.json();
   })
   .then(data => {
      const parser = new DOMParser();
      const shopDocument = parser.parseFromString(data, 'text/html');

      // Get data from shopDocument
      const shopProducts = Array.from(shopDocument.querySelectorAll('.product_card')).map(productCard => {
         let productPrice = productCard.querySelector('.price').innerText;
         let productImageSrc = productCard.querySelector('.product_image img').src;
         return { productPrice, productImageSrc };
      });

      // Rest of your code that interacts with shopProducts
      const addToCartButtons = document.querySelectorAll('.btn');

      addToCartButtons.forEach((button, index) => {
         button.addEventListener('click', event => addToCartClicked(event, shopProducts[index]));
      });

      function addToCartClicked(event, product) {
         const button = event.target;

         addItemToCart(product.productPrice, product.productImageSrc);
         updateCartPrice();
      }

      // ... rest of your code ...
   })
   .catch(error => console.log(error));

function addItemToCart(productPrice, imageSrc) {
   var productRow = document.createElement('div');
   productRow.classList.add('product_list');
   var productRows = document.querySelector('.product_rows');
   var cartImages = document.querySelectorAll('.cart_image');

   for (var i = 0; i < cartImages.length; i++) {
      if (cartImages[i].src == imageSrc) {
         alert('This item has already been added to the cart');
         return;
      }
   }

   var cartRowItems = `
      <div class="product_list">
         <div class="image_box">
            <img class="cart_image" src="${imageSrc}" alt="">
         </div>
         <span class="product_price">${productPrice}</span>
         <input class="product_quantity" type="number" value="1" min="0">
         <button class="remove_btn">Remove</button>
      </div>
   `;
   productRow.innerHTML = cartRowItems;
   productRows.appendChild(productRow);
   productRow.querySelector('.remove_btn').addEventListener('click', removeItem);
   productRow.querySelector('.product_quantity').addEventListener('change', changeQuantity);
   updateCartPrice();
}

// ... rest of your code ...

// Update the updateCartPrice function
function updateCartPrice() {
   var total = 0;
   var productRows = document.querySelectorAll('.product_list');

   for (var i = 0; i < productRows.length; i++) {
      var cartRow = productRows[i];
      var priceElement = cartRow.querySelector('.product_price');
      var quantityElement = cartRow.querySelector('.product_quantity');
      var price = parseFloat(priceElement.innerText.replace('RM', ''));
      var quantity = quantityElement.value;
      total += price * quantity;
   }

   document.querySelector('.total_price').innerText = 'RM ' + total.toFixed(2);

   var cartQuantity = productRows.length;
   document.querySelector('.cart-quantity').textContent = cartQuantity;
}
