
// REFS
let pageViewElement = document.querySelector(".page-view");
let listContainers = document.querySelectorAll(".list-container");
let buttonClearList = document.querySelector("#button-clear-list");
let buttonClearAll = document.querySelector("#button-clear-all");
let totalPopulation;
let cityArray;

if(localStorage.getItem("population")) {
    let temp = localStorage.getItem("population");
    totalPopulation = JSON.parse(temp);
} else {
    totalPopulation = 0;
    clearAll(buttonClearAll);
}

if(localStorage.getItem("cityarray")){
    let temp = localStorage.getItem("cityarray");
    let parsedArray = JSON.parse(temp);
    cityArray = [...new Set(parsedArray)];
} else {
    cityArray = [];
    printErrorMessage("The list is empty");
    buttonClearList.disabled = true;
    clearAll(buttonClearAll);
    clearList();
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
    clearAll(buttonClearAll);
});

function createHTML(cityarray, citydata){
    cityarray.forEach(id => {
        citydata.forEach(obj => {
            if(id == obj.id) {
                // console.log(obj.population);
                let sum = totalPopulation += obj.population;
                let listItem = document.createElement("li");
                listItem.classList.add("citylist__item");
                listItem.innerHTML = obj.stadname;
                listContainers[0].appendChild(listItem);
            }
        });
    });
    buttonClearAll.style.display = 'block';
}

function printTotalPopulation(totalPopulation){
    let element = document.createElement("li");
    element.classList.add("citylist__population");
    element.innerHTML = totalPopulation;
    listContainers[1].appendChild(element);
    localStorage.setItem("population", totalPopulation);
}

function clearList() {
    buttonClearList.addEventListener('click', (event) => {
        localStorage.removeItem("cityarray");
        localStorage.removeItem("population");
        location.reload();
    })
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
    listContainers[0].appendChild(element);
}
