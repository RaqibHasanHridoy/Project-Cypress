import locators from './locators/finance.json';
import 'cypress-file-upload';

class finance {
    verifyFinancePage() {
        cy.url().should('include', '/finance');
    }

    doFinanceQuick() {
        cy.wait(3000);
        cy.contains(locators.lineOfCredit).next().type("850,000");
        cy.xpath(locators.promisoryNoteToggle["No"]).eq(0).click({ force: true });
        cy.xpath(locators.promisoryNoteToggle["No"]).eq(1).click({ force: true });
        cy.xpath("//input[@type='file']").eq(0).attachFile(this.fileFinder("file_finance_3years.pdf"));
        cy.xpath("//input[@type='file']").eq(1).attachFile(this.fileFinder("file_vat_report_2years.pdf"));
        cy.contains(locators.vatNumber).parent().parent().find('input').type("54512121212");
        cy.xpath("//input[@type='file']").eq(2).attachFile(this.fileFinder("file_bank_statement_1year.pdf"));
        cy.wait(10000); //wait for files to upload
        cy.get('button').contains('Continue').click();

    }


    fillFinanceForm(lineOfCredit, businessPromiseryNote, personalPromiseryNote, financeStatement, vatReport, vatNumber, bankStatement) {
        cy.contains(locators.lineOfCredit).next().type(lineOfCredit);
        cy.xpath(locators.promisoryNoteToggle[businessPromiseryNote]).eq(0).click({ force: true });
        cy.xpath(locators.promisoryNoteToggle[personalPromiseryNote]).eq(1).click({ force: true });
        cy.xpath("//input[@type='file']").eq(0).attachFile(this.fileFinder(financeStatement));
        cy.xpath("//input[@type='file']").eq(1).attachFile(this.fileFinder(vatReport));
        cy.contains(locators.vatNumber).parent().parent().find('input').type(vatNumber);
        cy.xpath("//input[@type='file']").eq(2).attachFile(this.fileFinder(bankStatement));
        cy.wait(7000); //wait for files to upload

    }

    clickFinanceContinueButton() {
        cy.intercept('PATCH',
            'https://dev.bildnw.quest/v1/core/clients/*/financial_info/'
        ).as('financeInfoUpdateAPI');
        cy.get('button').contains('Continue').click();
        cy.wait('@financeInfoUpdateAPI').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    clickFinanceButton(data) {
        cy.intercept('PATCH',
            'https://dev.bildnw.quest/v1/core/clients/*/financial_info/'
        ).as('financeInfoUpdateAPI');
        cy.get('button').contains('Continue').click();
        cy.wait('@financeInfoUpdateAPI').interceptFormData((formData) => {
            expect(formData["active_credit_lines_amount"]).to.eq(data["lineOfCredit"]);
            expect(formData["has_business_promissory_notes"]).to.eq(data["businessPromiseryNote"] === "Yes" ? "true" : "false", "Business Promissory Note Matching");
            expect(formData["has_personal_promissory_notes"]).to.eq(data["personalPromiseryNote"] === "Yes" ? "true" : "false", "Personal Promissory Note Matching");
            expect(formData["vat_number"]).to.eq(data["vatNumber"]);
        }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.contains("Submitted successfully").should('be.visible');
    }

    fileFinder(fileName) {
        return `${fileName}`;
    }

}

export default finance;