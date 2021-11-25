// identificando para o VS CODE que vamos trabalhar com cypress
///   <reference types="cypress" />  

describe('Esperas...', () => {

    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html') //sempre de inicar um teste ele vai vir aqui primeiro pelo before
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

     
    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
              .should('exist')
              .type('funciona')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span')
            .should('contain', 'Item 2')    
    })

    it('Uso do find DOM', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span')
            .should('contain', 'Item 2')  
    })

    it('Uso do timeout', () => {
       /*  cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist') */

       /*  cy.get('#buttonListDOM').click()
       /*  cy.wait(5000) */
      /*   cy.get('#lista li span', { timeout: 30000 })
            .should('contain', 'Item 2')   */

            cy.get('#buttonListDOM').click()
            cy.get('#buttonListDOM').click()
                .should('have.length', '1')
            cy.get('#lista li span')    
                .should('have.length', '2')
    })

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })


    // Diferença entre
    // O then aguardou ser finalizado para ser executado o should
    // não aguardou

    it.only('Shold vs Then', () => {
        cy.get('#buttonListDOM').then($el => {
           /*    console.log($el) */
              expect($el).to.have.length(1) 
              cy.get('#buttonList')
        })
    })

})
 