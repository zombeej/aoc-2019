const data = require('./data').split(',').map(o => parseInt(o))

// const data = `3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
// 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
// 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`.split(',').map(o => parseInt(o))

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// const sysID = 1

function computer (ops, o = 0) {
  const ck = ops[o]
  let op = ck
  let modes = []
  if (op > 99) {
    const opstr = `${op}`
    op = parseInt(opstr.substr(-2))
    modes = opstr.slice(0, -2).split('').map(v => parseInt(v)).reverse()
  }
  if (op === 1) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    ops[ops[o + 3]] = p1 + p2
    return computer(ops, o + 4)
  }
  else if (op === 2) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    ops[ops[o + 3]] = p1 * p2
    return computer(ops, o + 4)
  }
  else if (op === 3) {
    rl.question('Enter system ID:', sysId => {
      rl.close()
      sysId = parseInt(sysId)
      ops[ops[o + 1]] = sysId
      computer(ops, o + 2)
    })
  }
  else if (op === 4) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    console.log(`Instruction ${o}:`, p1)
    return computer(ops, o + 2)
  }
  else if (op === 5) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    const next = p1 !== 0 ? p2 : o + 3
    return computer(ops, next)
  }
  else if (op === 6) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    const next = p1 === 0 ? p2 : o + 3
    return computer(ops, next)
  }
  else if (op === 7) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    ops[ops[o + 3]] = p1 < p2 ? 1 : 0
    return computer(ops, o + 4)
  }
  else if (op === 8) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    ops[ops[o + 3]] = p1 === p2 ? 1 : 0
    return computer(ops, o + 4)
  }
  else if (op === 99) {
    console.log('Program complete')
  } else {
    console.log(`bad op code ${ops[o]}`)
  }
}

computer(data)
