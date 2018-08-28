const person = {
    location: {
        city: 'Cary',
        temp: 90
    },
    name: 'Loic Gasser',
    age: 33
}

const { name = 'Anonymous', age } = person

console.log(`My name is ${name} and I am ${age}`)

const { city, temp: temperature } = person.location

console.log(`it is ${temperature} in ${city}`)

const address = ['21 Georges Rd', 'Cary', 'North Carolina', '1214445']

// const [ street, city, state, zip ] = address
const [ , city2, state ] = address

console.log(`This is the ${city2} in ${state}`)