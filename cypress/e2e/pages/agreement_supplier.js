import locators from '../pages/locators/agreement_supplier.json'

class partnershipAgreement
{
    agreementE2ESubmission(){
        cy.get(locators.scrollingTriggeer).scrollIntoView()
        cy.scrollTo('bottom')
        cy.intercept('POST', '**/v1/core/suppliers/*/agreement/').as('Agreement')
        cy.contains(locators.agreeButton).click()
        cy.wait('@Agreement').its('response.statusCode').should('eq', 200)
    }

    validate(type, value){
        if (type === 'text') {
            cy.contains(value).should('be.visible')
        } else if (type === 'url') {
            cy.url().should('eq', value)
        }
    }

    checkButtonStatus(status){
        cy.wait(2000)
        if (status === 'inactive') {
            cy.contains('button', locators.agreeButton).should('be.disabled')
        } else if (status === 'active') {
            cy.contains('button', locators.agreeButton).should('not.be.disabled')
        }
    }

    Scroll(){
        cy.get(locators.scrollingTriggeer).scrollIntoView()
        cy.scrollTo('bottom')
        cy.contains(locators.scrollAlertMsg).should('not.exist')
    }

    clickontheContinueButton(){
        cy.contains(locators.agreeButton).click()
    }
}

export default partnershipAgreement