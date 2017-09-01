/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var kmidInst = require('kmid-instruments-kde-svnrev1097325'), drums,
  ins = kmidInst.slice(1), fam = [],
  EX = { families: fam, instruments: ins, drums: drums };

function nth(a, i) { return (i ? (i > 0 ? a[i - 1] : a[a.length + i]) : a); }
function inw(i, w) { return nth(kmidInst[i].match(/\w+/g), w); }


(function (p, f) {
  for (p = 1; p <= 128; p += 8) {
    f = { from: p, upto: p + 7, name: inw(p, -1) };
    fam.push(f);
  }
}());


EX.instruments = (function () {
  var ins = kmidInst.slice(1);
  return ins;
}());












module.exports = EX;
