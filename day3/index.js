const data = require('./data').split('\n').map(l => l.split(','))

// const data = `R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83`.split('\n').map(l => l.split(','))

// console.log(data)

const len = Math.max(data[0].length, data[1].length)

let i = 0

let a = [[0, 0]]
let b = [[0, 0]]

function getMovement (m) {
  if (!m) { return [0, 0] }
  const dir  = m[0]
  const mag = parseInt(m.slice(1))
  switch (dir) {
    case 'U':
      return [1, mag]
    case 'D':
      return [1, 0 - mag]
    case 'L':
      return [0, 0 - mag]
    case 'R':
      return [0, mag]
  }
}

for (i; i < len; i++) {
  const i1 = getMovement(data[0][i])
  const i2 = getMovement(data[1][i])

  const lasta = a[a.length - 1]
  const nexta = [...lasta]
  nexta[i1[0]] = nexta[i1[0]] + i1[1]
  a.push(nexta)

  const lastb = b[b.length - 1]
  const nextb = [...lastb]
  nextb[i2[0]] = nextb[i2[0]] + i2[1]
  b.push(nextb)
}

a = a.slice(1)
b = b.slice(1)
const intersections = []
a.forEach((av, ai) => {
  const av2 = a[ai + 1]
  if (!av2) { return }
  b.forEach((bv, i) => {
    const bv2 = b[i + 1]
    if (!bv2) { return }
    const axmax = Math.max(av[0], av2[0])
    const aymax = Math.max(av[1], av2[1])
    const axmin = Math.min(av[0], av2[0])
    const aymin = Math.min(av[1], av2[1])

    const bxmax = Math.max(bv[0], bv2[0])
    const bymax = Math.max(bv[1], bv2[1])
    const bxmin = Math.min(bv[0], bv2[0])
    const bymin = Math.min(bv[1], bv2[1])

    if (bv[0] <= axmax && bv[0] >= axmin) {
      if (av[1] <= bymax && av[1] >= bymin) {
        const point = [bv[0], av[1], {
          d: Math.abs(bv[0]) + Math.abs(av[1]),
          ai: ai, 
          bi: i,
          ad: Math.abs(bv[0] - av[0]),
          bd: Math.abs(av[1] - bv[1])
        }]
        intersections.push(point)
      }
    }
    if (av[0] <= bxmax && av[0] >= bxmin) {
      if (bv[1] <= aymax && bv[1] >= aymin) {
        const point = [av[0], bv[1], {
          d: Math.abs(av[0]) + Math.abs(bv[1]),
          ai: ai,
          bi: i,
          ad: Math.abs(av[0] - bv[0]),
          bd: Math.abs(bv[1] - av[1])
        }]
        intersections.push(point)
      }
    }
  })
})

const nearest = intersections.reduce((agg, val) => {
  const dist = Math.abs(val[0]) + Math.abs(val[1])
  return dist < agg[0] ? [dist, val[0], val[1]] : agg
}, [Infinity, 0, 0])

function getTotalSteps (point) {
  let total1 = 0
  let ai = 0
  for (ai; ai <= point[2].ai; ai++) {
    const amt = Math.abs(getMovement(data[0][ai])[1])
    total1 = total1 + amt
  }
  total1 = total1 + Math.abs(point[2].ad)
  let bi = 0
  for (bi; bi <= point[2].bi; bi++) {
    const amt = Math.abs(getMovement(data[1][bi])[1])
    total1 = total1 + amt
  }
  return total1 + Math.abs(point[2].bd)
}

const distances = intersections.map(i => {
  return getTotalSteps(i)
}).sort((a, b) => a - b)

console.log('nearest:', nearest)
console.log('shortest:', distances[0])
