
// REFS
let pageViewElement = document.querySelector(".page-view");
let pageHeading = document.querySelector(".page-heading");
let buttonClearAll = document.querySelector("#button-clear-all");
let listContainer = document.querySelector(".list-container");
let storedID;

if(localStorage.getItem("cityid")){
    storedID = localStorage.getItem("cityid");
} else {
    printErrorMessage("Der mangler et City Id");
}

fetch("data/stad.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((dataset)=>{
    let data = dataset;    
    console.log(storedID);
    pageReady(data, storedID);
    createHTML(data, storedID);
    clearAll(buttonClearAll);
});

function pageReady(jsonarray, id){
    console.log(jsonarray)
    jsonarray.forEach(obj => {
        if(obj.id == id) {
            pageHeading.innerHTML = obj.stadname;
        }
    });
}

function createHTML(jsonarray, id) {
    jsonarray.forEach(obj => {
        if(obj.id == id) {
            let element = document.createElement("p");
            element.dataset.id = obj[Object.keys(obj)[0]];
            element.innerHTML = obj[Object.keys(obj)[3]];
            element.classList.add("citydetail__population");
            listContainer.insertAdjacentElement('afterbegin', element);   
        }             
    });
    buttonClearAll.style.display = 'block';
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