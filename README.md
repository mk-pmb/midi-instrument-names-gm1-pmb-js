﻿
<!--#echo json="package.json" key="name" underline="=" -->
midi-instrument-names-gm1-pmb
=============================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
General MIDI Level 1 (GM1) instrument names (patches, families, drums)
<!--/#echo -->


&nbsp;

This library provides a POJO (plain old JavaScript object) representation
of the [GM1 name tables][ptbl-mo] ([archived version][ptbl-wm])
published on the website of
__The MIDI Association__ ([www.midi.org][mo-home]).

  [mo-home]: https://www.midi.org/
  [ptbl-mo]: https://www.midi.org/specifications/item/gm-level-1-sound-set
  [ptbl-wm]: http://web.archive.org/web/20170830132903/https://www.midi.org/specifications/item/gm-level-1-sound-set

Unfortunately I can't share the tables as just plain data files under
a free software license because I couldn't convince The MIDI Association
to give me permission to re-publish modified versions of those tables.
As long as I don't have that permission myself,
obviously I cannot sub-license it to others.

I did however acquire permission to "use" those tables and to "implement"
them in my software, so this program puzzles together non-GM1-compliant
instrument lists from free software projects into a POJO with the
authentic GM1 names.
This way I can avoid sharing actual copies of the original lists,
by sharing an automated DIY kit instead.




Usage
-----

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="9" -->
```javascript
var gm1inst = require('midi-instrument-names-gm1-pmb');
equal.lists(Object.keys(gm1inst),
  [ 'families', 'instruments', 'drumsOffset', 'drums' ]);
equal(gm1inst.families.length, 16);
equal(gm1inst.instruments.length, 128);
equal(gm1inst.drumsOffset, gm1inst.drums.offset);
equal(gm1inst.drums.length, 47);
```
<!--/include-->


<!--#toc stop="scan" -->



Clarifications
--------------

* The GM1 spec defines the names, but it's up to implementers to decide their
  meaning. Examples:
  * #8: Both a clavinet and a clavichord are valid examples of a "Clavi".




Known issues
------------

* needs more/better tests and docs




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
