import locator from './locators/contacts.json'

class contacts {

    openContactForm() {
        cy.url().should('include', '/contacts');
        cy.contains(locator.addNewContactButton).click();
    }

    goBackToContacts() {
        cy.contains('Back to contacts').click();
    }

    doContactQuick() {
        this.openContactForm();
        const firstName = "John";
        const lastName = "Doe";
        const contactEmail = "random_automation@nznznznznznzn.aannznznnz";
        const contactPhone = "599855555";
        const contactTypeList = ["Procurement Manager", "Finance Manager"];
        this.fillContactForm(firstName, lastName, contactEmail, contactPhone, contactTypeList);
        this.submitContactForm();
    }


    fillContactForm(firstName, lastName, contactEmail, contactPhone, contactTypeList) {

        cy.contains(locator.firstName).parent().parent().find('#input-undefined').type(firstName);
        cy.contains(locator.lastName).parent().parent().find('#input-undefined').type(lastName);
        cy.contains(locator.email).parent().parent().find('#input-undefined').type(contactEmail);
        cy.xpath(locator.phone).type(contactPhone);
        cy.get(locator.contactTypeDropdown).click();
        contactTypeList.forEach(itemSelected => {
            cy.contains(itemSelected).click();
        });
        cy.get('body').click(0, 0);
        cy.contains(locator.grantUserPermissionLabel).should('be.visible');
        cy.xpath(locator.grantUserPermissionCheckbox).click();
    }

    verifyFields() {
        const dummyName = "Automation";
        cy.contains(locator.firstName).parent().parent().find('#input-undefined').type(dummyName);
        cy.contains(locator.lastName).parent().parent().find('#input-undefined').type(dummyName);
        cy.contains(locator.email).parent().parent().find('#input-undefined').type("AAAA@@Z.com");
        cy.contains(locator.errorMessageEmail).should('be.visible');
        cy.xpath(locator.phone).type("978511215");
        cy.contains(locator.errorMessagePhone).should('be.visible');
    }

    submitContactForm() {
        cy.intercept(
            "POST",
            "https://dev.bildnw.quest/v1/etc/client/*/contacts/"
        ).as("contactSubmit");
        cy.contains('Submit').click();
        cy.wait("@contactSubmit").then((interception) => {
            assert.equal(interception.response.statusCode, 201, "Contact form submitted successfully");
        });
    }
}

export default contacts