let db 

const request = indexedDB.open("consumptionDb",1);
request.onupgradeneeded = function(event){
    db = event.target.result;
    
    const store = db.creatObjectstore("consumption",{ keypath: "id", autoIncrement: true });

    store.createindex("first name", "first name",{unique: false});
     store.createindex("last name", "last name",{unique: false});
     store.createindex("Department", "department",{unique: false});
 store.createindex("items", "items",{unique: false});
  store.createindex("date", "date",{unique: false});
   store.createindex("total", "total",{unique: false});
}
request.onsuccess = function(event) {
    db = event.target.result;
console.log("database opened successfully");
};request.onerror = function(event) {
  alert("error open indexedDB: " +
    event.target.onerror);
};
