const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const evento = data.events.find(element => element._id == id);
const div = document.querySelector('.container-details');

div.innerHTML = `<div class="card mb-3" id="card-details">
<img src="${evento.image}" class="card-img-top" alt="${evento.name}" id="card-img-top-details">
<div class="card-body d-flex">
  <h5 class="card-title">${evento.name}</h5>
  <p class="card-text-details">${evento.description}</p>
  <p class="card-text-details">Date: ${evento.date}</p>
  <p class="card-text-details">Category: ${evento.category}</p>
  <p class="card-text-details">Place: ${evento.place}</p>
  <p class="card-text-details">Capacity: ${evento.capacity}</p>
  <p class="card-text-details">${evento.estimate? 'Estimate' : 'Assistance'}: ${evento.estimate? evento.estimate : evento.assistance}</p>
  <p class="card-text-details">Price: $${evento.price}</p>
</div>
</div>`;