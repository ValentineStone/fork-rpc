import type { ChildProcess } from 'child_process';
declare type GenericFunction = (...args: any) => any;
export declare type AsyncClass<Class> = {
    [key in keyof Class as Class[key] extends GenericFunction ? key : never]: Class[key] extends GenericFunction ? (...args: Parameters<Class[key]>) => Promise<ReturnType<Class[key]>> : never;
};
export declare const rpcConsumer: <Class, Args>(child_process: ChildProcess, Constructor: new (...args: Args extends any[] ? Args : never) => Class, ...args: Args extends any[] ? Args : never) => AsyncClass<Class>;
export default rpcConsumer;
