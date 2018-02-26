require('./instantHello'); //requires the instantHello file directly
var goodbye = require('./talk/goodbye');//requires the goodbye file under
//the talk folder.
var talk = require('./talk');//no need to specify the name of the index.js
//file but just the parent folder in which it sits.
var question = require('./talk/question');
talk.intro();//calling methods on the things we require from inside files in folders
talk.hello("Anuradha");

var answer = question.ask("What is the meaning of life");
console.log(answer);
goodbye();
