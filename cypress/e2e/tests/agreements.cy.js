import baseUrl from "../base/baseurl";
import login from "../pages/signin";
import signup from "../pages/signUp";
import agreements from "../pages/agreements";
import locators from "../pages/locators/signin_uploc.json";
import agreementLocators from "../pages/locators/agreements.json";

describe("All Agreements testing", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    const urlinfo = new baseUrl();
    const registerstart = new signup();
    const individual = new agreements();

    it("Verify Agreements quickly ", () => {
        urlinfo.visitSignupUrlEn();
        registerstart.signupdata(true);
        individual.doEndtoEndAgreementsQuick();
    });

    it("Verify the customer consent checkbox is workable", () => {
        urlinfo.visitSignupUrlEn();
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
    });

    it("Verify the heading of individual agreement", () => {
        urlinfo.visitSignupUrlEn();
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.verifyHeading(
            agreementLocators.individualConsentHeading,
            "Customer Individual Consent Statement"
        );
    });

    it("Verify the Customer and Date fileds have values", () => {
        urlinfo.visitSignupUrlEn();

        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.fieldsHaveValues(agreementLocators.clientName);
        individual.fieldsHaveValues(agreementLocators.agreementDate);
    });

    it("Verify after refreshing the Individual agreement page it doesn't disappear", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.refreshPage();
        individual.verifyHeading(
            agreementLocators.individualConsentHeading,
            "Customer Individual Consent Statement"
        );
    });

    it("Verify the individual agreement page submission is successfull", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
    });

    it("Verify the global agreement is accessable and scrollable", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.globalAgreement();
    });

    it("Verify alert message of scrolldown is appearing to the bottom of the agreement", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.verifyAlertMessage(
            "Please scroll down to the bottom to accept the agreement"
        );
    });

    it("Verify the heading of Global agreement", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.verifyHeading(
            agreementLocators.individualConsentHeading,
            "Global Agreement"
        );
    });

    it("Verify after refreshing the Global agreement page it doesn't disappear", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        cy.wait(5000);
        individual.refreshPage();
        individual.verifyHeading(
            agreementLocators.individualConsentHeading,
            "Global Agreement"
        );
    });

    it("Verify the global agreement submission", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.globalAgreement();
        individual.clickContinueButton();
    });

    it("Verify the wakalah agreement is accessable and scrollable", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.globalAgreement();
        individual.clickContinueButton();
        individual.wakalahAgreement();
    });

    it("Verify scrolling-down alert message appearing for the wakalah agreement", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.globalAgreement();
        individual.clickContinueButton();
        individual.verifyAlertMessage(
            "Please scroll down to the bottom to accept the agreement"
        );
    });

    it("Verify the heading of Wakalah agreement", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.globalAgreement();
        individual.clickContinueButton();
        individual.verifyHeading(
            agreementLocators.individualConsentHeading,
            "Master Wakalah Agreement"
        );
    });

    it("Verify after refreshing the Wakalah agreement page it doesn't disappear", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.globalAgreement();
        individual.clickContinueButton();
        individual.refreshPage();
        individual.verifyHeading(
            agreementLocators.individualConsentHeading,
            "Master Wakalah Agreement"
        );
    });

    it("Verify the Wakalah agreement submission", () => {
        urlinfo.visitSignupUrlEn();;
        registerstart.signupdata(true);
        individual.customerIndividualConsentCheckbox();
        individual.clickContinueButton();
        individual.globalAgreement();
        individual.clickContinueButton();
        individual.wakalahAgreement();
        individual.clickContinueButton();
    });
});