/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class Mathr extends EventEmitter {
    a: number;
    b: number;
    constructor(a?: number, b?: number);
    add(a?: number, b?: number): number;
    div(a?: number, b?: number): number;
    nono(): void;
}
