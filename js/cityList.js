
// REFS
let pageViewElement = document.querySelector(".page-view");
let cityList = document.querySelector("#city-list");
let buttonClearList = document.querySelector("#button-clear-list");
let buttonClearAll = document.querySelector("#button-clear-all");
let totalPopulation;

if(localStorage.getItem("population")) {
    let temp = localStorage.getItem("population");
    totalPopulation = JSON.parse(temp);
} else {
    totalPopulation = 0;
}


fetch("data/stad.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((data)=>{
    // console.log(data);
    let cityData = data;    
    if(localStorage.getItem("cityarray")){
        let storedArray = localStorage.getItem("cityarray");
        let cityArray = JSON.parse(storedArray);
        printHTML(cityArray, cityData);
        printTotalPopulation(totalPopulation);
        clearList();
        clearAll();
    } else {
        printErrorMessage("The list is empty");
        buttonClearList.disabled = true;
        clearAll();
    }
});


function printHTML(cityIDs, citydata){ 
    cityIDs.forEach(id => {
        citydata.forEach(obj => {
            if(id == obj.id) {
                console.log(obj.population);
                let sum = totalPopulation += obj.population;
                let listItem = document.createElement("li");
                listItem.innerHTML = obj.stadname;
                cityList.appendChild(listItem);
            }
        });
    });
    localStorage.setItem("population", totalPopulation);
}

function printTotalPopulation(totalPopulation){
    let element = document.createElement("li");
    element.innerHTML = totalPopulation;
    cityList.appendChild(element);
}

function clearList() {
    buttonClearList.addEventListener('click', (event) => {
        localStorage.removeItem("cityarray");
        // Maybe I should have a global function that will run the page again..
        // but location reload is easier :).
        location.reload();
    })
}

function clearAll() {
    buttonClearAll.addEventListener('click', (event) => {
        localStorage.clear();
        location.pathname = '/index.html'
    })
}

function printErrorMessage(message){
    let element = document.createElement("li");
    element.innerHTML = message;
    cityList.appendChild(element);
}







// function createHTML(, idarray) {
//     jsonarray.forEach(obj => {
//         let element = document.createElement("li");
//         element.dataset.id = obj[Object.keys(obj)[0]];
//         element.innerHTML = obj[Object.keys(obj)[1]];
//         element.dataset.name = obj[Object.keys(obj)[1]];
//         element.addEventListener('click', (event) => {
//             clickEvent(event);
//         });
//         listElement.insertAdjacentElement('afterbegin', element);                
//     });
// }

// function clickEvent(event) {
//     let elementID = event.target.dataset.id;
//     let elementName = event.target.dataset.name;
//     localStorage.removeItem("id");
//     localStorage.removeItem("name");
//     localStorage.setItem("id", elementID);
//     localStorage.setItem("name", elementName);
//     window.location.pathname = "/country-detail.html";
// }
