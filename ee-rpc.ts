import type { ChildProcess } from 'child_process'

export const eeRpcfy = (proc: ChildProcess | NodeJS.Process, ee: any) => {
  const emitLocal = ee.emit.bind(ee)
  ee.emit = (event, ...args) => proc.send({ event, args });
  (ee as any).emitLocal = emitLocal
  return ee
}