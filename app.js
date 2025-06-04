// get elements from the DOM
const emptyCart = document.querySelector('.empty-cart');
const shoppingCart = document.querySelector('.shopping-cart');
const cartTitle = document.querySelector('.cart-title');
let quantity = 0;
let numOfProducts = 0;

fetch('./assets/data.json')
    .then(response => response.json())
    .then(data =>{
        const container = document.body.querySelector('.card-container');

        data.forEach(item => {
            const card = document.createElement("div") // card div
            card.classList.add('card');

            container.appendChild(card); 

            const img = document.createElement('img'); // card image
            img.src = item.image.desktop;
            card.appendChild(img);

            const cardBody = document.createElement('div'); // card body
            cardBody.classList.add('card-body');

            const addBtn = document.createElement("button"); // add to card button
            addBtn.classList.add('addCardBtn');
            addBtn.textContent = "Add To Card";
            cardBody.appendChild(addBtn);
            
            const cardicon = document.createElement('i'); // add to card button icon
            cardicon.classList.add("fa-solid", "fa-cart-plus")
            addBtn.appendChild(cardicon);

            const category = document.createElement('h4'); // card category
            category.textContent = `${item.category}`;
            cardBody.appendChild(category);

            const title = document.createElement('h3'); // card title
            title.textContent = item.name;
            cardBody.appendChild(title);

            const price = document.createElement('p'); // card price
            price.textContent = `$${item.price.toFixed(2)}`; 
            cardBody.appendChild(price);

            card.appendChild(cardBody); // Append body to card          
            container.appendChild(card); // Append card to container

            // add quantity and numOfProducts when the button is clicked

            const quantityBtn = document.createElement("div");
            quantityBtn.classList.add('quantityBtn');
            const plusbtn = document.createElement("button"); // plus button
            plusbtn.classList.add('plusBtn');
            plusbtn.textContent = "+";
            const minusbtn = document.createElement("button"); // minus button
            minusbtn.classList.add('minusBtn');
            minusbtn.textContent = "-";
            const quantityDisplay = document.createElement("span"); // quantity display
            quantityDisplay.classList.add('quantityDisplay');

            quantityBtn.appendChild(minusbtn);
            quantityBtn.appendChild(quantityDisplay);
            quantityBtn.appendChild(plusbtn);
            
            // Add event listener to the button
            addBtn.addEventListener("click", ()=>{
                emptyCart.classList.add("active");
                quantity = 1;
                numOfProducts += 1;
                cardBody.replaceChild(quantityBtn, addBtn);
                quantityDisplay.textContent = quantity;
                const Items = document.createElement("div"); // item in cart
                Items.classList.add('item');
                Items.innerHTML = `
                    <img src="${item.image.thumbnail}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${quantity}</p>
                        <p>Price: $${(item.price * quantity)}</p>
                    </div>
                `
                shoppingCart.appendChild(Items);
            })
            plusbtn.addEventListener("click", () => {
                quantity++;
                quantityDisplay.textContent = quantity;
                if (quantity > 20) {
                    quantity = 20; // limit to 20
                    quantityDisplay.textContent = quantity;
                }
            })
            minusbtn.addEventListener("click", () => {
                quantity--;
                quantityDisplay.textContent = quantity;
                if(quantity < 1){
                    cardBody.replaceChild(addBtn, quantityBtn);
                    emptyCart.classList.remove("active");
                    // Remove the item from the shopping cart
                    const cartItems = shoppingCart.querySelectorAll('.item');
                    cartItems.forEach(cartItem => {
                    const itemTitle = cartItem.querySelector('h3').textContent;
                    if (itemTitle === item.name) {
                        cartItem.remove();
                        }
                    }); 
                }
            })
    });
}).catch(error => {
    console.error('Error loading JSON data:', error);
});


