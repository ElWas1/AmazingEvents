const cardElements = document.getElementById("cards-container");
const input = document.getElementById('input-search');
const checkboxes = document.getElementById('category-form');
const currentDate = Date.parse(data.currentDate);

input.addEventListener('input', generalFilterUpcoming);

checkboxes.addEventListener('change', generalFilterUpcoming);

function generalFilterUpcoming() {
    let filteredByText = textFilter(data.events, input.value);
    let filteredByCategory = categoriesFilter(filteredByText);
    printCardsUpcoming(filteredByCategory);
};

printCardsUpcoming(data.events);
createCategoriesCheckboxes(data.events);

function printCardsUpcoming(array) {
    let cards = '';
    if (array.length == 0) {
        cardElements.innerHTML = `<h2 id="text-no-matches">There are no matches with your search.</h2>`
        return
    }
    array.forEach(element => {
        if (Date.parse(element.date) > currentDate) {
            cards += `<div class="card m-4">
            <img src="${element.image}" class="card-img-top" alt="${element.name}">
            <div class="card-body d-flex">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.description}</p>
            <p>Date: ${element.date}<p>
            <p>Price: $${element.price}</p>
            <a href="./details.html?id=${element._id}" class="btn btn-primary">More info</a>
            </div>
            </div>`
        }
    });
    cardElements.innerHTML = cards;
};

function createCategoriesCheckboxes(array) {
    let categoriesArray = array.map(element => element.category);
    const duplicatesFilter = categoriesArray => categoriesArray.filter((element, index) => categoriesArray.indexOf(element) != index);
    const filteredArray = duplicatesFilter(categoriesArray)
    let printedCheckboxes = '';
    filteredArray.forEach(element => {
        if (filteredArray) {
            printedCheckboxes += `<label for="${element}">${element}</label>
            <input type="checkbox" value="${element}" name="${element}" id="${element}">`
        }
    });
    checkboxes.innerHTML = printedCheckboxes;
};

function textFilter(array, text) {
    let filteredArray = array.filter(element => element.name.toLowerCase().trim().includes(text.toLowerCase().trim()));
    return filteredArray;
};

function categoriesFilter(array) {
    let existingCheckboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayCheckboxes = Array.from(existingCheckboxes)
    let arrayCheckedCheckboxes = arrayCheckboxes.filter(element => element.checked)
    let arrayCheckedCheckboxesValues = arrayCheckedCheckboxes.map(element => element.value)
    let filteredArray = array.filter(element => arrayCheckedCheckboxesValues.includes(element.category))
    if (arrayCheckedCheckboxes.length > 0) {
        return filteredArray
    }
    return array
}