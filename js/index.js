

// clear localStorage:
if(localStorage.getItem("countryid") || localStorage.getItem("cityid")) {
    // localStorage.removeItem("id");
    clearLocalStorage();
}

// References, excisting HTML
let listContainer = document.querySelector(".list-container");

fetch("data/land.json")
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((data)=>{
    // console.log(data);
    let countryData = data;
    createHTML(countryData, "country-detail.html");
});

function createHTML(jsonarray, filepath) {
    jsonarray.forEach(obj => {
        let element = document.createElement("a");
        element.href = filepath;
        element.dataset.id = obj[Object.keys(obj)[0]];
        element.innerHTML = obj[Object.keys(obj)[1]];
        element.dataset.name = obj[Object.keys(obj)[1]];
        element.classList.add("country-item");
        element.addEventListener('click', (event) => {
            handleClickEvent(event);
        });
        listContainer.insertAdjacentElement('afterbegin', element);                
    });
}

function handleClickEvent(event) {
    let elementID = event.target.dataset.id;
    let elementName = event.target.dataset.name;
    clearLocalStorage();
    localStorage.setItem("countryid", elementID);
    localStorage.setItem("countryname", elementName);
}

function clearLocalStorage() {
    localStorage.removeItem("countryid");
    localStorage.removeItem("countryname");
}
