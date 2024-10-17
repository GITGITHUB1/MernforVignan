//Operating System Module(Built-in Module)
// const os=require('os');
// console.log(os.userInfo().username);
// console.log('Welcome to the Node Server');

// //Fetching information from other file
const data=require('./user');
// console.log(data.add(3,5));

//File system module

const fs=require('fs');

console.log(fs);
fs.appendFile('greeting.txt','Welcome '+data.name,()=>{
    console.log('data appended successfully');
})
//Lodash Module
const _=require('lodash');
// console.log(_);
const fruits=["apple","kiwi","apple","orange","orange"];
const filteredArray=_.uniq(fruits);
const isArray=_.isString(fruits);
console.log(filteredArray);
console.log(isArray);
