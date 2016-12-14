'use strict';

import Jasmine from 'jasmine';

var jasmine = new Jasmine();
jasmine.loadConfigFile('tests/support/jasmine.json');
jasmine.execute();
