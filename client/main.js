/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
//TODO: disable tab when active
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//Nav bar controllers
var ur = "http://localhost:8080";
$("#sideNav").on("hidden.bs.collapse", function () {
    $("#sideNav").height("93vh");
    $("#sideNav").addClass("d-none d-sm-block collapse");
});
$("#sideNav").on("show.bs.collapse", function () {
    $("#sideNav").height("auto");
    $("#sideNav").width("100vw");
    $("#sideNav").removeClass("d-none d-sm-block");
});
$("#icon").click(function () {
    $(".nav-link").removeClass("active");
});
// page refresh logic
$(document).ready(function () {
    return __awaiter(this, void 0, void 0, function () {
        var resturaunts, _i, resturaunts_1, resturaunt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("generating nav bar");
                    return [4 /*yield*/, getData("/menus")];
                case 1:
                    resturaunts = _a.sent();
                    console.log(resturaunts);
                    for (_i = 0, resturaunts_1 = resturaunts; _i < resturaunts_1.length; _i++) {
                        resturaunt = resturaunts_1[_i];
                        console.log(resturaunt.name);
                        $("<a>", {
                            text: resturaunt.name,
                            title: resturaunt.name,
                            class: "nav-link",
                            id: "nav-" + resturaunt.name,
                            "data-toggle": "pill",
                            "role": "tab",
                            "aria-controls": "pill-" + resturaunt.name,
                            href: "#pill-" + resturaunt.name,
                            "data-source": resturaunt.name,
                            click: createPage,
                        }).prependTo("#sideNavBack");
                        $("<div>", {
                            class: "tab-pane fade",
                            id: "pill-" + resturaunt.name,
                            "role": "tabpanel",
                        }).appendTo("#v-pills-tabContent");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
//modal logic
$("#exampleModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var rest = button.data("source"); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    $("#add-item-button").data("resturaunt", rest);
});
//add item logic
$("#add-item-button").click(function () {
    return __awaiter(this, void 0, void 0, function () {
        var rest, name, cost, des, cat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("add item clicked");
                    rest = $("#add-item-button").data("resturaunt");
                    name = $("#add-item-name").val();
                    cost = $("#add-item-cost").val();
                    des = $("#add-item-des").val();
                    cat = $("#add-item-cat").val();
                    return [4 /*yield*/, addItem(rest, name, cost, des, cat)];
                case 1:
                    _a.sent();
                    $("#add-item-form").trigger("reset");
                    return [4 /*yield*/, createPage(rest)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
//add resturaunt logic
$("#add-resturaunt-button").click(function (event) {
    return __awaiter(this, void 0, void 0, function () {
        var name, des;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("add rest clicked");
                    name = $("#add-rest-name").val();
                    des = $("#add-rest-des").val();
                    return [4 /*yield*/, addRest(name, des)];
                case 1:
                    _a.sent();
                    location.reload();
                    return [2 /*return*/];
            }
        });
    });
});
//login logic
$("#login-button").click(function (event) {
    return __awaiter(this, void 0, void 0, function () {
        var code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("login clicked");
                    code = $("#login-code").val();
                    return [4 /*yield*/, login(code)
                        // location.reload()
                    ];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
function createPage(resturaunt) {
    return __awaiter(this, void 0, void 0, function () {
        var related, items, html, _i, items_1, item, button, button2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // TODO: do this only once per load
                    if (resturaunt.target) {
                        console.log("this is an event");
                        related = $(resturaunt.target) // Button that triggered the modal
                        ;
                        resturaunt = related.data("source"); // Extract info from data-* attributes
                    }
                    console.log("creating " + resturaunt);
                    return [4 /*yield*/, getData("/menus/" + resturaunt)];
                case 1:
                    items = _a.sent();
                    html = "";
                    for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                        item = items_1[_i];
                        console.log(item);
                        html +=
                            "<div class=\"card\">\n\t\t\t<div class=\"card-body\">\n\t\t\t\t<h5 class=\"card-title\">" + item.name + "</h5>\n\t\t\t\t<h6 class=\"card-subtitle mb-2 text-muted\">$" + item.cost + "</h6>\n\t\t\t\t<p class=\"card-text\">" + item.descr + "</p>\n\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteItem('" + resturaunt + "' , '" + item.name + "')\">Remove item</button>\n\t\t\t</div>\n\t\t</div>";
                    }
                    button = $("<button>", {
                        class: "btn btn-primary",
                        text: "Add or edit item",
                        "data-source": resturaunt,
                        "data-toggle": "modal",
                        "data-target": "#exampleModal"
                    });
                    button2 = $("<button>", {
                        class: "btn btn-danger",
                        text: "Delete this resturaunt",
                        "data-source": resturaunt,
                        click: deleteRest
                    });
                    $("#pill-" + resturaunt).html(html).append(button, button2);
                    return [2 /*return*/];
            }
        });
    });
}
function addItem(rest, name, cost, des, cat) {
    if (rest === void 0) { rest = "default "; }
    if (name === void 0) { name = "default"; }
    if (cost === void 0) { cost = 0; }
    if (des === void 0) { des = "default"; }
    if (cat === void 0) { cat = "default"; }
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("adding item " + name);
                    data = {
                        "name": name,
                        "cost": cost,
                        "descr": des,
                        "type": cat,
                    };
                    return [4 /*yield*/, postData("/menus/" + rest, data)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addRest(rest, des) {
    if (rest === void 0) { rest = "default"; }
    if (des === void 0) { des = "default"; }
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("adding rest " + rest);
                    data = {
                        "name": rest,
                        "descr": des,
                    };
                    return [4 /*yield*/, postData("/menus/", data)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteItem(resturant, item) {
    if (resturant === void 0) { resturant = "default"; }
    if (item === void 0) { item = "default"; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("deleting item " + name);
                    return [4 /*yield*/, deleteData("/menus/" + resturant + "/" + item)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createPage(resturant)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteRest(restaurant) {
    return __awaiter(this, void 0, void 0, function () {
        var related;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (restaurant.target) {
                        console.log("this is an event");
                        related = $(restaurant.target) // Button that triggered the modal
                        ;
                        restaurant = related.data("source"); // Extract info from data-* attributes
                    }
                    console.log("deleting rest " + restaurant);
                    return [4 /*yield*/, deleteData("/menus/" + restaurant)];
                case 1:
                    _a.sent();
                    location.reload();
                    return [2 /*return*/];
            }
        });
    });
}
function login(code) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { "code": code };
                    console.log(data);
                    return [4 /*yield*/, postData("/login", data)];
                case 1:
                    response = (_a.sent()).json;
                    if (response.status === 404) {
                        console.log("yikes");
                    }
                    else {
                        console.log(response);
                        // document.cookie = `bergerbar=${response}`
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(ur + url, {
                        method: "GET",
                        mode: "cors",
                        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        // credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json"
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()]; // parses JSON response into native JavaScript objects
            }
        });
    });
}
function deleteData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(ur + url, {
                        method: "DELETE",
                        mode: "cors",
                        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        // credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json"
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()]; // parses JSON response into native JavaScript objects
            }
        });
    });
}
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(ur + url, {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json"
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: "follow",
                        referrerPolicy: "no-referrer",
                        body: JSON.stringify(data) // body data type must match "Content-Type" header
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()]; // parses JSON response into native JavaScript objects
            }
        });
    });
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
