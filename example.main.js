"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mathr = void 0;
const events_1 = require("events");
class Mathr extends events_1.EventEmitter {
    constructor(a = 0, b = 0) {
        super();
        this.a = a;
        this.b = b;
        setInterval(() => this.emit('yey', Math.random()), 1000);
    }
    add(a = this.a, b = this.b) {
        return a + b;
    }
    div(a = this.a, b = this.b) {
        return a / b;
    }
    nono() {
        throw new Error('NO');
    }
}
exports.Mathr = Mathr;
if (require.main === module) {
    require('./example.consumer').default();
}
