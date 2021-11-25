// identificando para o VS CODE que vamos trabalhar com cypress
///   <reference types="cypress" /> 

describe('Work with alerts', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html') //sempre de inicar um teste ele vai vir aqui primeiro pelo before
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only('Alert', () => {
        /* cy.get('#alert').click()
        cy.on('window:alert', msg => { //capturando evento do alert
            expect(msg).to.be.equal('Alert Simples')
        }) */
        cy.clickAlert('#alert', 'Alert Simples')
    })

    it('Alert com mock', () => { //stub subtitui o metodo utilizado acima
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then( () => {
            expect(stub.getCall(0) ).to.be.calledWith('Alert Simples')
        })
    })

    
    it('Confirm', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => { //capturando evento do alert
            expect(msg).to.be.equal('Confirm Simples')
        })

        cy.on('window:alert', msg => { //capturando evento do alert
            expect(msg).to.be.equal('Confirmado')
        })   
        cy.get('#confirm').click()
    })

    it('Denny', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => { 
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg => { 
            expect(msg).to.be.equal('Negado')
        })  
        cy.get('#confirm').click() 
    })

    it('Prompt', () => {
       cy.window().then(win => {
           cy.stub(win, 'prompt').returns('42')
       })     

        cy.on('window:confirm', msg => { 
            expect(msg).to.be.equal('Era 42?')
       }) 

        cy.on('window:alert', msg => { 
            expect(msg).to.be.equal(':D')
       })    
        cy.get('#prompt').click()
    })

    it('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub) //quando ocorrer um alert
        cy.get('#formCadastrar').click()
            .then( () => expect (stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Wagner')
        cy.get('#formCadastrar').click()
            .then( () => expect (stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Honorio')
        cy.get('#formCadastrar').click()
            .then( () => expect (stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')

    })
})