/* eslint-disable no-mixed-spaces-and-tabs */
const url = " https://gimel-final.herokuapp.com/api"

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
		const newURL = url + "/menus/" + data +"/create"; // used to be ?name=" + counterName; -- (2)
		console.log("AddingItemCreate: fetching " + newURL);
		const resp = await postData(url+"/menus/sylvan", data) ;// used to be fetch -- (3)
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
		const newURL = url + "/menus/sylvan/"+itemName; // used to be ?name=" + counterName; -- (2)
		console.log("counterRead: fetching " + newURL);
		const resp = await fetch(newURL,{
			method:"GET"
		});
		const j = await resp.json();
		const str = j["name"]+"|"+j["cost"]+"|"+j["descr"]+"|";	
		if (j["result"] !== "error") {
			document.getElementById("output").innerHTML = "201: <b>" +str + " found.</b>";
		} else {
	    	document.getElementById("output").innerHTML = "200: " +  itemName +" not found.</b>";
		}  
	})();
}




function updateItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		let itemCost = document.getElementById("itemcost").value;
		let itemDescription = document.getElementById("itemdescription").value;
		let itemGroup = document.getElementById("itemgroup").value;
		const data = { "rest": "sylvan","name" : itemName,"cost": itemCost, 
						"descr": itemDescription, 'type':itemGroup }; // -- (1)
		const newURL = url + "/menus/" + data +"/create";; // used to be ?name=" + counterName; -- (2)
		console.log("AddingItemCreate: fetching " + newURL);
		const resp = await postData(url+"/menus/sylvan", data) ;// used to be fetch -- (3)
		const j = await resp.json();

		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "101: <b>" + itemName + ", " + itemDescription + " updated.</b>";
		} else {
	    document.getElementById("output").innerHTML = "100: " + itemName + ", " + itemDescription + " not found.</b>";
		}
	})();
}

function deleteItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		const newURL = url + "/menus/sylvan/"+itemName; 
		const resp = await fetch(newURL, {
			method:"DELETE"
		});	    
		const j = await resp.json();
		
		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "401: <b>" + itemName + " deleted.</b>";
		} else {
	    document.getElementById("output").innerHTML = "400: " + itemName + " not found.</b>";
		}	    
	})();
}
