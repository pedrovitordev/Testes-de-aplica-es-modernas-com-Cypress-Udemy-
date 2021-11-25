it('nada agora', function () { }) 

//ARROW FUNCTION BASICA
/* const soma = (a, b) => {
   return a + b
} */

//SIMPLIFICADA
const soma = (a,b) => a + b

console.log(soma(1,4))

it('a function test...' , function() {
    console.log('Function', this)
})

it('an arrow test...' , () => {
    console.log('Arrow', this)
})