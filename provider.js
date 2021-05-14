"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcProvider = void 0;
const rpcProvider = (Constructor) => {
    let instance;
    process.on('message', (value) => {
        if (!instance && value.method === 'constructor') {
            instance = new Constructor(...value.args);
        }
        if (value === null || value === void 0 ? void 0 : value.callid) {
            const { callid, method, args } = value;
            try {
                Promise.resolve(instance[method](...args)).then(resolve => {
                    process.send({ callid, resolve });
                }, reject => process.send({ callid, reject }));
            }
            catch (error) {
                process.send({
                    callid, reject: {
                        name: error.name,
                        stack: error.stack,
                        message: error.message
                    }
                });
            }
        }
    });
};
exports.rpcProvider = rpcProvider;
exports.default = exports.rpcProvider;
