import baseUrl from "../base/baseurl";
import troubleshoot from "../pages/troubleshoot";
import signUp from "../pages/signup";
import signin from "../pages/signin";
import mockUtils from "../base/mockUtils";

describe("Troubleshoot page", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    const urlinfo = new baseUrl();
    const troubleshootPage = new troubleshoot();
    const mockServer = new mockUtils();
    const signInPage = new signin();

    it("Change phone number end to end", () => {
        mockServer.resetLocks();
        mockServer.lockKYC(true);
        const signUpPage = new signUp();
        urlinfo.visitSignupUrlEn();
        signUpPage.signupdata(true).then((data) => {
            cy.clearCookies();
            cy.clearLocalStorage();
            urlinfo.changePhoneNumberUrl(true);
            cy.wait(3000);
            const changedNumber = troubleshootPage.changePhoneNumber(data);
            cy.wait(3000);
            cy.clearCookies();
            cy.clearLocalStorage();
            urlinfo.visitHomePageEn();
            signInPage.loginE2E("sms", changedNumber);
        });
        mockServer.lockKYC(false);
    });



    it("Troubleshoot page [Change my phone number] leads to change number page with FAQ checks - Both Language ", () => {
        urlinfo.visitTroubleshootUrl(true);
        troubleshootPage.openTroubleShootOption(0, "en");
        troubleshootPage.linkChecks("FAQ");
        troubleshootPage.pressBackButton("en");
        cy.wait(3000);
        troubleshootPage.changeLang("ar");
        troubleshootPage.openTroubleShootOption(0, "ar");
        troubleshootPage.linkChecks("FAQ-ar");
    });

    it("Check FAQ links on main page - en", () => {
        urlinfo.visitTroubleshootUrl(true);
        troubleshootPage.linkChecks("FAQ");
    });

    it("Check FAQ links on main page - ar", () => {
        urlinfo.visitTroubleshootUrl(true, "ar");
        troubleshootPage.linkChecks("FAQ-ar");
    });

    it("Troubleshoot page [Did bit recieve OTP] leads to OTP trouble shoot page with FAQ checks - Both Language ", () => {
        urlinfo.visitTroubleshootUrl(true);
        troubleshootPage.openTroubleShootOption(1, "en");
        troubleshootPage.linkChecks("FAQ");
        troubleshootPage.pressBackButton("en");
        troubleshootPage.changeLang("ar");
        troubleshootPage.openTroubleShootOption(1, "ar");
        troubleshootPage.linkChecks("FAQ-ar");
    });

    it("Troubleshoot page [Login Button not working] leads to Login trouble shoot page with FAQ checks - Both Language ", () => {
        urlinfo.visitTroubleshootUrl(true);
        troubleshootPage.openTroubleShootOption(2, "en");
        troubleshootPage.linkChecks("FAQ");
        troubleshootPage.pressBackButton("en");
        troubleshootPage.changeLang("ar");
        troubleshootPage.openTroubleShootOption(2, "ar");
        troubleshootPage.linkChecks("FAQ-ar");
    });

    it("Troubleshoot page should open from signin page - en", () => {
        urlinfo.visitTroubleshootUrl(false);
        troubleshootPage.verifyUrl("en");
    });

    it("Troubleshoot page should open from signin page - ar", () => {
        urlinfo.visitTroubleshootUrl(true);
        troubleshootPage.verifyUrl("ar");
    });

    it("Troubleshoot page should have 3 options - en ", () => {
        urlinfo.visitTroubleshootUrl(true);
        troubleshootPage.verifyUrl("en");
        troubleshootPage.verifyOptions("en");
    });

    it("Troubleshoot page should have 3 options - ar ", () => {
        urlinfo.visitTroubleshootUrl(true, "ar");
        troubleshootPage.verifyUrl("ar");
        troubleshootPage.verifyOptions("ar");
    });

});