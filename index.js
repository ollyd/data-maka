require("shelljs/global");
var path = require("path");
var fs = require("fs");
var readlineSync = require('readline-sync');
var _ = require("lodash");
var data = require("./data/data-maka.json");
var options = require("./options");
var names = require("./data/names");
var emails = require("./data/emails");
var dataSize = 1;
var dataArr = [];

//Load all names once
var firstNames = names.firstNames(); 
var lastNames = names.lastNames(); 

var optsArr = options.argv._;

// If the user didn't specify the number of objects, prompt for that info...
if (!options.argv.objs) {
    var ok = readlineSync.keyInYN('You didn\'t specify your data size. The default is 1 JSON object. Is this ok? ');
    if (!ok) { 
        objs = readlineSync.question('How many JSON objects would you like? ');
        // Check for valid number
        checkNaN(objs);
    }
} else { // delete objs key from options.argv
    dataSize = options.argv.objs;
    delete options.argv.objs;
}

function checkNaN(num) {
    if(isNaN(num)) {
        var objs = readlineSync.question('Error: Please enter a valid number: ');
        checkNaN(objs);
    } else {
        dataSize = num;
    }
}

_.times(dataSize, function() {
    checkArgs();
});

function checkArgs() {
    var dataObj = {};
    if (optsArr.indexOf('name') > -1 && optsArr.indexOf('email') < 0) { 
        getNames(dataObj); 
    } 
    if (optsArr.indexOf('name') < 0 && optsArr.indexOf('email') > -1) { 
        getEmails(dataObj); 
    }
    if (optsArr.indexOf('name') > -1 && optsArr.indexOf('email') > -1) { 
        getNames(dataObj, true); 
    }
};

function getNames(dataObj, emails) {
    dataObj.name = _.sample(firstNames) + ' ' + _.sample(lastNames);
    if(emails){
        var name = dataObj.name.split(' ')[0].toLowerCase();
        getEmails(dataObj, name);        
    }
}

function getEmails(dataObj, name) {
    if (name) {
        dataObj.email = name + _.sample(emails.emailStems());
    } else {
        dataObj.email = _.sample(firstNames).toLowerCase() + _.sample(emails.emailStems());
    }
} 

function emailsAndNames(dataObj) {
}
