import type { ChildProcess } from 'child_process'

const promise_guts = <T = any>() => {
  let guts = {} as {
    resolve: (value: unknown) => void
    reject: (reason?: any) => void
    promise: Promise<T>
  }
  guts.promise = new Promise<T>((resolve, reject) => {
    guts.resolve = resolve
    guts.reject = reject
  })
  return guts
}

type GenericFunction = (...args: any) => any

export type AsyncClass<Class> = {
  [key in keyof Class as Class[key] extends GenericFunction ? key : never]:
  Class[key] extends GenericFunction
  ? (...args: Parameters<Class[key]>) => Promise<ReturnType<Class[key]>>
  : never
}

export const rpcConsumer = <Class, Args>(
  child_process: ChildProcess,
  Constructor: { new(...args: Args extends any[] ? Args : never): Class },
  ...args: Args extends any[] ? Args : never
) => {
  const methods = Object.getOwnPropertyNames(Constructor.prototype)
  const callbacks: { [key: string]: ReturnType<typeof promise_guts> } = {}
  const proxy = {} as AsyncClass<Class>
  child_process.send({ method: 'constructor', args })
  let callidCounter = 1
  for (const method of methods) {
    if (method === 'constructor') continue
    proxy[method] = async (...args) => {
      const callid = callidCounter++
      child_process.send({ method, args, callid })
      callbacks[callid] = promise_guts()
      return callbacks[callid].promise
    }
  }
  child_process.on('message', (value: any) => {
    if (value?.callid) {
      const { callid, resolve, reject } = value
      if (reject)
        callbacks[callid].reject(Object.assign(new Error(), reject))
      else
        callbacks[callid].resolve(resolve)
      delete callbacks[callid]
    }
  })
  return proxy
}

export default rpcConsumer