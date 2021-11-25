// identificando para o VS CODE que vamos trabalhar com cypress
///   <reference types="cypress" /> 



describe('Work with Popup', () => {
it('Deve testar popup diretamente', () => {
        cy.visit('http://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
        expect(msg).to.be.equal('Click OK!')
    })
})

    it.only('Deve verificar se o popup foi invocado', () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
           cy.stub(win, 'open').as('withOpen') 
        })
        cy.get('#buttonPopUp').click()
        cy.get('@withOpen').should('be.called')
    })

    describe.only('With links...', () => {
        beforeEach(() => {
            cy.visit('http://wcaquino.me/cypress/componentes.html')
        })

        it('Check popup url', () => {
           cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'http://wcaquino.me/cypress/frame.html')
        })

        it('Should acces popup dinamically', () => {
            cy.contains('Popup').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
        })
         it('Should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#tfield').type('funciona')
         })   
    })
})

