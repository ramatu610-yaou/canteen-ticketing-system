
/*var department = ["PDL", "MARKETING", "PRINTING", "MOUNTING", "TYPESETTING", "FINISHING", "ACOUNTING", "SECURITY", "SCREEN PRINTING", "CANTEEN"];
var description = ["Project Driving Lisence", "Manage entrance", "Print Everything", "Mount Before Print", "Apply Form To What To Print", "Finish The Work", "Manage Money", "Ensure Company Security", "Screen Printing", "Food Is Ready"];

// Pour chaque departement et une decription on cree un objet
for (let i = 0; i < department.length; i++) {
    let request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["department"], "readwrite");
        const objectStore = transaction.objectStore("department");
        const departmentData = {
            name: department[i],
            description: description[i]
        };
        const addRequest = objectStore.add(departmentData);

        addRequest.onerror = function() {
            console.error(`Error adding department ${department[i]}: `, addRequest.error);
        }; 
    };
}*/
 

function listDepartments() {
    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["department"], "readonly");
        const objectStore = transaction.objectStore("department");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const departments = getAllRequest.result;

            // Pour Register Consumption
            const selectConsumption = document.getElementById("department-consumption");
            if (selectConsumption) {
                selectConsumption.innerHTML = '<option value="">Select...</option>';
                departments.forEach(department => {
                    const option = document.createElement("option");
                    option.value = department.name;
                    option.textContent = department.name;
                    selectConsumption.appendChild(option);
                });
            }

            // Pour Register Worker (si tu veux aussi remplir dynamiquement)
            const selectWorker = document.getElementById("department");
            if (selectWorker) {
                selectWorker.innerHTML = '<option value="">Select...</option>';
                departments.forEach(department => {
                    const option = document.createElement("option");
                    option.value = department.name;
                    option.textContent = department.name;
                    selectWorker.appendChild(option);
                });
            }
        };
    };
}


function listWorkersByDepartment() {
    // Récupère la valeur sélectionnée dans le select
    const selectedDepartment = document.getElementById("department-consumption").value;

    const request = indexedDB.open("cantisysDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["workers"], "readonly");
        const objectStore = transaction.objectStore("workers");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const allWorkers = getAllRequest.result;
            // Filtre les workers selon le département choisi
            const filteredWorkers = allWorkers.filter(worker => worker.department === selectedDepartment);

            // Exemple : remplir le select des workers
            const workerSelect = document.getElementById("worker-name");
            if (workerSelect) {
                workerSelect.innerHTML = '<option value="">Choose Worker...</option>';
                filteredWorkers.forEach(worker => {
                    const option = document.createElement("option");
                    option.value =  worker.lastName + " " + worker.firstName; 
                    option.textContent = worker.lastName +" " + worker.firstName;
                    workerSelect.appendChild(option);
                
                });
            }
        };
    };
}