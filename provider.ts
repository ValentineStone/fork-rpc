import { EventEmitter } from 'events'
import { eeRpcfy } from './ee-rpc'

export const rpcProvider = <Class, Args>(
  Constructor: { new(...args: Args extends any[] ? Args : never): Class }
) => {
  let instance: Class
  process.on('message', (value: any) => {
    if (!instance && value.method === 'constructor') {
      instance = new Constructor(...value.args)
      if (instance instanceof EventEmitter)
        eeRpcfy(process, instance)
    }
    if (value?.callid) {
      const { callid, method, args } = value
      try {
        Promise.resolve(instance[method](...args)).then(
          resolve => {
            process.send({ callid, resolve })
          },
          reject => process.send({ callid, reject })
        )
      } catch (error) {
        process.send({
          callid, reject: {
            name: error.name,
            stack: error.stack,
            message: error.message
          }
        })
      }
    }
    if (value?.event && instance instanceof EventEmitter) {
      (instance as any).emitLocal(value.event, ...value.args)
    }
  })
}

export default rpcProvider