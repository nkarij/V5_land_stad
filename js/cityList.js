
// REFS
let pageViewElement = document.querySelector(".page-view");
let cityList = document.querySelector(".citylist");
let population = document.querySelector(".citylist__population");
let buttonClearList = document.querySelector("#button-clear-list");
let buttonGoBack = document.querySelector("#button-go-back");
let buttonClearAll = document.querySelector("#button-clear-all");
let totalPopulation = 0;
let cityArray;


if(localStorage.getItem("cityarray")){
    let temp = localStorage.getItem("cityarray");
    let parsedArray = JSON.parse(temp);
    cityArray = [...new Set(parsedArray)];
} else {
    cityArray = [];
    printErrorMessage("The list is empty");
    buttonClearList.disabled = true;
    createClearAllEvent(buttonClearAll);
    clearList();
    goBack(buttonGoBack);
}

fetch("data/stad.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((dataset)=>{
    // console.log(data);
    let data = dataset;
    createHTML(cityArray, data);
    printTotalPopulation(totalPopulation);
    clearList();
    createClearAllEvent(buttonClearAll);
    goBack(buttonGoBack);
});

function createHTML(cityarray, citydata){
    cityarray.forEach(id => {
        citydata.forEach(obj => {
            if(id == obj.id) {
                console.log(obj.population);
                let sum = totalPopulation += obj.population;
                let listItem = document.createElement("li");
                listItem.classList.add("citylist__item");
                listItem.innerHTML = obj.stadname;
                cityList.appendChild(listItem);
            }
        });
    });
    console.log(totalPopulation);
    buttonClearAll.style.display = 'block';
}

function printTotalPopulation(totalPopulation){
    let element = document.createElement("li");
    element.classList.add("population");
    element.innerHTML = totalPopulation;
    population.appendChild(element);
}

function clearList() {
    buttonClearList.addEventListener('click', (event) => {
        localStorage.removeItem("cityarray");
        localStorage.removeItem("population");
        location.reload();
    })
}

function createClearAllEvent(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.clear();
        location.pathname = '/index.html';
    });
}

function goBack(element) {
    element.addEventListener('click', (event) => {
        console.log("clear");
        event.preventDefault();
        localStorage.removeItem("cityArray");
        location.pathname = '/index.html';
    });
}    

function printErrorMessage(message){
    let element = document.createElement("li");
    element.innerHTML = message;
    element.classList.add("error-message");
    cityList.appendChild(element);
}
