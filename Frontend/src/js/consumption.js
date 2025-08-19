function saveConsumption() {
    var firstName = document.getElementById("worker-name-select").value;
    var department = document.getElementById("department-consumption").value;
    var consumptionType = document.getElementById("consumption-type").value;
    var extra = document.getElementById("extra").value;
    var amount = document.getElementById("amount-consummed").value;
    var date = document.getElementById("rgdate").value;
    



    var consumptionData = { firstName, department, consumptionType, extra, amount, date };

    

    console.log(consumptionData);


    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["consumption"], "readwrite");
        const objectStore = transaction.objectStore("consumption");
        const addRequest = objectStore.add(consumptionData);

        addRequest.onsuccess = function () {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Consumption registered successfully",
                showConfirmButton: false,
                timer: 1500
            }).then(()  => {
                window.location.reload();
            });
        };


        addRequest.onerror = function () {
            console.error("Error adding consumption: ", addRequest.error);
        };
    };


}

function consumptionList() {
    const table = document.getElementById("consumption-list");
    table.innerHTML = ""; // Vide le tableau avant d'ajouter les lignes

    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["consumption"], "readonly");
        const objectStore = transaction.objectStore("consumption");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function () {
            const consumptionTable = getAllRequest.result;
            consumptionTable.forEach((consumption, index) => {
                const row = table.insertRow();
                row.insertCell(0).innerText = index + 1;
                row.insertCell(1).innerText = consumption.date;
                row.insertCell(2).innerText = consumption.firstName;
                row.insertCell(3).innerText = consumption.department;
                row.insertCell(4).innerText = consumption.consumptionType;
                row.insertCell(5).innerText = consumption.extra;
                row.insertCell(6).innerText = consumption.amount;

            }); 
             console.log("consumption retrieved successfully");
             
            const row1 = table.insertRow();
            let totalCell = row1.innerText(0);
            totalCell.innerText = "Total" ;
            totalCell.colspan = 5;
            let amountCell = row1.insertCell(1);

            amountCell.colspan =3 ;
        
           
            
            
            
        };

        getAllRequest.onerror = function () {
            console.error("Error retrieving workers: ", getAllRequest.error);
        };
    };
}

function totalPrice() {

    const consumptionType = document.getElementById('consumption-type').value;
    const extra = parseInt(document.getElementById('extra').value) || 0;


    const basePrice = {
        'Food': 1000,
        'Drink': 500,
        'Food And Drink': 1500
    };



    let totalPrice = basePrice[consumptionType] || 0;

    if (extra > 0) {
        totalPrice += (extra * 1000); // 
    }

    const _totalPrice = document.getElementById("amount-consummed");

    _totalPrice.setAttribute("value", totalPrice + "XAF");
    // Retourne le prix total (ou l'afficher/mettre a jour le DOM)
    return totalPrice; // Retourne le prix total formate
}