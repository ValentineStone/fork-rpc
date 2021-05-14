"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcProvider = exports.rpcConsumer = void 0;
var consumer_1 = require("./consumer");
Object.defineProperty(exports, "rpcConsumer", { enumerable: true, get: function () { return __importDefault(consumer_1).default; } });
var provider_1 = require("./provider");
Object.defineProperty(exports, "rpcProvider", { enumerable: true, get: function () { return __importDefault(provider_1).default; } });
