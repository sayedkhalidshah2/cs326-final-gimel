/* eslint-disable no-mixed-spaces-and-tabs */
const url = "http://localhost:8080/counter"

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
		})
	return resp
}



function addItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value
		let itemGroup = document.getElementById("itemgroup").value
		let itemCost = document.getElementById("itemcost").value
		let itemDescription = document.getElementById("itemdescription").value
		const data = { "name" : itemName, "group":itemGroup
			,"cost": itemCost, "desc": itemDescription } // -- (1)
		const newURL = url + "/users/" + itemName + "/create" // used to be ?name=" + counterName; -- (2)
		console.log("counterCreate: fetching " + newURL)
		const resp = await postData(newURL, data) // used to be fetch -- (3)
		const j = await resp.json()

		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>"
		} else {
	    document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>"
		}
	})()
}



function readItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value
		let itemGroup = document.getElementById("itemgroup").value
		let itemCost = document.getElementById("itemcost").value
		let itemDescription = document.getElementById("itemdescription").value
		const data = { "name" : itemName, "group":itemGroup
			,"cost": itemCost, "desc": itemDescription } // -- (1)
		const newURL = url + "/users/" + itemName + "/read" // used to be ?name=" + counterName; -- (2)
		console.log("counterRead: fetching " + newURL)
		const resp = await postData(newURL, data)
		const j = await resp.json()
		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "201: <b>"  + userName + ", " + counterName + " value = " + j["value"] + "</b>"
		} else {
	    document.getElementById("output").innerHTML = "200: " +  userName + ", " + counterName + " not found.</b>"
		}	    
	})()
}




function updateItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value
		let itemGroup = document.getElementById("itemgroup").value
		let itemCost = document.getElementById("itemcost").value
		let itemDescription = document.getElementById("itemdescription").value
		const data = { "name" : itemName, "group":itemGroup
			,"cost": itemCost, "desc": itemDescription }
		const newURL = url + "/users/" + itemName +"/update"  // used to be ?name=" + counterName; -- (2)
		console.log("counterUpdate: fetching " + newURL)
		const resp = await postData(newURL, data)    
		const j = await resp.json()
		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "301: <b>" + userName + ", " + counterName + " value = " + j["value"] + "</b>"
		} else {
	    document.getElementById("output").innerHTML = "300: " + userName + ", " + counterName + " not found."
		}	    
	})()
}

function deleteItem() {
	(async () => {
		let itemName = document.getElementById("itemname").value
		// let itemGroup = document.getElementById("itemgroup").value;
		// let itemCost = document.getElementById("itemcost").value;
		// let itemDescription = document.getElementById("itemdescription").value;
		const data = { "name" : itemName } // -- (1)
		const newURL = url + "/users/" + itemName + "/delete" // used to be ?name=" + counterName; -- (2)
		console.log("counterDelete: fetching " + newURL)
		const resp = await postData(newURL, data)	    
		const j = await resp.json()
		
		if (j["result"] !== "error") {
	    document.getElementById("output").innerHTML = "401: <b>" + userName + ", " + counterName + " deleted.</b>"
		} else {
	    document.getElementById("output").innerHTML = "400: " + userName + ", " + counterName + " not found.</b>"
		}	    
	})()
}
