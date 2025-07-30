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