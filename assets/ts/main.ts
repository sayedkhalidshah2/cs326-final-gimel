$('#sideNav').on('hidden.bs.collapse', function () {
    $("#sideNav").addClass("d-none d-sm-block collapse" )
})
$('#sideNav').on('show.bs.collapse', function () {
    $("#sideNav").removeClass("d-none d-sm-block")
})
