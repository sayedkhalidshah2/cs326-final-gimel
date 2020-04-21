const url = "http://0.0.0.0:8081/counter"; // NOTE NEW URL

function addItem() {
    (async () => {
	let itemName = document.getElementById("itemname").value;
	let itemGroup = document.getElementById("itemgroup").value;
	let itemCost = document.getElementById("itemcost").value;
	let itemDescription = document.getElementById("itemdescription").value;
	const newURL = url + "/users/" + itemName + "/create?name=" + itemGroup+"&group=" + itemCost+"&value="+itemDescription;
	console.log("counterCreate: fetching " + newURL);
	const resp = await fetch(newURL);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
	} else {
	    document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
	}
    })();
}

function readItem() {
    (async () => {
		let itemName = document.getElementById("itemname").value;
		let itemGroup = document.getElementById("itemgroup").value;
		let itemCost = document.getElementById("itemcost").value;
		let itemDescription = document.getElementById("itemdescription").value;
		const newURL = url + "/users/" + itemName + "/read?name=" + itemGroup+"&group=" + itemCost+"&value="+itemDescription;
	console.log("counterRead: fetching " + newURL);
	const resp = await fetch(newURL);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "201: <b>"  + userName + ", " + counterName + " value = " + j['value'] + "</b>";
	} else {
	    document.getElementById("output").innerHTML = "200: " +  userName + ", " + counterName + " not found.</b>";
	}	    
    })();
}

function updateItem() {
    (async () => {
		let itemName = document.getElementById("itemname").value;
		let itemGroup = document.getElementById("itemgroup").value;
		let itemCost = document.getElementById("itemcost").value;
		let itemDescription = document.getElementById("itemdescription").value;
	const newURL = url + "/users/" + itemName + "/update?name=" + itemGroup + "&value=" + itemCost+"&desc"+itemDescription;
	console.log("counterUpdate: fetching " + newURL);
	const resp = await fetch(newURL);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "301: <b>" + userName + ", " + counterName + " value = " + j['value'] + "</b>";
	} else {
	    document.getElementById("output").innerHTML = "300: " + userName + ", " + counterName + " not found.";
	}	    
    })();
}

function deleteItem() {
    (async () => {
		let itemName = document.getElementById("itemname").value;
		let itemGroup = document.getElementById("itemgroup").value;
		let itemCost = document.getElementById("itemcost").value;
		let itemDescription = document.getElementById("itemdescription").value;
		const newURL = url + "/users/" + itemName + "/delete?name=" + itemGroup+"&group=" + itemCost+"&value="+itemDescription;
	console.log("counterDelete: fetching " + newURL);
	const resp = await fetch(newURL);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "401: <b>" + userName + ", " + counterName + " deleted.</b>";
	} else {
	    document.getElementById("output").innerHTML = "400: " + userName + ", " + counterName + " not found.</b>";
	}	    
    })();
}
