import signup from "../pages/signUp";
import agreements from "../pages/agreements";
import preApproval from "../pages/preApproval";
import baseUrl from "../base/baseurl";
import contacts from "../pages/contacts";
import signin from "../pages/signin";

describe("Pre Approval", () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    const signUpPage = new signup();
    const agreementPage = new agreements();
    const preApprovalPage = new preApproval();
    const urlOpener = new baseUrl();
    const contactsPage = new contacts();
    const signInPage = new signin();


    it("Should be able to go to contact form without form filling with verification of fields", () => {
        urlOpener.visitHomePageEn();
        signInPage.loginE2EQuick("599855321", "sms");
        contactsPage.openContactForm();
        contactsPage.verifyFields();
        contactsPage.goBackToContacts();
    });


    it("should be able to add a new contact", () => {
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

    });


});