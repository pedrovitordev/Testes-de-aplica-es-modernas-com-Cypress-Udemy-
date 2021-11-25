// identificando para o VS CODE que vamos trabalhar com cypress
///   <reference types="cypress" /> 

describe('Work with alerts', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html') //sempre de inicar um teste ele vai vir aqui primeiro pelo before
    })
    it('Going back to the past', () => {
       /*  cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '08/11/2021') */

        /* cy.clock()
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '31/12/1969')  */

        const dt = new Date(2012, 3, 10, 15, 23 , 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012') 
    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '16363')        
    })
})