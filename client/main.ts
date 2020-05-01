//TODO: disable tab when active

//Nav bar controllers
$("#sideNav").on("hidden.bs.collapse", function () {
	$("#sideNav").addClass("d-none d-sm-block collapse" )
	$("#sideNavBack").height("100vh")
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
	const resturaunts: Array<any> = await getData("/menus")
	console.log(resturaunts)
	for(const resturaunt of resturaunts){
		console.log(resturaunt)
		$("<a>",{
			text: resturaunt.name,
			title: resturaunt.name,
			class: "nav-link",
			id: "nav-" + resturaunt.name,
			"data-toggle": "pill",
			"role":"tab",
			"aria-controls": "pill-" + resturaunt.name,
			href: "#pill-" + resturaunt.name,
			click: createPage,

		}).appendTo("#sideNavBack")

		$("<div>",{
			class: "tab-pane fade",
			id: "pill-" + resturaunt.name,
			"role":"tabpanel",
	
		}).appendTo("#v-pills-tabContent")
	}

})

//modal logic
$("#exampleModal").on("show.bs.modal", function (event) {
	const button = $(event.relatedTarget) // Button that triggered the modal
	const rest = button.data("source") // Extract info from data-* attributes
	// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	const modal = $(this)
	$("#add-item-button").data("resturaunt", rest)
})

//add item logic
$("#add-item-button").click( async function () {
	const rest = $("#add-item-button").data("resturaunt")
	const name = $("#add-item-name").val()
	const cost = $("#add-item-cost").val()
	const des = $("#add-item-des").val()
	const cat = $("#add-item-cat").val()

	await addItem(rest,name, cost, des, cat)
	$("#add-item-form").trigger("reset")
})



async function createPage(click: any): Promise<any>{
	const resturaunt = click.target.innerHTML
	// TODO: do this only once per load
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


	$("#pill-" + resturaunt).html(html).append(button)
	

}
async function addItem(rest,name, cost, des, cat): Promise<any>{
	const data = {
		"name": name,
		"cost": cost,
		"descr": des,
		"type": cat,
	}
	await postData(`/menus/${rest}`, data)
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