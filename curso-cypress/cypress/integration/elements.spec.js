// identificando para o VS CODE que vamos trabalhar com cypress
///   <reference types="cypress" /> 

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html') //sempre de inicar um teste ele vai vir aqui primeiro pelo before
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado') // contem o texto
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...') //querer o texto exato
    })

    it('Links', () => { //Iniciando teste
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!') //querer o texto exato

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!') //querer o texto exato
    })

    it('TextFields', () => {
        cy.get('#formNome').type('Cypress Test') //type para escrever no campo
        cy.get('#formNome').should('have.value', 'Cypress Test') // pelo value que pegamos os que foi escrito
    
        cy.get('#elementosForm\\:sugestoes') //para reconhecer os : basta utilizar \\
        .type('textarea')
        .should('have.value', 'textarea')
    
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
        .type('???')

        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

         cy.get('#elementosForm\\:sugestoes') //para reconhecer os : basta utilizar \\
         .clear()
         .type('Erro{selectall}acerto', {delay:100 })
         .should('have.value', 'acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
        .click()
        .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length', 2)

    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
        .click()
        .should('be.checked')

        cy.get('[name=formComidaFavorita]').click({multiple:true})
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8)

         cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function () {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        }) 
        
        //validação de combo
    })

    it.only('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada']) //atraves do array conseguimos marcar mais de uma opção
        /* cy.get('[data-testid=dataEsportes]')
            .should('have.value',['natacao', 'Corrida', 'nada']) */

        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid=dataEsportes]')
            .invoke('val').should('eql',['natacao', 'Corrida', 'nada'] )

        //validar opções selecionadas do combo multiplo
    })
})


