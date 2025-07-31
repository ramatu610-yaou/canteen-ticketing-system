// function to register a worker in indexedDB and display the list
function submitWorkersData() {
    // retrieval of form value/
    const name = document.getElementById("name").value;
    const givingName = document.getElementById("givingname").value;
    const department = document.getElementById("department").value;
    const status = document.getElementById("status").value;
    const dob = document.getElementById("dob").value;
    const pob = document.getElementById("pob").value;
    const  rgdate = document.getElementById("rgdate").value;

    const workersData ={
        name,
        givingName,
        department,
        status,
        dob,
        pob,
        rgdate,
    
    };
// adding to indexedDB
const request = indexedDB.open("cantisysDb", 1);
request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["workers"], "readwrite");
    const objectstore =transaction.objectstore("Workers");
    const addrequest = objectstore.add(workersData);

    addrequest.onsuccess = function() {
        console.log("Worker added successfully");
        listworkers(); // refresh the list after adding




    };
};
}
// funtion to list and display workers in an HTML table
function listworkers() {
    const table =document.getElementById("workerlists");
    table.innerHTML = ""; // empty the table before adding line

    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["workers"],"readonly");
        const objectstore= transaction.objectstore("workers");
        const getAllRequest = objectstore.getAll();

        getAllRequest.onsuccess = function(){
            const workerstable = getAllRequest.result;
            workerstable.forEach((worker,index) => {
                const row = table.insertRow();
                row.insertcell(0).innerText = index + 1;
                 row.insertcell(1).innerText = worker .name;
                 row.insertcell(2).innerText = worker.givingName;
                 row.insertcell(3).innerText = worker.department;
                 row.insertcell(4).innerText = worker.status;
                 row.insertcell(5).innerText = worker.dob;
                 row.insertcell(6).innerText = worker.pob;
                 row.insertcell(7).innerText = worker.rgdate;
                 const actionscell = row.insertcell();
                 actionscell.innerHTML = 
                 <select class= "form-select">
                    <Option>choose...</Option>
                <Option>add consumption</Option>
                <Option>edit</Option>
                <Option>delet</Option>
                 </select>
                
                 ;
            });
                console.log("workers retrieved successfully");       
                    };
                 getAllRequest.onerror = function() {
                    console.error("error retrieving workers:", getAllRequest.error);
                 };
                };
            }
    
        
    

function saveConsumption(){
        var consumerName = document.getElementById("worker").value;
        var departement = document.getElementById("departement-consumption").value;
        var consumptionType = document.getElementById("consumption-type").value;
        var extra =  document.getElementById("extra").value;
        var amount =  document.getElementById("amount-consummed").value;
        var date =  document.getElementById("rgdate").value;

        var consumptionData = {consumerName, departement, consumptionType, extra, amount, date};

        console.log(consumptionData);


        const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["consumption"], "readwrite");
        const objectStore = transaction.objectStore("consumption");
        const addRequest = objectStore.add(consumptionData);

        addRequest.onsuccess = function() {
            console.log("consumption added successfully");
        
        };

        addRequest.onerror = function() {
            console.error("Error adding consumption: ", addRequest.error);
        };
    };

    
}

function consumptionList() {
     const table = document.getElementById("consumption-list");
    table.innerHTML = ""; // Vide le tableau avant d'ajouter les lignes

    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["consumption"], "readonly");
        const objectStore = transaction.objectStore("consumption");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const consumptionTable = getAllRequest.result;
            consumptionTable.forEach((consumption, index) => {
                const row = table.insertRow();
                row.insertCell(0).innerText = index + 1;
                row.insertCell(1).innerText = consumption.consumerName;
                row.insertCell(2).innerText = consumption.departement;
                row.insertCell(3).innerText = consumption.consumptionType;
                row.insertCell(4).innerText = consumption.extra;
                row.insertCell(5).innerText = consumption.amount;
               
            });
            console.log("consumption retrieved successfully");
        };

        getAllRequest.onerror = function() {
            console.error("Error retrieving workers: ", getAllRequest.error);
        };
    };
}

function totalPrice() {

    const consumptionType = document.getElementById('consumption-type').value;
    const extra = parseInt(document.getElementById('extra').value)  || 0;


const basePrice = {
     'Food': 1000,
    'Drink': 500,
    'Food and Drink': 1500
};



let totalPrice = basePrice[consumptionType] ||0;

if (extra > 0) {
    totalPrice += (extra * 1000); // 
}

const _totalPrice = document.getElementById("amount-consummed");

_totalPrice.setAttribute("value", totalPrice+ "XAF");
// Retourne le prix total (ou l'afficher/mettre a jour le DOM)
return totalPrice ; // Retourne le prix total formate
}