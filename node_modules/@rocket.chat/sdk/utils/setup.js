"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** On require, runs the test utils setup method */
var testing_1 = require("./testing");
// import { silence } from '../lib/log'
global.fetch = require('node-fetch');
// silence()
testing_1.setup().catch(function (e) { return console.error(e); });
//# sourceMappingURL=setup.js.map