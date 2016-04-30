require("shelljs/global");
var path = require("path");
var fs = require("fs");
var readlineSync = require('readline-sync');
var _ = require("lodash");
var moment = require("moment");
var data = require("./data/data-maka.json");
var options = require("./options");
var names = require("./data/names");
var emails = require("./data/emails");
var dataSize = 1,
    dataArr = [],
    days = 30;

//Load all names once
var firstNames = names.firstNames(); 
var lastNames = names.lastNames(); 

var optsArr = options.argv._;
var keyVals = options.argv;

// If the user didn't specify the number of objects, prompt for that info...
if (!options.argv.objs) {
    var ok = readlineSync.keyInYN('You didn\'t specify how many JSON objects you require. The default is 1 JSON object. Is this ok? ');
    if (!ok) { 
        objs = readlineSync.question('How many JSON objects would you like? ');
        checkNaN(objs);
    }
} else { 
    dataSize = options.argv.objs;
}

function checkNaN(num) {
    if(isNaN(num)) {
        var objs = readlineSync.question('Error: Please enter a valid number: ');
        checkNaN(objs);
    } else {
        dataSize = num;
    }
}


if (_.has(keyVals, 'date')) { 
    addDates();
}

function addDates() {
    var obj = {};
    days = _.get(keyVals, 'date')

    var endDate = moment();
    var startDate = moment().subtract(30, "days"); 

    var dates = [];

    var currDate = startDate.clone().startOf('day');
    var lastDate = endDate.clone().startOf('day');

    while(currDate.add('days', 1).diff(lastDate) < 0) {
        dates.push(currDate.clone().format("DD-MM-YYYY")); // add user formatting
    }
    obj.date = dates;
    echo(obj);
}

_.times(dataSize, function(i) {
    var dataObj = {};
    dataObj.id = i+1;
    checkArgsArr(dataObj);
});


function checkArgsArr(dataObj) {
    if (optsArr.indexOf('name') > -1 && optsArr.indexOf('email') < 0) { 
        getNames(dataObj); 
    } 
    if (optsArr.indexOf('name') < 0 && optsArr.indexOf('email') > -1) { 
        getEmails(dataObj); 
    }
    if (optsArr.indexOf('name') > -1 && optsArr.indexOf('email') > -1) { 
        getNames(dataObj, true); 
    }
    if (optsArr.indexOf('date')) {

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
echo(dataObj);
dataArr.push(dataObj);
echo(dataArr);
} 

function emailsAndNames(dataObj) {
}
