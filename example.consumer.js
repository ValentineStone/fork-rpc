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
const child_process_1 = require("child_process");
const consumer_1 = require("./consumer");
const example_main_1 = require("./example.main");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const forked = child_process_1.fork('./example.provider');
    const mathr = consumer_1.rpcConsumer(forked, example_main_1.Mathr, 4, 10);
    mathr.on('yey', console.log);
    const res = yield mathr.add(NaN, NaN);
    console.log(res);
    yield mathr.nono().catch(console.error);
});
