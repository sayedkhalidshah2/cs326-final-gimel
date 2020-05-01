"use strict";
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
exports.__esModule = true;
/* eslint-disable no-mixed-spaces-and-tabs */
// import { URI } from "./secure.json"
var Database = /** @class */ (function () {
    function Database() {
        var _this = this;
        this.URI = require("./secure.json");
        this.MongoClient = require("mongodb").MongoClient;
        this.uri = process.env.MONGO_KEY || this.URI;
        this.dbName = "BergerCluster";
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        // Open up a connection to the client.
        // Open up a connection to the client.
        // The connection is asynchronous, but we can't call await directly
        // in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
        /* from https://anthonychu.ca/post/async-await-typescript-nodejs/

      Async/Await and the Async IIFE

      The await keyword can only be used inside of a function
      marked with the async keyword. [...] One way to do this is
      with an "async IIFE" (immediately invoked function
      expression)...

       (async () => {
       // code goes here
       })();

    */
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    Database.prototype.addResturaunt = function (name, descr) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection("Resturaunts");
                        return [4 /*yield*/, collection.updateOne({ "name": name }, { $set: { "descr": descr } }, { "upsert": true })];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Database.prototype.addItem = function (rest, item, cost, descr, type) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collectionR, resultR, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collectionR = db.collection("Resturaunts");
                        return [4 /*yield*/, collectionR.findOne({ "name": rest })
                            // if(resultR === null){
                            // 	return -1
                            // }
                        ];
                    case 1:
                        resultR = _a.sent();
                        collection = db.collection(rest);
                        console.log("putting " + item);
                        return [4 /*yield*/, collection.updateOne({ "name": item }, { $set: { "descr": descr, "cost": cost, "type": type } }, { "upsert": true })];
                    case 2:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Database.prototype.getItem = function (rest, item) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(rest);
                        console.log("getting " + item);
                        return [4 /*yield*/, collection.findOne({ "name": item })];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + JSON.stringify(result));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Database.prototype.deleteItem = function (rest, item) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(rest);
                        console.log("deleting " + item);
                        return [4 /*yield*/, collection.deleteOne({ "name": item })];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Database.prototype.getResturaunts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection("Resturaunts");
                        console.log("getting resturaunts");
                        return [4 /*yield*/, collection.find().toArray()];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + JSON.stringify(result));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Database.prototype.deleteResturaunt = function (rest) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result, e_1, collection2, result2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(rest);
                        console.log("deleting " + rest);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, collection.drop()];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        console.log("result = " + result);
                        collection2 = db.collection("Resturaunts");
                        return [4 /*yield*/, collection2.deleteOne({ "name": rest })];
                    case 5:
                        result2 = _a.sent();
                        console.log("result2 = " + result2);
                        return [2 /*return*/, result2];
                }
            });
        });
    };
    Database.prototype.getResturauntItems = function (rest) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(rest);
                        console.log("getting " + rest);
                        return [4 /*yield*/, collection.find().toArray()];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + JSON.stringify(result));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // public async isFound(rest: string,name:string) : Promise<boolean>  {
    // 	console.log("isFound: rest = " + rest)
    // 	let v = await this.get(rest,name)
    // 	console.log("is found result = " + v)
    // 	if (v === null) {
    //     	return false
    // 	} else {
    //     	return true
    // 	}
    // }
    Database.prototype.isFound = function (rest) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("isFound: key = " + rest);
                        return [4 /*yield*/, this.getResturauntItems(rest)];
                    case 1:
                        v = _a.sent();
                        console.log("is found result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
