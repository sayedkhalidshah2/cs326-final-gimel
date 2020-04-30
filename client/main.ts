//Nav bar controllers
$("#sideNav").on("hidden.bs.collapse", function () {
	$("#sideNav").addClass("d-none d-sm-block collapse" )
	$("#sideNavBack").height("100vh")
})
$("#sideNav").on("show.bs.collapse", function () {
	$("#sideNavBack").height("auto")
	$("#sideNav").removeClass("d-none d-sm-block")
})

$( document ).ready(async function() {
	const resturaunts: Array<any> = await  getData("/menus")
	console.log(resturaunts)
	for(let resturaunt of resturaunts){
		console.log(resturaunt)
		$("<a>",{
			text: resturaunt.name,
			title: resturaunt.name,
			class: "nav-link",
			id: "nav-" + resturaunt.name,
			"data-toggle": "pill",
			"role":"tab",
			"aria-controls": "pill" + resturaunt.name,
			"aria-selected": "false",
			href: "#",

		}).appendTo("#sideNavBack")
	}
})


async function getData(url =  ""){
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

async function postData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(port + url, {
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