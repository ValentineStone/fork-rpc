"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eeRpcfy = void 0;
const eeRpcfy = (proc, ee) => {
    const emitLocal = ee.emit.bind(ee);
    ee.emit = (event, ...args) => proc.send({ event, args });
    ee.emitLocal = emitLocal;
    return ee;
};
exports.eeRpcfy = eeRpcfy;
