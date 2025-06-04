// Constants
const MAX_QUANTITY = 20;
const MIN_QUANTITY = 1;

// DOM Elements
const emptyCart = document.querySelector('.empty-cart');
const shoppingCart = document.querySelector('.shopping-cart');

// Fetch product data
fetch('./assets/data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.card-container');
        data.forEach(item => {
            const card = createProductCard(item);
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
        displayErrorMessage();
    });

// Function to create a product card
function createProductCard(item) {
    const card = document.createElement("div");
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = item.image.desktop;
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const addBtn = createAddToCartButton(item, cardBody);
    cardBody.appendChild(addBtn);

    const category = document.createElement('h4');
    category.textContent = item.category;
    cardBody.appendChild(category);

    const title = document.createElement('h3');
    title.textContent = item.name;
    cardBody.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `$${item.price.toFixed(2)}`;
    cardBody.appendChild(price);

    card.appendChild(cardBody);
    return card;
}

// Function to create the "Add to Cart" button
function createAddToCartButton(item, cardBody) {
    const addBtn = document.createElement("button");
    addBtn.classList.add('addCardBtn');
    addBtn.textContent = "Add To Cart";

    const cardIcon = document.createElement('i');
    cardIcon.classList.add("fa-solid", "fa-cart-plus");
    addBtn.appendChild(cardIcon);

    addBtn.addEventListener("click", () => handleAddToCart(item, cardBody, addBtn));
    return addBtn;
}

// Function to handle adding an item to the cart
function handleAddToCart(item, cardBody, addBtn) {
    emptyCart.classList.add("active");
    let quantity = 1;

    const quantityBtn = createQuantityControls(item, quantity, cardBody, addBtn);
    cardBody.replaceChild(quantityBtn, addBtn);

    const cartItem = createCartItem(item, quantity);
    shoppingCart.appendChild(cartItem);
}

// Function to create quantity controls
function createQuantityControls(item, quantity, cardBody, addBtn) {
    const quantityBtn = document.createElement("div");
    quantityBtn.classList.add('quantityBtn');

    const minusBtn = document.createElement("button");
    minusBtn.classList.add('minusBtn');
    minusBtn.textContent = "-";

    const quantityDisplay = document.createElement("span");
    quantityDisplay.classList.add('quantityDisplay');
    quantityDisplay.textContent = quantity;

    const plusBtn = document.createElement("button");
    plusBtn.classList.add('plusBtn');
    plusBtn.textContent = "+";

    quantityBtn.appendChild(minusBtn);
    quantityBtn.appendChild(quantityDisplay);
    quantityBtn.appendChild(plusBtn);

    plusBtn.addEventListener("click", () => {
        if (quantity < MAX_QUANTITY) {
            quantity++;
            updateCartItem(item, quantity, quantityDisplay);
        }
    });

    minusBtn.addEventListener("click", () => {
        if (quantity > MIN_QUANTITY) {
            quantity--;
            updateCartItem(item, quantity, quantityDisplay);
        } else {
            cardBody.replaceChild(addBtn, quantityBtn);
            emptyCart.classList.remove("active");
            removeCartItem(item);
        }
    });

    return quantityBtn;
}

// Function to create a cart item
function createCartItem(item, quantity) {
    const cartItem = document.createElement("div");
    cartItem.classList.add('item');
    cartItem.dataset.itemName = item.name;

    cartItem.innerHTML = `
        <img src="${item.image.thumbnail}" alt="${item.name}">
        <div class="item-details">
            <h4>${item.name}</h4>
            <p class="cart-quantity">Quantity: ${quantity}</p>
            <p class="cart-price">Price: $${(item.price * quantity).toFixed(2)}</p>
        </div>
    `;
    return cartItem;
}

// Function to update a cart item
function updateCartItem(item, quantity, quantityDisplay) {
    quantityDisplay.textContent = quantity;

    const cartItem = shoppingCart.querySelector(`.item[data-item-name="${item.name}"]`);
    if (cartItem) {
        cartItem.querySelector('.cart-quantity').textContent = `Quantity: ${quantity}`;
        cartItem.querySelector('.cart-price').textContent = `Price: $${(item.price * quantity).toFixed(2)}`;
    }
}

// Function to remove a cart item
function removeCartItem(item) {
    const cartItem = shoppingCart.querySelector(`.item[data-item-name="${item.name}"]`);
    if (cartItem) {
        cartItem.remove();
    }
}

// Function to display an error message
function displayErrorMessage() {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Failed to load products. Please try again later.";
    document.body.appendChild(errorMessage);
}


