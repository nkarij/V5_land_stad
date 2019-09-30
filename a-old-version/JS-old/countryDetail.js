
// REFS
let pageViewElement = document.querySelector(".page-view");
let pageHeading = document.querySelector(".page-heading");
let cityList;
let cityArray;

if(localStorage.getItem("cityarray")) {
    let temp = localStorage.getItem("cityarray");
    cityArray = JSON.parse(temp);
} else {
    cityArray = [];
}

fetch("data/stad.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((data)=>{
    // console.log(data);
    let countryData = data;
    let storedID = localStorage.getItem("id");
    pageReady();
    cloneTemplate("#country-template");
    cityList = document.querySelector(".city-list");
    insertData(countryData, storedID, cityList);
});

function pageReady(){
    let storedName = localStorage.getItem("name");
    pageHeading.innerHTML = storedName;
}

function cloneTemplate(classname){
    let template = document.querySelector(classname);
    let newNode = template.cloneNode(true);
    pageViewElement.insertAdjacentElement('beforebegin', newNode);
}

function insertData(jsonarray, id, listElement) {
    jsonarray.forEach(obj => {
        let objectID = obj[Object.keys(obj)[2]];
        // console.log(obj[Object.keys(jsonobject)[0]]);
        if(objectID == id){
            let listItem = document.createElement("li");
            // create a-tag to redirect to city info.
            let label = document.createElement("label");
            label.dataset.id = obj[Object.keys(obj)[0]];
            // console.log(element.dataset.id);
            label.dataset.name = obj[Object.keys(obj)[1]];
            label.innerHTML = obj[Object.keys(obj)[1]];
            label.addEventListener('click', (event) => {
                clickEvent(event);
            });
            // create checkbox to add city to array
            let checkBox = document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            checkBox.addEventListener('change', (event) => {
                onCheckEvent(event, label);
            });
            // append to htmldoc
            listItem.appendChild(label);
            listItem.appendChild(checkBox);
            listElement.appendChild(listItem);                
        }
    });
}

function clickEvent(event) {
    let elementID = event.target.dataset.id;
    let elementName = event.target.dataset.name;
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.setItem("id", elementID);
    localStorage.setItem("name", elementName);
    window.location.pathname = "/city-detail.html";
}

function onCheckEvent(event, labelelem) {
    if(event.target.checked){
        console.log("checked");
        console.log(labelelem.dataset.id);
        cityArray.push(labelelem.dataset.id);
        // localStorage.removeItem("cityarray");
        localStorage.setItem("cityarray", JSON.stringify(cityArray));
        console.log(localStorage["cityarray"]);
    }
}

