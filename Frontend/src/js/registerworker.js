// Fonction pour enregistrer un worker dans IndexedDB et afficher la liste
function submitWorkersData() {
    // Récupération des valeurs du formulaire
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastName").value;
    const department = document.getElementById("department").value;
    const status = document.getElementById("status").value;
    const dob = document.getElementById("dob").value;
    const pob = document.getElementById("pob").value;
    const rgdate = document.getElementById("rgdate").value;

    const workersData = {
        firstName,
        lastName,
        department,
        status,
        dob,
        pob,
        rgdate,
    };

    // Ajout dans IndexedDB
    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["workers"], "readwrite");
        const objectStore = transaction.objectStore("workers");
        const addRequest = objectStore.add(workersData);




        addRequest.onsuccess = function () {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Worker registered successfully",
                showConfirmButton: false,
                timer: 1500
            }).then(()  => {
                window.location.reload();
            });
        };

        addRequest.onerror = function () {
            console.error("Error adding worker: ", addRequest.error);
        };
    };


}

// Fonction pour lister et afficher les workers dans le tableau HTML
function listWorkers() {
    const table = document.getElementById("workerLists");
    table.innerHTML = ""; // Vide le tableau avant d'ajouter les lignes

    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["workers"], "readonly");
        const objectStore = transaction.objectStore("workers");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function () {
            const workersTable = getAllRequest.result;
            workersTable.forEach((worker, index) => {
                const row = table.insertRow();
                row.insertCell(0).innerText = index + 1;
                row.insertCell(1).innerText = worker.firstName;
                row.insertCell(2).innerText = worker.lastName;
                row.insertCell(3).innerText = worker.department;
                row.insertCell(4).innerText = worker.status;
                row.insertCell(5).innerText = worker.dob;
                row.insertCell(6).innerText = worker.pob;
                row.insertCell(7).innerText = worker.rgdate;
                const actionsCell = row.insertCell();
                actionsCell.innerHTML = `
                    <select class="form-select action-select">
                        <option>Choose...</option>
                        <option value="add consumption">Add Consumption</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                    </select>
                
 `; 

                const select = actionsCell.querySelector(".action-select");
                //attach event listener
                select.addEventListener("change", function () {
                    const selectedValue = this.value;
                    console.log('The selected value is:,selectedValue');
                    switch (selectedValue) {
                        case 'add consumption':
                        showSection('register-consumption')
                        document.getElementById("department-consumption").value= worker.department;
                        document.getElementById("div-to-display").style.display = 'none';
                        document.getElementById("div-to-display1").style.display = 'block';
                        document.getElementById("worker-name-select").value= worker.lastName +""+ worker.firstName;
                        
                      break;
                        case 'edit':
                             Swal.fire({
                position: "center",
                icon: "success",
                title: "Edit not yet implemented",
                showConfirmButton: true,
                timer: 1500
            });
                        break;
                        case 'delete':
                             Swal.fire({
                position: "center",
                icon: "error",
                title: "delete not yet implemented",
                showConfirmButton: true,
                timer: 1500
                
           
            });
            
        }
    });
});
        }
    }
}
                
        