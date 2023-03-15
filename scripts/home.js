const cardElements = document.getElementById("cards-container");

let cards = '';

for (let i = 0; i < data.events.length; i++) {
    cards += `<div class="card m-4">
    <img src="${data['events'][i].image}" class="card-img-top" alt="${data['events'][i].name}">
    <div class="card-body d-flex">
        <h5 class="card-title">${data['events'][i].name}</h5>
        <p class="card-text">${data['events'][i].description}</p>
        <p>Date: ${data['events'][i].date}<p>
        <p>Price: $${data['events'][i].price}</p>
        <a href="./details.html" class="btn btn-primary">More info</a>
    </div>
</div>`
};

cardElements.innerHTML = cards;