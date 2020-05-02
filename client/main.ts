/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
//TODO: disable tab when active

//Nav bar controllers
$("#sideNav").on("hidden.bs.collapse", function () {
	$("#sideNav").addClass("d-none d-sm-block collapse" )
})
$("#sideNav").on("show.bs.collapse", function () {
	$("#sideNavBack").height("auto")
	$("#sideNav").removeClass("d-none d-sm-block")
})
$("#icon").click( function() {
	$(".nav-link").removeClass("active")
})

// page refresh logic
$( document ).ready(async function() {
	console.log("generating nav bar")
	const resturaunts: Array<any> = await getData("/menus")
	for(const resturaunt of resturaunts){
		$("<a>",{
			text: resturaunt.name,
			title: resturaunt.name,
			class: "nav-link",
			id: "nav-" + resturaunt.name,
			"data-toggle": "pill",
			"role":"tab",
			"aria-controls": "pill-" + resturaunt.name,
			href: "#pill-" + resturaunt.name,
			"data-source": resturaunt.name,
			click: createPage,

		}).prependTo("#sideNavBack")

		$("<div>",{
			class: "tab-pane fade",
			id: "pill-" + resturaunt.name,
			"role":"tabpanel",
	
		}).appendTo("#v-pills-tabContent")
	}

})

//modal logic
$("#exampleModal").on("show.bs.modal", function (event: any) {
	const button = $(event.relatedTarget) // Button that triggered the modal
	const rest = button.data("source") // Extract info from data-* attributes
	// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	const modal = $(this)
	$("#add-item-button").data("resturaunt", rest)
})

//add item logic
$("#add-item-button").click( async function () {
	console.log("add item clicked")
	const rest: string = $("#add-item-button").data("resturaunt")
	const name: string = $("#add-item-name").val() as string
	const cost: number = $("#add-item-cost").val() as number
	const des: string = $("#add-item-des").val() as string
	const cat: string= $("#add-item-cat").val() as string

	await addItem(rest, name, cost, des, cat)
	$("#add-item-form").trigger("reset")
	await createPage(rest)
})

//add resturaunt logic
$("#add-resturaunt-button").click( async function (event) {
	console.log("add rest clicked")
	const name = $("#add-rest-name").val() as string
	const des = $("#add-rest-des").val() as string
	await addRest(name,des)
	location.reload()

})


async function createPage(resturaunt): Promise<any>{
	// TODO: do this only once per load
	if(resturaunt.target){
		console.log("this is an event")
		const related = $(resturaunt.target) // Button that triggered the modal
		resturaunt = related.data("source") // Extract info from data-* attributes
	}

	console.log(`creating ${resturaunt}`)
	const items: Array<any> = await getData("/menus/" + resturaunt)

	let html = ""

	for(const item of items){
		console.log(item)
		html += 
			`<div class="card">
				<div class="card-body">
					<h5 class="card-title">${item.name}</h5>
					<h6 class="card-subtitle mb-2 text-muted">$${item.cost}</h6>
					<p class="card-text">${item.descr}</p>
					<button type="button" class="btn btn-danger" onclick="deleteItem('${resturaunt}' , '${item.name}')">Remove item</button>
				</div>
			</div>`
	}


	const button =	$("<button>",{
		class: "btn btn-primary",
		text: "Add or edit item",
		"data-source": resturaunt,
		"data-toggle": "modal",
		"data-target": "#exampleModal"
	})

	const button2 =	$("<button>",{
		class: "btn btn-danger",
		text: "Delete this resturaunt",
		"data-source": resturaunt,
		click: deleteRest
	})



	$("#pill-" + resturaunt).html(html).append(button, button2)
	

}
async function addItem(rest = "default ",name="default", cost = 0, des= "default", cat = "default"): Promise<any>{
	console.log(`adding item ${name}`)
	const data = {
		"name": name,
		"cost": cost,
		"descr": des,
		"type": cat,
	}
	await postData(`/menus/${rest}`, data)
}

async function addRest(rest="default",des="default"): Promise<any>{
	console.log(`adding rest ${rest}`)
	const data = {
		"name": rest,
		"descr": des,	}
	await postData("/menus/", data)
}

async function deleteItem(resturant="default", item="default"): Promise<any>{
	console.log(`deleting item ${name}`)
	await deleteData(`/menus/${resturant}/${item}`)
	await createPage(resturant)
}

async function deleteRest(restaurant): Promise<any>{
	if(restaurant.target){
		console.log("this is an event")
		const related = $(restaurant.target) // Button that triggered the modal
		restaurant = related.data("source") // Extract info from data-* attributes
	}

	console.log(`deleting rest ${restaurant}`)
	await deleteData(`/menus/${restaurant}`)
	location.reload()

}

async function getData(url): Promise<any>{
	const response = await fetch(url, {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		// credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json"
		// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		// redirect: "follow", // manual, *follow, error
		// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(data) // body data type must match "Content-Type" header
	})
	return response.json() // parses JSON response into native JavaScript objects
}



async function deleteData(url): Promise<any>{
	const response = await fetch(url, {
		method: "DELETE", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		// credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json"
		// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		// redirect: "follow", // manual, *follow, error
		// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(data) // body data type must match "Content-Type" header
	})
	return response.json() // parses JSON response into native JavaScript objects

}

async function postData(url, data): Promise<any> {
	// Default options are marked with *
	const response = await fetch( url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json"
		// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	})
	return response.json() // parses JSON response into native JavaScript objects
}