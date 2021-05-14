"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mathr = void 0;
class Mathr {
    constructor(a = 0, b = 0) {
        this.a = a;
        this.b = b;
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
