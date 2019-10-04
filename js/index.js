document.addEventListener('DOMContentLoaded', () => {

// References, excisting HTML
let countryList = document.querySelector(".country-list");
let cityList = document.querySelector(".country-list__cities");
let buttonClearAll = document.querySelector("#button-clear-all");
let cityID;
let countryID;
let cityArray = [];
let view;
// fetch variables:
let fetchCount = 0;
let count = 0;
let countryData;
let cityData;

fetch("data/land.json")
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((dataset)=>{
    countryData = dataset;
    fetchIsFinished();
});
fetchCount++;

fetch("data/stad.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((dataset)=>{
    cityData = dataset;
    fetchIsFinished();
});
fetchCount++;

function fetchIsFinished(){
    count++;
    if(count == fetchCount){
        // her kan gøres noget:
        checkView();
        function checkView() {     
            if(localStorage.getItem("countryid")){
                cityID = localStorage.getItem("countryid")
                createCountryList(countryData);
                createCityList(cityData);
            } else if(countryID == 0) {
                createCountryList(countryData);
                } else {
                    createCountryList(countryData);
                }
        }
       
        checkCityArray();
        function checkCityArray(){
            if(localStorage.getItem("cityarray")){
                let temp = localStorage.getItem("cityarray");
                cityArray = JSON.parse(temp);
            } else {
                cityArray = [];
            }
        }
                
        function createCountryList(data) {
            createClearAllEvent(buttonClearAll);
            countryList.innerHTML = "";
            data.forEach(obj => {
                let element = document.createElement("a");
                element.dataset.id = obj[Object.keys(obj)[0]];
                element.innerHTML = obj[Object.keys(obj)[1]];
                element.dataset.name = obj[Object.keys(obj)[1]];
                element.classList.add("country-item");
                element.addEventListener('click', (event) => {
                    handleCountryClickEvent(event);
                });
                countryList.insertAdjacentElement('afterbegin', element);  
            });
        }
                
        function handleCountryClickEvent(event) {
            cityID = event.target.dataset.id;
            console.log("event.target.id ", cityID);
            localStorage.setItem("countryid", cityID);
            createCityList(cityData);
        }
        
        function createCityList(data) {
            cityList.innerHTML = "";
            createClearAllEvent(buttonClearAll);           
            data.forEach(obj => {
                if(obj.countryid == cityID){
                    let listItem = document.createElement("li");
                    listItem.classList.add("countrydetail__city");
                    let element = document.createElement("a");
                    element.dataset.id = obj[Object.keys(obj)[0]];
                    element.innerHTML = obj[Object.keys(obj)[1]];
                    element.href = 'city-detail.html';
                    element.addEventListener('click', (event) => {
                        handleCityClickEvent(event);
                    });
                    element.classList.add("city-item");
                    // create checkbox to add city to array
                    let checkBox = document.createElement("input");
                    checkBox.setAttribute("type", "checkbox");
                    checkBox.addEventListener('change', (event) => {
                        onCheckEvent(event, element);
                    });
                     // append to htmldoc
                    listItem.appendChild(element);
                    listItem.appendChild(checkBox);
                    cityList.insertAdjacentElement('afterbegin', listItem);
                }
            });
        }

        function handleCityClickEvent(event) {
            let itemID = event.target.dataset.id;
            console.log("event.target.id ", itemID)
            localStorage.setItem("cityid", itemID);
        }
                
        function onCheckEvent(event, element) {
            if(event.target.checked){
                element.classList.add("checked");
                cityArray.push(element.dataset.id);
                localStorage.setItem("cityarray", JSON.stringify(cityArray));
            } else {
                element.classList.remove("checked");
            }
        }
        
        function createClearAllEvent(element) {
            element.addEventListener('click', (event) => {
                cityList.innerHTML = "";
                event.preventDefault();
                localStorage.clear();
                countryID = 0;
                location.pathname = '/index.html';
            });
        }    
    } // fetch is finished
} // fetch is finshed

}); // domcontent loaded



