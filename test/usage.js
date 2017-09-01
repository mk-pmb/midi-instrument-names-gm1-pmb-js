/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('usnam-pmb');

var cons = [], say = console.log.bind(console), equal = require('equal-pmb'),
  nonFree = require('./nonfree.gm1ss.json');

cons.log = cons.push;


(function readmeDemo() {
  //#u
  var gm1inst = require('midi-instrument-names-gm1-pmb');
  equal.lists(Object.keys(gm1inst), [ 'families', 'instruments', 'drums' ]);
  //#r

  Object.keys(gm1inst).forEach(function (k) {
    equal.lists(gm1inst[k], nonFree[k]);
    say(k + ' ok');
  });
}(cons));









console.log("+OK tests passed.");   //= "+OK tests passed."
