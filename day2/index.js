const data = require('./data').split(',').map(o => parseInt(o))

const result = 19690720

function computer (ops) {
  let o = 0
  for (o; o < ops.length; o += 4) {
    if (ops[o] === 1) {
      ops[ops[o + 3]] = ops[ops[o + 1]] + ops[ops[o + 2]]
      continue
    }
    if (ops[o] === 2) {
      ops[ops[o + 3]] = ops[ops[o + 1]] * ops[ops[o + 2]]
      continue
    }
    if (ops[o] === 99) {
      break
    }
    console.error('bad op code', ops[o])
    break
  }
  return ops
}

// computer([1,1,1,4,99,5,6,0,99])

function prepAndRun (ops, noun, verb) {
  const prepped = [...ops]
  prepped[1] = noun
  prepped[2] = verb
  const prog = computer(prepped)
  return prog[0]
}

function testVals (prog) {
  const min = 0
  const max = 99
  let noun = min
  let verb = min
  let res = 0
  for (noun; noun <= max; noun++) {
    verb = min
    for (verb; verb <= max; verb++) {
      res = prepAndRun(prog, noun, verb)
      if (res === result) { break }
    }
    if (res === result) {
      console.log('got result', res)
      break
    }
  }
  console.log('noun:', noun, 'verb:', verb)
}  

testVals(data)
