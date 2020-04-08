var money = 0;
var actionReady = true;

var multiplierRate = {
    saleMultiplier : 1,
    retrieveMultiplier : 1,
    packageMultiplier : 1,
    deliverMultiplier : 1,
    sellprice : 10
}

var actionRate = {
    saleRate : 10,
    retriveRate : 50,
    packageRate : 50,
    deliverRate : 100
}

var warehouse = {
    // warehouseNum: 0,
    orders : 0,
    salespeople: 0,
    retrievedOrders: 0,
    retrievers : 0,
    packagedOrders: 0,
    packaged : 0,
    courier : 0,
}

var warehouses = [warehouse]

function makeSale(warehouseNum){
    if(actionReady == true){
        actionBar(actionRate.saleRate);
        warehouses[warehouseNum].orders = warehouses[warehouseNum].orders + multiplierRate.saleMultiplier;
        updateElements(warehouseNum);
    }
}

function retrieveOrder(warehouseNum){
    if(actionReady == true && warehouses[warehouseNum].orders > 0){
        if (warehouses[warehouseNum].orders - multiplierRate.retrieveMultiplier <= 0){
            var retrieveInc = warehouses[warehouseNum].orders;
        }
        else {
            var retrieveInc = multiplierRate.retrieveMultiplier;
        }
        console.log(retrieveInc);
        warehouses[warehouseNum].retrievedOrders = warehouses[warehouseNum].retrievedOrders + retrieveInc;
        warehouses[warehouseNum].orders = warehouses[warehouseNum].orders - retrieveInc;
        updateElements(warehouseNum);
        actionBar(actionRate.retriveRate);
}
}

function packageOrder(warehouseNum){
    if(actionReady == true && warehouses[warehouseNum].retrievedOrders > 0){
        if (warehouses[warehouseNum].retrievedOrders - multiplierRate.packageMultiplier <= 0){
            var packageInc = warehouses[warehouseNum].retrievedOrders;
        }
        else {
            var packageInc = multiplierRate.packageMultiplier;
        }
        warehouses[warehouseNum].packagedOrders = warehouses[warehouseNum].packagedOrders + packageInc;
        warehouses[warehouseNum].retrievedOrders = warehouses[warehouseNum].retrievedOrders - packageInc;
        updateElements(warehouseNum);
        actionBar(actionRate.packageRate);
    }
}

function deliverPackage(warehouseNum){
    if(actionReady == true && warehouses[warehouseNum].packagedOrders > 0){
        if (warehouses[warehouseNum].packagedOrders - multiplierRate.deliverMultiplier <= 0){
            var deliverInc = warehouses[warehouseNum].packagedOrders;
        }
        else {
            var deliverInc = multiplierRate.deliverMultiplier;
        }
        makeMoney(deliverInc);
        warehouses[warehouseNum].packagedOrders = warehouses[warehouseNum].packagedOrders - deliverInc;
        updateElements(warehouseNum);
        actionBar(actionRate.deliverRate);
    }
}

function makeMoney(packages){
    money = money + (packages * multiplierRate.sellprice);
    document.getElementById('money').innerHTML = money;
}

function actionBar(interval){
    if (actionReady == true){
        actionReady = false;
        var elem = document.getElementById("actionProgressBar");
        elem.style.width = 1;
        elem.style.backgroundColor = 'red';
        var width = 1;
        var id = setInterval(frame, interval);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                actionReady = true;
                elem.style.backgroundColor = '#4CAF50';
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "%";
            }
        }
    }
}

function updateElements(warehouseNum){
    document.getElementById('orders'.concat(warehouseNum)).innerHTML = warehouses[warehouseNum].orders;
    document.getElementById('retrievedOrders'.concat(warehouseNum)).innerHTML = warehouses[warehouseNum].retrievedOrders;
    document.getElementById('packagedOrders'.concat(warehouseNum)).innerHTML = warehouses[warehouseNum].packagedOrders;
}