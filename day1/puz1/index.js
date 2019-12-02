const data = require('./data').split('\n')

function getFuel (mass) {
  return Math.floor(mass / 3) - 2
}

function getPayloadFuel (masses) {
  return masses.reduce((agg, mass) => {
    const massFuel = getFuel(mass)
    return agg + massFuel + getFuelFuel(massFuel)
  }, 0)
}

function getFuelFuel (mass) {
  console.log(mass, 'more fuel')
  const fuel = getFuel(mass)
  return fuel > 0 
    ? fuel + getFuelFuel(fuel)
    : 0
}

console.log('total fuel needed:', getPayloadFuel(data))