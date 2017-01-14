"use strict";

var rfc = require('node-rfc');

var abapSystem = {
  user: 'i321482',
  passwd: 'Abcd1234',
  ashost: '10.58.5.229',
  sysnr: '01',
  client: '200'
  //saprouter: '/H/111.22.33.177/S/3299/W/tdkf9d/H/132.139.17.14/H/'
};

// create new client
var client = new rfc.Client(abapSystem);

// echo the client NW RFC lib version
console.log('RFC client lib version: ', client.getVersion());

// and connect
client.connect(function(err) {
  if (err) { // check for login/connection errors
    return console.error('could not connect to server', err);
  }else{
      console.log('connect to server');
  }

  // invoke remote enabled ABAP function module
  client.invoke('STFC_CONNECTION',
    { REQUTEXT: '你好，SAP!' },
    function(err, res) {
      if (err) { // check for errors (e.g. wrong parameters)
        return console.error('Error invoking STFC_CONNECTION:', err);
      }
      
      console.log('Result STFC_CONNECTION:', res);
    });


  // invoke more complex ABAP function module
  var importStruct = {
    RFCFLOAT: 1.23456789,
    RFCCHAR1: 'A',
    RFCCHAR2: 'BC',
    RFCCHAR4: 'DEFG',

    RFCINT1: 1,
    RFCINT2: 2,
    RFCINT4: 345,

    RFCHEX3: 'fgh',

    RFCTIME: '121120',
    RFCDATE: '20140101',

    RFCDATA1: '1DATA1',
    RFCDATA2: 'DATA222'
  };

  var importTable = [importStruct];

  client.invoke('STFC_STRUCTURE',
    { IMPORTSTRUCT: importStruct, RFCTABLE: importTable },
    function(err, res) {
      if (err) {
        return console.error('Error invoking STFC_STRUCTURE:', err);
      }
      console.log('Result STFC_STRUCTURE:', res);
  });

});