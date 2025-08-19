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
  //  Count Workers
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

    const transaction = db.transaction("consumption", "readonly");
    const store = transaction.objectStore("consumption");
    const getAllRequest = store.getAll();
    getAllRequest.onsuccess = function () {
        let totalAmount = 0;

        getAllRequest.result.forEach(consumption => {
            const amountValue = parseInt(consumption.amount.replace("XAF", ""))
            if(!isNaN(amountValue)) {
            totalAmount += amountValue;
            }
        });

        document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
    };
}
  };
