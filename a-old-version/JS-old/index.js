
if(localStorage.getItem("id")) {
    localStorage.removeItem("id");
}

if(localStorage.getItem("name")) {
    localStorage.removeItem("name");
}


// REFS
let pageViewElement = document.querySelector(".page-view");
let countryList;

fetch("data/land.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((data)=>{
    // console.log(data);
    let countryData = data;
    cloneTemplate("#country-template");
    countryList = document.querySelector(".country-list");
    createHTML(countryData, countryList);
});


function cloneTemplate(classname){
    let template = document.querySelector(classname);
    let newNode = template.cloneNode(true);
    pageViewElement.insertAdjacentElement('afterbegin', newNode);
}

function createHTML(jsonarray, listElement) {
    jsonarray.forEach(obj => {
        let element = document.createElement("li");
        element.dataset.id = obj[Object.keys(obj)[0]];
        element.innerHTML = obj[Object.keys(obj)[1]];
        element.dataset.name = obj[Object.keys(obj)[1]];
        element.addEventListener('click', (event) => {
            clickEvent(event);
        });
        listElement.insertAdjacentElement('afterbegin', element);                
    });
}

function clickEvent(event) {
    let elementID = event.target.dataset.id;
    let elementName = event.target.dataset.name;
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.setItem("id", elementID);
    localStorage.setItem("name", elementName);
    window.location.pathname = "/country-detail.html";
}
