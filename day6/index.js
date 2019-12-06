const data = require('./data').split('\n').map(o => o.split(')'))

// const data =  `COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// K)YOU
// I)SAN`.split('\n').map(o => o.split(')'))

const YOU =  data.find(o => o[1] === 'YOU')
const SAN = data.find(o => o[1] === 'SAN')
console.log(YOU, SAN)

function follow (start, list) {
  const next = list.find(o => o[1] === start)
  if (!next) { return 0 }
  return 1 + follow(next[0], list)
}

function checksum (orbs) {
  return orbs.reduce((t, o) => {
    return t + 1 + follow(o[0], orbs)
  }, 0)
}

function trace (start, list, route = []) {
  const next = list.find(o => o[1] === start[0])
  return next ? trace(next, list, [...route, next]) : route
}

function getRoute(start, end, data) {
  const trace1 = trace(start, data)
  const trace2 = trace(end, data)
  let conv = null
  let i = 0
  for (i; i < trace1.length; i++) {
    conv = trace2.findIndex(o => o[1] === trace1[i][1])
    if (conv > -1) { break }
  }
  return i + conv
}

console.log(getRoute(YOU, SAN, data))

// console.log(checksum(data))

