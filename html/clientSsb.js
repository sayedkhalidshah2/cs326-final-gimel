/* eslint-disable no-mixed-spaces-and-tabs */
const url = "http://localhost:8080"

async function postData(url, data) {
	const resp = await fetch(url,
		{
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json"
			},
			redirect: "follow",
			body: JSON.stringify(data)
		});
	return resp;
}



function addItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		let itemCost = document.getElementById("itemcost").value;
		let itemDescription = document.getElementById("itemdescription").value;
		let itemGroup = document.getElementById("itemgroup").value;
		const data = { "rest": "sylvan","name" : itemName,"cost": itemCost, 
						"descr": itemDescription, 'type':itemGroup }; // -- (1)
		const newURL = url + "/menus/" + data +"/create";; // used to be ?name=" + counterName; -- (2)
		console.log("AddingItemCreate: fetching " + newURL);
		const resp = await postData("http://localhost:8080/menus/sylvan", data) ;// used to be fetch -- (3)
		const j = await resp.json();

		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "101: <b>" + itemName + ", " + itemDescription + " created.</b>";
		} else {
	    document.getElementById("output").innerHTML = "100: " + itemName + ", " + itemDescription + " not found.</b>";
		}
	})();
}



function readItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		let itemRest = "sylvan";
		const newURL = url + "/menus/" + itemRest + "/"+itemName; // used to be ?name=" + counterName; -- (2)
		console.log("counterRead: fetching " + newURL);
		const resp = await fetch(newURL);
		const j = await resp.json();
		console.log(j)
		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "201: <b>"  + itemName + ", " + itemDescription + " value = " + j.body["value"] + "</b>";
		} else {
	    document.getElementById("output").innerHTML = "200: " +  itemName + ", " + itemDescription + " not found.</b>";
		}	    
	})();
}




function updateItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		let itemCost = document.getElementById("itemcost").value;
		let itemDescription = document.getElementById("itemdescription").value;
		let itemGroup = document.getElementById("itemgroup").value;
		const data = { "name" : itemName,"cost": itemCost, 
						"desc": itemDescription, 'type':itemGroup };
		const newURL = url + "/menus/" + data +"/update" ; // used to be ?name=" + counterName; -- (2)
		console.log("counterUpdate: fetching " + newURL);
		const resp = await postData(newURL, data);    
		const j = await resp.json();
		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "301: <b>" + itemName + ", " + itemDescription + " value = " + j["value"] + "</b>";
		} else {
	    document.getElementById("output").innerHTML = "300: " + itemName + ", " + itemDescription + " not found.";
		}	    
	})();
}

function deleteItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		// let itemGroup = document.getElementById("itemgroup").value;
		// let itemCost = document.getElementById("itemcost").value;
		// let itemDescription = document.getElementById("itemdescription").value;
		const data = { "name" : itemName }; // -- (1)
		const newURL = url + "/menus/" + data + "/delete"; // used to be ?name=" + counterName; -- (2)
		console.log("counterDelete: fetching " + newURL);
		const resp = await postData(newURL, data);	    
		const j = await resp.json();
		
		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "401: <b>" + itemName + " deleted.</b>";
		} else {
	    document.getElementById("output").innerHTML = "400: " + itemName + " not found.</b>";
		}	    
	})();
}
