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
    
        
    

