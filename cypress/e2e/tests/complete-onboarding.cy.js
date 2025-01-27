import baseurl from "../base/baseurl";
import preapproval from "../pages/preapproval";
import signup from "../pages/signUp";
import Agreements from "../pages/agreements";
import finance from "../pages/finance";
import project from "../pages/project";
import contacts from "../pages/contacts";
import other from "../pages/other";
import onboarding from "../pages/onboarding";

describe("Do User Onboarding", () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });


    const urlOpener = new baseurl();
    const preApproval = new preapproval();
    const agreementPass = new Agreements();
    const signUpPage = new signup();
    const financePage = new finance();
    const projectPage = new project();
    const contactPage = new contacts();
    const otherPage = new other();
    const onboardingPage = new onboarding();

    it("Full User Onboarding", () => {
        urlOpener.visitSignupUrlEn();
        signUpPage.signupdata(true).then((data) => {
            agreementPass.doEndtoEndAgreementsQuick();
            preApproval.doPreapprovalQuick()
            contactPage.doContactQuick();
            financePage.doFinanceQuick();
            projectPage.doProjectDetailQuick();
            otherPage.doOtherQuickly();
            onboardingPage.getOnboardingUrl();
            onboardingPage.verifyOnboarding();
            onboardingPage.backToDashboard();
        });

    });
});