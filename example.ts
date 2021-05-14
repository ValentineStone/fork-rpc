import { fork } from 'child_process'
import { rpcConsumer } from './consumer'
import { Mathr } from './example.class'

(async () => {
  const forked = fork(__filename.replace('.js', '.fork.js'))
  const mathr = rpcConsumer(forked, Mathr, 4, 10)
  const res = await mathr.add(NaN, NaN)
  console.log(res)
  
  await mathr.nono().catch(console.error)
})()