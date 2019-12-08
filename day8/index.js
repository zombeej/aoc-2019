const data = require('./data').split('').map(d => parseInt(d))

const w = 25
const h = 6

const colors = ['◼️', ' ', 2]

// layer size
const ls = w * h

if (data.length % ls) { console.log('Incorrect image ratio') }

const layers = Array(data.length / ls).fill().map((_v, i) => {
  const s = i * ls // Start slicing  here
  return data.slice(s, s + ls)
})

const ckLayer = layers.reduce((a, l, i) => {
  const numZ = l.reduce((da, d) => d === 0 ? da + 1 : da, 0)
  return numZ < a[0] ? [numZ, i] : a
}, [Infinity, 0])

const ckSum = layers[ckLayer[1]].reduce((a, l) => {
  if (l === 1) { return [a[0] + 1, a[1]] }
  if (l === 2) { return [a[0], a[1] + 1] }
  return a
}, [0, 0])

console.log('checksum:', ckSum[0] * ckSum[1])

const img = Array(h).fill().map(r => Array(w).fill(2))

function fillPixels (layer) {
  layer.forEach((l, li) => {
    const c = li % w
    const r = Math.floor(li / w)
    img[r][c] = img[r][c] === 2 ? colors[l] : img[r][c]
  })
}

layers.forEach(l => {
  fillPixels(l)
})

console.log('\nPassword:')
console.log(img.map(r => r.join('')).join('\n'))