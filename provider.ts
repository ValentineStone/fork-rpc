export const rpcProvider = <Class, Args>(
  Constructor: { new(...args: Args extends any[] ? Args : never): Class }
) => {
  let instance: Class
  process.on('message', (value: any) => {
    if (!instance && value.method === 'constructor') {
      instance = new Constructor(...value.args)
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
  })
}

export default rpcProvider