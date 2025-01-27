import signup from "../pages/signUp";
import agreements from "../pages/agreements";
import preApproval from "../pages/preApproval";
import baseUrl from "../base/baseurl";
import contacts from "../pages/contacts";
import signin from "../pages/signin";
import finance from "../pages/finance";

describe("Finance", () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    const signUpPage = new signup();
    const agreementPage = new agreements();
    const preApprovalPage = new preApproval();
    const urlOpener = new baseUrl();
    const contactsPage = new contacts();
    const financePage = new finance();



    it("Fill Finance Form", () => {
        const data = {
            "lineOfCredit": "500000",
            "businessPromiseryNote": "No",
            "personalPromiseryNote": "Yes",
            "vatNumber": "54512121212",
            "financeFile": "file_finance_3years.pdf",
            "vatReportFile": "file_vat_report_2years.pdf",
            "bankStatementFile": "file_bank_statement_1year.pdf"
        }
        const firstDigit = Math.floor(Math.random() * 9) + 1;
        const remainingDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
        const phoneNumber = `${firstDigit}${remainingDigits}`;
        urlOpener.visitSignupUrlEn();
        signUpPage.signupdata(true);
        agreementPage.doEndtoEndAgreementsQuick();
        preApprovalPage.preApprovalFieldFillingOnly("Other",
            "850,000",
            "6",
            "10,000",
            true,
            "45",
            "0",
            "2023",
            1,
            "Random Preapproval" + " Corp Limited",
            1);
        preApprovalPage.pressPreApprovalContinueButton(false);

        contactsPage.openContactForm();
        contactsPage.fillContactForm(
            "Automation",
            "Test",
            "contacts" + "cyTest-" + Date.now() + "@qaautomtionbuildnow.com",
            "5" + phoneNumber,
            ["Procurement Manager", "Finance Manager"]
        )
        contactsPage.submitContactForm();
        cy.wait(5000)
        financePage.verifyFinancePage();
        financePage.fillFinanceForm(
            data["lineOfCredit"],
            data["businessPromiseryNote"],
            data["personalPromiseryNote"],
            data["financeFile"],
            data["vatReportFile"],
            data["vatNumber"],
            data["bankStatementFile"],
        )
        financePage.clickFinanceButton(data);

    });


});