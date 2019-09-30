
// REFS
let pageHeading = document.querySelector(".page-heading");
let listContainer = document.querySelector(".list-container");
let buttonClearAll = document.querySelector("#button-clear-all");
let storedID;
let cityArray;

if(localStorage.getItem("cityarray")) {
    let temp = localStorage.getItem("cityarray");
    cityArray = JSON.parse(temp);
} else {
    cityArray = [];
}

if(localStorage.getItem("countryid")){
    let temp = localStorage.getItem("countryid");
    storedID = temp;
} else {
    printErrorMessage("Der mangler et Country ID")
}

fetch("data/stad.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((dataset)=>{
    let data = dataset;
    pageReady();
    createHTML(data, storedID, 'city-detail.html')
    clearAll(buttonClearAll);
});

function pageReady(){
    let storedName = localStorage.getItem("countryname");
    pageHeading.innerHTML = storedName;
    buttonClearAll.style.display = 'block';
}

function createHTML(jsonarray, id, filepath) {
    jsonarray.forEach(obj => {
        if(obj.countryid == id){
            let listItem = document.createElement("li");
            listItem.classList.add("countrydetail__city");
            let element = document.createElement("a");
            element.href = filepath;
            element.dataset.id = obj[Object.keys(obj)[0]];
            element.innerHTML = obj[Object.keys(obj)[1]];
            element.dataset.name = obj[Object.keys(obj)[1]];
            element.addEventListener('click', (event) => {
                handleClickEvent(event);
            });
            element.classList.add("countrydetail__citylink");
            // create checkbox to add city to array
            let checkBox = document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            checkBox.addEventListener('change', (event) => {
                onCheckEvent(event, element);
            });
            checkBox.classList.add("countrydetail__checkbox");
             // append to htmldoc
            listItem.appendChild(element);
            listItem.appendChild(checkBox);
            listContainer.insertAdjacentElement('afterbegin', listItem);
        }
    });
}


function handleClickEvent(event) {
    let elementID = event.target.dataset.id;
    let elementName = event.target.dataset.name;
    clearLocalStorage();
    localStorage.setItem("cityid", elementID);
    localStorage.setItem("cityname", elementName);
}

function clearLocalStorage() {
    localStorage.removeItem("cityid");
    localStorage.removeItem("cityname");
}

function onCheckEvent(event, element) {
    if(event.target.checked){
        cityArray.push(element.dataset.id);
        localStorage.setItem("cityarray", JSON.stringify(cityArray));
    }
}

function clearAll(element) {
    element.addEventListener('click', (event) => {
        location.pathname = '/index.html'
    })
}

function printErrorMessage(message){
    let element = document.createElement("li");
    element.innerHTML = message;
    element.classList.add("error-message");
    listContainer.appendChild(element);
}

