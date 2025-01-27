import locators from "./locators/agreements.json";
const jwt = require('jsonwebtoken');
class Agreements {

    doEndtoEndAgreementsQuick() {
        //assume signup is already done
        cy.wait(10000);
        cy.contains("English").click({ force: true });
        cy.wait(5000);
        cy.contains(locators.individualConsent).click();
        cy.contains("Continue").click({ force: true });
        cy.wait(2000);
        cy.get(locators.globalAgreementScrollbox).click().scrollTo("bottom");
        cy.contains(locators.globalAgreementCheckbox).click();
        cy.contains("Continue").click({ force: true });
        cy.wait(2000);
        cy.get(locators.wakalahAgreementScrollbox).click().scrollTo("bottom");
        cy.contains(locators.wakalahAgreementCheckbox).click();
        cy.contains("Continue").click({ force: true });
        cy.wait(5000);
        cy.url().should("include", "/pre_approve");
    }

    dateToday() {
        const today = new Date();
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
        return today.toLocaleDateString('en-US', options).replace(/,/g, '');
    }

    getNameFromCookie(cookie) {
        const decoded = jwt.decode(cookie);
        cy.log(decoded)
        return decoded ? decoded.user.name : null;
    }


    customerIndividualConsentCheckbox() {
        cy.wait(10000);
        cy.contains("English").click();
        cy.wait(5000);
        cy.get(locators.consentParagraph).should("have.text", locators.consentAgreementText)
        cy.getCookie("accessToken").then(cookie => {
            if (cookie) {
                cy.get(locators.consentAgreementClientName).invoke('text').then((text) => {
                    cy.log(text);
                    const customerName = text.replace("Customer Name:  ", "");
                    assert.equal(this.getNameFromCookie(cookie.value), customerName, "The name on agreement should match");
                });
            } else {
                cy.log('No access token found');
            }
        });
        cy.contains(this.dateToday())
        cy.contains(locators.individualConsent).click();
    }

    globalAgreement() {
        cy.wait(10000);
        cy.get(locators.globalAgreementScrollbox).click().scrollTo("bottom");
        cy.contains(locators.globalAgreementCheckbox).click();
    }

    wakalahAgreement() {
        cy.wait(10000);
        cy.get(locators.globalAgreementScrollbox).click().scrollTo("bottom");
        cy.contains(locators.wakalahAgreementCheckbox).click();
    }

    verifyAlertMessage(checkAlert) {
        cy.contains(checkAlert).should("be.visible");
    }

    fieldsHaveValues(fieldno1, fieldno2) {
        cy.xpath(fieldno1).should("not.be.empty");
        cy.xpath(fieldno2).should("not.be.empty");
    }

    clickContinueButton() {
        cy.contains("Continue").click();
    }

    verifyHeading(heading, textCheck) {
        cy.xpath(heading).should("have.text", textCheck);
    }

    refreshPage() {
        cy.reload();
        cy.wait(5000);
    }
}

export default Agreements;