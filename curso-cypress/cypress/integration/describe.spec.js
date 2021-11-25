// identificando para o VS CODE que vamos trabalhar com cypress
///   <reference types="cypress" /> 


it('A external test...', () => {

})

describe('Shold group tests...', () => {
    describe('Should group more specific tests...', () => {
        it('A specific test...', () => {

        })
    })


    describe('Should group more specific tests...', () => {
        it.only('A specific test 2 ...', () => {

        })
    })

    it('A internal test...', () => {
  
    })
})
