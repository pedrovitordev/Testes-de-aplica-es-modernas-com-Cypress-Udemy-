// identificando para o VS CODE que vamos trabalhar com cypress
///   <reference types="cypress" /> 



describe('Work with IFrames', () => {
it('Deve preencher campo de texto', () => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')

        })
    })

    it('Deve testar frame diretamente', () => {
        cy.visit('http://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })
})