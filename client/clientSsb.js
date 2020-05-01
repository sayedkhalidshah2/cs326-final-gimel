/* eslint-disable no-mixed-spaces-and-tabs */
const url = " http://localhost:8080/api"

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



function addItem(rest) {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		let itemCost = document.getElementById("itemcost").value;
		let itemDescription = document.getElementById("itemdescription").value;
		let itemGroup = document.getElementById("itemgroup").value;
		const data = { "rest": rest,"name" : itemName,"cost": itemCost, 
						"descr": itemDescription, 'type':itemGroup }; // -- (1)
		// const newURL = url + "/menus/" + data +"/create"; // used to be ?name=" + counterName; -- (2)
		// console.log("AddingItemCreate: fetching " + newURL);
		const resp = await postData(url+"/menus/"+rest, data) ;// used to be fetch -- (3)
		const j = await resp.json();

		if (j["result"] !== "error") {
			// document.getElementById("output").innerHTML = "101: <b>" + itemName + ", " + itemDescription + " created.</b>";
			readMenu(rest)
		} else {
	    	// document.getElementById("output").innerHTML = "100: " + itemName + ", " + itemDescription + " not found.</b>";
		}
	})();
}



function readItem(rest) {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		const newURL = url + "/menus/"+rest+"/"+itemName; // used to be ?name=" + counterName; -- (2)
		console.log("counterRead: fetching " + newURL);
		const resp = await fetch(newURL,{
			method:"GET"
		});
		const j = await resp.json();
		const str = j["name"]+"|"+j["cost"]+"|"+j["descr"]+"|";	
		if (j["result"] !== "error") {
			// document.getElementById("output").innerHTML = "201: <b>" +str + " found.</b>";
		} else {
	    	// document.getElementById("output").innerHTML = "200: " +  itemName +" not found.</b>";
		}  
	})();
}

function readMenu(rest){
	(async () => {
		// const newURL = url + "/menus/"+rest
		const newURL = url+"/menus/"+rest
		const resp = await fetch(newURL,{
			method:"GET"
		});
		const j = await resp.json();
		console.log(j)

		itemlist = j["items"]
		var element = document.getElementById("menu")
		element.innerHTML=""
		var i;
		for (i = 0; i < j.length; i++) {
			var div = document.createElement("section")
			var line_1 = document.createElement("p")
			var line_2 = document.createElement("p")
			item = j[i]
			// text = item["name"]+"......$"+item["cost"]+"\""+item["descr"]+"\"";
			var node_1 = document.createTextNode(item["name"]+".......... $"+item["cost"])
			var node_2 = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\""+item["descr"]+"\"")
			line_1.appendChild(node_1)
			line_2.appendChild(node_2)
			div.appendChild(line_1)
			div.appendChild(line_2)
			element.appendChild(div)
		}
	})();
}




function updateItem(rest) {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		let itemCost = document.getElementById("itemcost").value;
		let itemDescription = document.getElementById("itemdescription").value;
		let itemGroup = document.getElementById("itemgroup").value;
		const data = { "rest": rest,"name" : itemName,"cost": itemCost, 
						"descr": itemDescription, 'type':itemGroup }; // -- (1)
		const newURL = url + "/menus/" + data +"/create";; // used to be ?name=" + counterName; -- (2)
		console.log("AddingItemCreate: fetching " + newURL);
		const resp = await postData(url+"/menus/sylvan", data) ;// used to be fetch -- (3)
		const j = await resp.json();

		if (j["result"] !== "error") {
			// document.getElementById("output").innerHTML = "101: <b>" + itemName + ", " + itemDescription + " updated.</b>";
			readMenu(rest)
		} else {
	    // document.getElementById("output").innerHTML = "100: " + itemName + ", " + itemDescription + " not found.</b>";
		}
	})();
}

function deleteItem(rest) {
	(async () => {
		let itemName = document.getElementById("itemname").value;
		const newURL = url+"/menus/"+rest +"/"+itemName
		const resp = await fetch(newURL, {
			method:"DELETE"
		});	    
		const j = await resp.json();
		
		if (j["result"] !== "error") {
			// document.getElementById("output").innerHTML = "401: <b>" + itemName + " deleted.</b>";
			readMenu(rest)
		} else {
	    // document.getElementById("output").innerHTML = "400: " + itemName + " not found.</b>";
		}	    
	})();
}
