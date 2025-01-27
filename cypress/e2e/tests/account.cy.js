import baseurl from "../base/baseurl";
import preapproval from "../pages/preapproval";
import signup from "../pages/signup";
import signin from "../pages/signin";
import Agreements from "../pages/agreements";
import finance from "../pages/finance";
import project from "../pages/project";
import contacts from "../pages/contacts";
import other from "../pages/other";
import onboarding from "../pages/onboarding";
import mockUtils from "../base/mockUtils";
import dashboard from "../pages/dashboard";
import { account, companies, companysettings } from "../pages/account";
import dateUtils from "../base/dateUtils";
import { mockUnlock, genManCrNumber } from "../../support/commands";

describe('Account', () => {
    beforeEach(() => {
        mockUnlock();
        cy.wait(3000);
    });
    const accountPage = new account();
    const loginPage = new signin();
    const companiesPage = new companies();
    const mockUtility = new mockUtils();
    const urlOpener = new baseurl();
    const preApproval = new preapproval();
    const agreementPass = new Agreements();
    const signUpPage = new signup();
    const financePage = new finance();
    const projectPage = new project();
    const contactPage = new contacts();
    const otherPage = new other();
    const onboardingPage = new onboarding();
    const dashboardPage = new dashboard();
    const companySettingsPage = new companysettings();


    it("Client can view email is not verified", () => {
        urlOpener.visitHomePageEn();
        loginPage.loginE2EQuick("585834966", "sms");
        dashboardPage.viewDashboardMessage("Please verify your email");
        dashboardPage.openTab("My Account");
        accountPage.openTab("Company Settings");

        companySettingsPage.checkVerification("cyTest-unverified@buildnowteserqa.org", false);

    })

    it("Client can view email is verified", () => {
        urlOpener.visitHomePageEn();
        loginPage.loginE2EQuick("566868676", "sms");
        dashboardPage.openTab("My Account");
        accountPage.openTab("Company Settings");

        companySettingsPage.checkVerification("qa-automation-test-123-verified@qabuildnow.sa", true);
    })


    it("Client cannot add new account if not in parties array", () => {
        urlOpener.visitHomePageEn();
        loginPage.loginE2EQuick("558688664", "sms");
        dashboardPage.openTab("My Account");
        accountPage.openTab("Companies")

        companiesPage.addNewCompanyFormFill(genManCrNumber(), "Manufacturer");
        companiesPage.submitButton();
        companiesPage.errorCheck("To register, you must be the owner or an authorized signatory for the company")

    });

    it("create a new client and do invite", () => {
        const crNumberForNewClient = genManCrNumber();
        urlOpener.visitSignupUrlEn();
        dateUtils.currentDateWithDay();
        mockUtility.lockKYC(true);
        mockUtility.lockKYB(true);
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
            dashboardPage.openTab("My Account");
            accountPage.openTab("Companies")
            companiesPage.openSelectedCompany();
            companiesPage.verifyCompanyDetails(data.crNumber, dateUtils.currentDateWithDay(), "Manufacturer", null);
            companiesPage.backToCompanies();
            companiesPage.addNewCompanyFromList(crNumberForNewClient, "Manufacturer");
        });
        mockUtility.resetLocks();
    })

})