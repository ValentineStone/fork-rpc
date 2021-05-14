import { fork } from 'child_process'
import { rpcConsumer } from './consumer'
import { Mathr } from './example.main'

export default async () => {
  const forked = fork('./example.provider')
  const mathr = rpcConsumer(forked, Mathr, 4, 10)
  mathr.on('yey', console.log)
  const res = await mathr.add(NaN, NaN)
  console.log(res)

  await mathr.nono().catch(console.error)
}