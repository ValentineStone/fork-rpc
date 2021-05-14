export class Mathr {
  constructor(public a = 0, public b = 0) { }
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