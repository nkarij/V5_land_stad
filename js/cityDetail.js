
let StoredID = localStorage.getItem("id");

// REFS
let pageViewElement = document.querySelector(".page-view");
let pageHeading = document.querySelector(".page-heading");
let cityList;

fetch("data/stad.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((data)=>{
    let cityData = data;
    let storedID = localStorage.getItem("id");
    pageReady();
    cloneTemplate("#city-template");
    cityList = document.querySelector(".city-template");
    createHTML(cityData, storedID);
});

function pageReady(){
    let storedName = localStorage.getItem("name");
    pageViewElement.innerHTML = "";
    pageHeading.innerHTML = storedName;
}

function cloneTemplate(classname){
    let template = document.querySelector(classname);
    let newNode = template.cloneNode(true);
    pageViewElement.insertAdjacentElement('afterbegin', newNode);
}

function createHTML(jsonarray, id) {
    jsonarray.forEach(obj => {
        if(obj[Object.keys(obj)[0]] == id) {
            let element = document.createElement("p");
            element.dataset.id = obj[Object.keys(obj)[0]];
            element.innerHTML = obj[Object.keys(obj)[3]];
            cityList.insertAdjacentElement('afterbegin', element);   
        }             
    });
}
