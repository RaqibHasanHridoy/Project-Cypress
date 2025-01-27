import locators from './locators/account.json';

class account {

    openTab(tabName) {
        cy.contains(tabName).click({ force: true });
    }

}

class companysettings {

    checkVerification(email, status) {
        cy.wait(3000);
        cy.xpath("//input[@value='" + email + "']").should('be.visible');
        if (status) {
            cy.contains("Your email is verified").should('be.visible');
        } else {
            cy.contains("Verification email sent to " + email).should('be.visible');
        }
    }

}

class companies {

    openSelectedCompany() {
        cy.contains("Selected").click({ force: true });
    }

    verifyCompanyDetails(crNumber, dateOfIncorporation, type, crName) {
        cy.contains(crNumber).should('be.visible');
        cy.contains(dateOfIncorporation).should('be.visible');
        cy.contains(type).should('be.visible');
    }

    backToCompanies() {
        cy.contains("Back to companies").click();
    }

    addNewCompanyFromList(crNumber, type) {
        cy.contains("Add another Company").click({ force: true });
        cy.xpath(locators.companies.crInputField).type(crNumber);
        cy.xpath(locators.companies.companyType[type][0]).click({ force: true });
        cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/clients/').as('addCompany');
        cy.contains(locators.companies.verifyToAddButton).click({ force: true });
        cy.wait('@addCompany').interceptFormData((formData) => {
            expect(formData.cr_number).to.eq(crNumber);
            expect(formData.client_type).to.eq(locators.companies.companyType[type][1]);
        }).then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
        });
        cy.wait(10000)
        cy.url().should('include', '/global_agreement');
    }


    addNewCompanyFormFill(crNumber, type) {
        cy.contains("Add another Company").click({ force: true });
        cy.xpath(locators.companies.crInputField).type(crNumber);
        cy.xpath(locators.companies.companyType[type][0]).click({ force: true });
        cy.wait(1000);
    }

    submitButton() {
        cy.contains(locators.companies.verifyToAddButton).click({ force: true });
    }

    errorCheck(msg) {
        cy.contains(msg).should('be.visible', { timeout: 10000 });
    }



}


export { account, companies, companysettings };
