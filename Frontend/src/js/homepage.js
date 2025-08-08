document.addEventListener("DOMContentLoaded", function () {
  const dbRequest = indexedDB.open("cantisysDb", 1);

  dbRequest.onsuccess = function (event) {
    const db = event.target.result;
    updateHomePage(db);
  };

  dbRequest.onerror = function () {
    console.error("Failed to open database");
  };
});

function updateHomePage(db) {
  //  Count workers
  const workerTransaction = db.transaction("workers", "readonly");
  const workerStore = workerTransaction.objectStore("workers");
  const workerRequest = workerStore.getAll();

  workerRequest.onsuccess = function () {
    const workers = workerRequest.result;
    document.getElementById("workerCount").innerText = workers.length;
  };

  //  Count debts 
  const debtTransaction = db.transaction("consumption", "readonly");
  const debtStore = debtTransaction.objectStore("consumption");
  const debtRequest = debtStore.getAll();

  debtRequest.onsuccess = function () {
    const debts = debtRequest.result;
    document.getElementById("debtCount").innerText = debts.length;

    //sum total amount
    const total = debts.reduce((extra, consumption) => extra + consumption(consumption.amount || 0), 0);
    document.getElementById("totalAmount").innerText = total.toLocaleString() + " XAF";
  };
}