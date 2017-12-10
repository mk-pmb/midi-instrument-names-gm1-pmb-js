/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var fam, ins, drums,
  kmidInst = require('kmid-instruments-kde-svnrev1097325'),
  payaInst = require('payasan-base-names-pmb/dist/instruments.json'),
  payaDrums = require('payasan-base-names-pmb/dist/drums.json');


function uc(s) { return s.toUpperCase(); }
function lc(s) { return s.toLowerCase(); }
function upDown(s) {
  return s.replace(/(\^|_)([a-z]?)/ig,
    function (m, c, w) { return m && (c === '^' ? uc : lc)(w); });
}


function fla(m, v) {
  v = lc(m && v).replace(/ w\w+$/, '');
  return '(' + v + ')';
}

ins = kmidInst.slice(1).map(function (n) {
  n = n.replace(/^(Sy[a-z]+) (S|Br)/, '$1$2'
    ).replace(/\([A-Z]/, lc
    ).replace(/\+/, ' + '
    ).replace(/(?:\(|\- )([\w\+ \-]+)\)?$/, fla);
  return upDown(n);
});

function nth(a, i) { return (i ? (i > 0 ? a[i - 1] : a[a.length + i]) : a); }
function inw(i, w) { return nth(kmidInst[i].match(/\w+/g), w); }
function uc1(s) { return s.slice(0, 1).toUpperCase() + s.slice(1); }
function map(f) { return function (a) { return a.map(f); }; }
function spj(w) { return w.join(' '); }


function fix(i, rx, rw) {
  fix.list[i] = upDown(fix.list[i].replace(rx, (rw || '')));
}
fix.range = function (i, j, rx, rw) {
  for (0; i <= j; i += 1) { fix(i, rx, rw); }
};


fam = payaInst.groups.map(function (f, i) {
  var n = f[1].replace(/ \w/, uc);
  if (i === 1) { n = n.replace(/s/, 'c'); }
  return { from: f[0] + 1, upto: f[0] + 8, name: n };
});
fam[13].name = 'Ethnic';


fix.list = ins;
fix(3, /(\w+)$/, '_$1 ' + inw(1, -1));
ins[4] = spj([inw(3, 1), inw(3, -1), 1]);
ins[5] = spj([inw(3, 1), inw(3, -1), 2]);
fix(7, /net/);
fix(16, /^\w+/, 'Drawbar');
fix(31, /H/, 'h');
fix(81, / t/, 't');
fix(83, /lead/, 'f');
fix(92, /w/, 'wed');
fix(109, /p/, ' p');
fix(111, /n/);
fix(114, /$/, 's');
fix(115, / B/, 'b');
fix(124, /$/, ' Ring');


drums = payaDrums.order.map(function (n, i) {
  n = n.replace(/_/g, ' ').replace(/\b[a-z]/g, uc
    ).replace(/^([OP]\w+ |)(Hi|Low) ([HM])/, '$1$2-$3'
    ).replace(/\b(Hi)gh( [BCWM])/, '$1$2');
  if (i === 13) { n = n.replace(/ /, '-'); }
  return n;
});
drums.offset = payaDrums.n_min;


















module.exports = { patchSetName: 'GM1', families: fam, instruments: ins,
  drumsOffset: drums.offset, drums: drums };
