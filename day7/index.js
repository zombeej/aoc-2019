const data = require('./data').split(',').map(o => parseInt(o))

const data1 = `3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0`.split(',').map(o => parseInt(o))

const data2 = `3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`.split(',').map(o => parseInt(o))

function computer (ops, o = 0, inputs = [], outputs = [], mode = 0, output = null) {
  // console.log(ops, o, inputs, outputs, mode)
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
    // console.log('adding', p1, p2, p1 + p2)
    ops[ops[o + 3]] = p1 + p2
    return computer(ops, o + 4, inputs, outputs, mode)
  }
  else if (op === 2) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    // console.log('multiplying', p1, p2, p1 * p2)
    ops[ops[o + 3]] = p1 * p2
    return computer(ops, o + 4, inputs, outputs, mode)
  }
  else if (op === 3) {
    if (mode === 1 && !inputs.length) {
      // console.log(outputs)
      return [ops, outputs[0][1], o]
    }
    // console.log('inputting', inputs[0], 'at op', o)
    ops[ops[o + 1]] = inputs.splice(0, 1)[0]
    return computer(ops, o + 2, inputs, outputs, mode)
  }
  else if (op === 4) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    // if (mode === 1) {
    //   // console.log('mode 1, returning', p1)
    //   // return [ops, p1, o + 2]
    // } 
    outputs.push([o, p1])
    // console.log(`Instruction ${o}:`, p1, ', mode:', mode)
    return computer(ops, o + 2, inputs, outputs, mode)
  }
  else if (op === 5) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    const next = p1 !== 0 ? p2 : o + 3
    return computer(ops, next, inputs, outputs, mode)
  }
  else if (op === 6) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    const next = p1 === 0 ? p2 : o + 3
    return computer(ops, next, inputs, outputs, mode)
  }
  else if (op === 7) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    ops[ops[o + 3]] = p1 < p2 ? 1 : 0
    return computer(ops, o + 4, inputs, outputs, mode)
  }
  else if (op === 8) {
    const p1 = modes[0] ? ops[o + 1] : ops[ops[o + 1]]
    const p2 = modes[1] ? ops[o + 2] : ops[ops[o + 2]]
    ops[ops[o + 3]] = p1 === p2 ? 1 : 0
    return computer(ops, o + 4, inputs, outputs, mode)
  }
  else if (op === 99) {
    // console.log('Program complete')
    if (mode === 1) {
      outputs = ['HALT', outputs[0][1]]
    }
    return outputs
  } else {
    console.log(`bad op code ${ops[o]}`)
  }
}

// const thrust = computer(data, 0, [4,3,2,1,0])
// console.log(thrust)

function combinedThrust (inputs, ops) {
  const thrust = inputs.reduce((t, c) => {
    // console.log('using', t)
    const res = computer(ops, 0, [c, t[0]])[0][1]
    // console.log('got back', res)
    return [res, t[1] + res]
  }, [0, 0])
  return thrust[0]
}

function swap(list, pos1, pos2){
  const temp = list[pos1];
  list[pos1] = list[pos2];
  list[pos2] = temp;
}

//Implements Heap's permutation algorithm
//https://en.wikipedia.org/wiki/Heap%27s_algorithm
function permute(list) {

  var out = [];
  list = typeof list === 'string' ? list.split('') : list;
  permuteList(list, list.length);

  function permuteList(list, n) {
    var i;

    if (n == 1) {
      out.push(list.join(''));
    } else {
      for (i = 0; i < n - 1; i++) {
        permuteList(list, n - 1);
        if (n % 2) {
          swap(list,0, n - 1);
        } else {
          swap(list,i, n - 1);
        }
      }
      permuteList(list, n - 1);
    }
  }
  return out;
}

// let perms = []
// heapsPermute([4,3,2,1,0], (res) => { perms.push(res) })

const perms = permute([4,3,2,1,0]).map(p => p.split('').map(n => parseInt(n)))
const perms2 = permute([9,8,7,6,5]).map(p => p.split('').map(n => parseInt(n)))

// console.log(perms)

const maxThrust = perms.reduce((a, p) => {
  const thrust = combinedThrust(p, data1)
  // console.log(p, thrust)
  return thrust > a[0] ? [thrust, p] : a
}, [0, []])

console.log('max thrust in serial mode', maxThrust)

function amp (ops, phase, id) {
  let next = -1
  let curVal = null
  let feeds = null
  let outputter = null
  return {
    step (input) {
      if (next === -2) { return 0 }
      if (next === -1) {
        input = [phase, input]
        next = 0
      } else {
        input = [input]
      }
      // console.log(input)
      const output = computer(ops, next, input, [], 1)
      ops = output[0]
      curVal = ops !== 'HALTED' ? output[1] : curVal
      next = output[2] || -2
      // console.log('amp', id, 'output:', curVal, next)
      if (feeds) {
        feeds.step(curVal)
      }
      if (output[0] === 'HALT') {
        // console.log('amp', id, 'halted')
        if (outputter) {
          outputter(curVal)
        }
      }
    },
    setFeeds (device) {
      feeds = device
    },
    setOutput (fnc) {
      outputter = fnc
    }
  }
}

function testArray (phases, ops) {
  const amp1 = new amp([...ops], phases[0], 'A')
  const amp2 = new amp([...ops], phases[1], 'B')
  const amp3 = new amp([...ops], phases[2], 'C')
  const amp4 = new amp([...ops], phases[3], 'D')
  const amp5 = new amp([...ops], phases[4], 'E')

  amp1.setFeeds(amp2)
  amp2.setFeeds(amp3)
  amp3.setFeeds(amp4)
  amp4.setFeeds(amp5)
  amp5.setFeeds(amp1)

  return new Promise(res => {
    amp5.setOutput(res)
    amp1.step(0)
  })
}


console.log('---running in feedback mode---')

const tests = perms2.map(p => testArray(p, data))
Promise.all(tests).then(vals => {
  const max = vals.reduce((m, v) => Math.max(m, v))
  console.log('max thrust in feedback mode:', max)
})

