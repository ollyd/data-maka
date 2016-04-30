// var program = require('commander');
var argv = require('minimist')(process.argv.slice(2));

// program
//   .version('1.0')
//   .option('-i, --id', 'Include an id key')
//   .option('-u, --username', 'Include a username key')
//   .option('-f, --firstname', 'Include a first name key')
//   .option('-l, --lastname', 'Include a last name key')
//   .option('-d, --date <integer>', 'The number of days required in the date array')
//   .option('-k, --key [key]', 'Object key', createObject, {})
//   .option('-v, --value [value]', 'Object value', createObject, {})
//   .option('-s, --size <integer>','How many data objects are required')
//   .option('-d, --directory <path>', 'The directory of images to create thumbnails for.')
//   .parse(process.argv);

// if(program.username) { echo('username'); };
// if(program.date) { echo(program.date); };
// if(program.size) { echo(program.size); };



function createObject(val, memo) {
    // var obj = Object.create(val, {

    // })
  echo(val);
  echo(typeof(val));
  // memo.push(val);
  // return memo;
}

// if(!program.directory){
//   echo("Images directory expected");
//   program.help();
// }

module.exports.argv = argv;
// module.exports.size = parseInt(program.size);