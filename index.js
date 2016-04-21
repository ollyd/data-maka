require("shelljs/global");
var path = require("path");
var fs = require("fs");
var readlineSync = require('readline-sync');
var obj = require( 'tree-kit' ) ;
var data = require("./data/data-maka.json");

var times = process.argv[2];

var arr = [];

for (i = 0; i < times; i++) {
    var someObject = obj.clone(data);
    
    for (var key of Object.keys(someObject)) {
        console.log(someObject[key]);
    }
}
