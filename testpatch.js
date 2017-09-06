
/*
var jsonpatch=require('fast-json-patch');
var myobj = { firstName:"Albert", contactDetails: { phoneNumbers: [ ] } };
var patches = [
   {op:"replace", path:"/firstName", value:"Joachim" },
   {op:"add", path:"/lastName", value:"Wester" },
   {op:"add", path:"/contactDetails/phoneNumbers/0", value:{ number:"555-123" }  }
   ];
   console.log('before'+JSON.stringify(  myobj));
myobj=jsonpatch.applyPatch( myobj, patches ).newDocument;
console.log('after'+JSON.stringify(  myobj) );
*/


 import jsonpatch from 'fast-json-patch'
  let myobj = { firstName:"Albert", contactDetails: { phoneNumbers: [ ] } };
  let patches = [
     {op:"replace", path:"/firstName", value:"Joachim" },
     {op:"add", path:"/lastName", value:"Wester" },
     {op:"add", path:"/contactDetails/phoneNumbers/0", value:{ number:"555-123" }  }
     ];
 console.log('before'+JSON.stringify(  myobj));
  myobj=jsonpatch.applyPatch( myobj, patches ).newDocument;
  console.log('after'+JSON.stringify(  myobj) );
