// Fonction pour enregistrer un worker dans IndexedDB et afficher la liste
function submitWorkersData() {
    // Récupération des valeurs du formulaire
    const name = document.getElementById("name").value;
    const givingName = document.getElementById("givingName").value;
    const departement = document.getElementById("departement").value;
    const status = document.getElementById("status").value;
    const dob = document.getElementById("dob").value;
    const pob = document.getElementById("pob").value;
    const rgdate = document.getElementById("rgdate").value;

    const workersData = {
        name,
        givingName,
        departement,
        status,
        dob,
        pob,
        rgdate,
    };

    // Ajout dans IndexedDB
    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["workers"], "readwrite");
        const objectStore = transaction.objectStore("workers");
        const addRequest = objectStore.add(workersData);

        addRequest.onsuccess = function() {
            console.log("Worker added successfully");
            listWorkers(); // Rafraîchit la liste après ajout
        };

        addRequest.onerror = function() {
            console.error("Error adding worker: ", addRequest.error);
        };
    };
}

// Fonction pour lister et afficher les workers dans le tableau HTML
function listWorkers() {
    const table = document.getElementById("workerLists");
    table.innerHTML = ""; // Vide le tableau avant d'ajouter les lignes

    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["workers"], "readonly");
        const objectStore = transaction.objectStore("workers");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const workersTable = getAllRequest.result;
            workersTable.forEach((worker, index) => {
                const row = table.insertRow();
                row.insertCell(0).innerText = index + 1;
                row.insertCell(1).innerText = worker.name;
                row.insertCell(2).innerText = worker.givingName;
                row.insertCell(3).innerText = worker.departement;
                row.insertCell(4).innerText = worker.status;
                row.insertCell(5).innerText = worker.dob;
                row.insertCell(6).innerText = worker.pob;
                row.insertCell(7).innerText = worker.rgdate;
                const actionsCell = row.insertCell();
                actionsCell.innerHTML = `
                    <select class="form-select">
                        <option>Choose...</option>
                        <option>Add Consumption</option>
                        <option>Edit</option>
                        <option>Delete</option>
                    </select>
                `;
            });
            console.log("Workers retrieved successfully");
        };

        getAllRequest.onerror = function() {
            console.error("Error retrieving workers: ", getAllRequest.error);
        };
    };
}