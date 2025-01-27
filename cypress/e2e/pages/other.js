
import locators from './locators/other.json';
class other {






    doOtherQuickly() {
        const addOneDay = () => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('en-GB', options).replace(/(\d{1,2}) (\w+) (\d{4})/, '$1 $2 $3');
            const formattedDateAlt = currentDate.toLocaleDateString('en-GB', options);
            return { formattedDate, formattedDateAlt };
        };

        const testData = {
            "saudiCertificate": "file_saudi_certificate.pdf",
            "saudiExpiry": addOneDay(),
            "gosiCertificate": "file_gosi_certificate.pdf",
            "gosiExpiry": addOneDay(),
            "noOfEmployees": "10",
            "pendingLegalCases": true,
            "companyProfile": "file_company_profile.pdf",
            "companyLicense": "file_company_license.pdf",
            "investmentLicense": "file_investment_license.pdf",

        };
        this.doOtherDetails(testData);


    }

    doOtherDetails(data) {
        cy.wait(10000);
        cy.xpath("//input[@type='file']").eq(0).attachFile(data.saudiCertificate);
        cy.contains(locators.saudiExpiry).parent().click();
        cy.xpath("//button[@type='button' and @aria-label='" + data.saudiExpiry.formattedDate + "']").click();
        cy.get('body').click(800, 500)
        cy.xpath("//input[@type='file']").eq(1).attachFile(data.gosiCertificate);
        cy.contains(locators.gosiExpiry).parent().click();
        cy.xpath("//button[@type='button' and @aria-label='" + data.gosiExpiry.formattedDate + "']").click();
        cy.get('body').click(800, 500)
        cy.get("#input-undefined").type(data.noOfEmployees);
        if (data.pendingLegalCases) {
            cy.xpath(locators.pendingLegalCases[0]).click();
        } else {
            cy.xpath(locators.pendingLegalCases[1]).click();
        }
        cy.xpath("//input[@type='file']").eq(2).attachFile(data.companyProfile);
        cy.xpath("//input[@type='file']").eq(3).attachFile(data.companyLicense);
        cy.xpath("//input[@type='file']").eq(4).attachFile(data.investmentLicense);
        cy.wait(10000); //wait for files to upload
        cy.contains("Save and Continue").click();
        cy.wait(3000);

    }
}

export default other;