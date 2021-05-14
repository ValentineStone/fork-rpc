import { EventEmitter } from 'events'

export class Mathr extends EventEmitter {
  constructor(public a = 0, public b = 0) {
    super()
    setInterval(() => this.emit('yey', Math.random()), 1000)
  }
  add(a = this.a, b = this.b) {
    return a + b
  }
  div(a = this.a, b = this.b) {
    return a / b
  }
  nono() {
    throw new Error('NO')
  }
}

if (require.main === module) {
  require('./example.consumer').default()
}