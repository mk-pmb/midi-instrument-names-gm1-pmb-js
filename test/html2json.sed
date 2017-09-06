#!/bin/sed -nurf
# -*- coding: UTF-8, tab-width: 2 -*-

: skip
  n
  \~#</strong></~b table
b skip

: table
  \~</table>~!{N;b table}
  s~\s*\n\s*~~g
  s~\a|\f|\r|\{|\}|\[|\]|\|~~g
  s~[\t ]+~ ~g
  s~^[^#]+#</strong>~\f~
  s~(</?[a-z]+)( [^<>]*|)~\1~g
  s~</?(table|tbody|p|strong)>~~g
  s~ *<t[rd]> *~~g
  s~ *</td> *~\t~g
  s~\t*</tr>~\n~g
  s~\s+$~~

  s~^\f\t((Fam|Ins|Drum)[a-z]*) [A-Za-z ]*\n~\L\1\E\n~
  /^fam/s~\n([0-9]+)-([0-9]+)\t([^\n]+)~\
    { "from":     \1, "upto":     \2, "name": "\3" },~g
  s~(": ) *([0-9 ]{3},)~\1\2~g
  s~^([a-z]+)(\n([0-9]+)\t)~\1+\3\2~
  /^(ins|drum)/s~\n[0-9]*([0-9])\.?\t([^\n]+)~\n\1"\2",~g
  /^ins/s~\n[16]"~\n    "~g
  /^drum/s~\n[05]"~\n    "~g
  s~\n[0-9]"~ "~g

  #s~^~<<||~;s~$~||>>~;s~\t~\t¦~g;p
  s~^([a-z]+)y\n~\1ie\n~
  s~^(\S+)\n~  "\1s": [\n~
  s~^( *"[a-z]*)\+([0-9]+)([a-z]*)~\1\3Offset": \2,\n\1\3~
  s~,\s*$~ ],~
  s~^ ( "fam)~{\1~
  /^ *"drum/s~,$~\n}~

  p
b skip
