"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcConsumer = void 0;
const promise_guts = () => {
    let guts = {};
    guts.promise = new Promise((resolve, reject) => {
        guts.resolve = resolve;
        guts.reject = reject;
    });
    return guts;
};
const rpcConsumer = (child_process, Constructor, ...args) => {
    const methods = Object.getOwnPropertyNames(Constructor.prototype);
    const callbacks = {};
    const proxy = {};
    child_process.send({ method: 'constructor', args });
    let callidCounter = 1;
    for (const method of methods) {
        if (method === 'constructor')
            continue;
        proxy[method] = (...args) => __awaiter(void 0, void 0, void 0, function* () {
            const callid = callidCounter++;
            child_process.send({ method, args, callid });
            callbacks[callid] = promise_guts();
            return callbacks[callid].promise;
        });
    }
    child_process.on('message', (value) => {
        if (value === null || value === void 0 ? void 0 : value.callid) {
            const { callid, resolve, reject } = value;
            if (reject)
                callbacks[callid].reject(Object.assign(new Error(), reject));
            else
                callbacks[callid].resolve(resolve);
            delete callbacks[callid];
        }
    });
    return proxy;
};
exports.rpcConsumer = rpcConsumer;
exports.default = exports.rpcConsumer;
