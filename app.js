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

            const title = document.createElement('h3'); // card title
            title.textContent = item.name;
            cardBody.appendChild(title);

            const category = document.createElement('p'); // card category
            category.textContent = `Category: ${item.category}`;
            cardBody.appendChild(category);

            const price = document.createElement('p'); // card price
            price.textContent = `Price: $${item.price.toFixed(2)}`; 
            cardBody.appendChild(price);

            // Append body to card
            card.appendChild(cardBody);

            // Append card to container
            container.appendChild(card);
    });
}).catch(error => {
    console.error('Error loading JSON data:', error);
});
