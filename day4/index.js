const min =  256310
const max = 732736

function checkNum (num) {
  const dupes = {}
  let noDecrease = true
  const numstr = `${num}`.split('')
  numstr.forEach((d, i) => {
    const p1 = parseInt(numstr[i - 1]) || null
    const p2 = parseInt(numstr[i - 2]) || null
    d = parseInt(d)
    if (d === p1) {
      if (p1 === p2) {
        if (dupes[d]) { delete dupes[d] }
      } else {
        dupes[d] = true
      }
    }
    if (p1 && d < p1) { noDecrease = false }
  })
  return noDecrease && !!Object.keys(dupes).length
}

const passwords = Array(max - min).fill().map((_v, i) => min + i).filter(v => {
  return checkNum(v)
})

console.log('found', passwords.length, 'passwords')