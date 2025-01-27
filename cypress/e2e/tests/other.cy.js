import baseurl from "../base/baseurl";
import preapproval from "../pages/preapproval";
import signup from "../pages/signUp";
import Agreements from "../pages/agreements";
import finance from "../pages/finance";
import project from "../pages/project";
import contacts from "../pages/contacts";
import other from "../pages/other";

describe("Other Page", () => {

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

    it("Fill Other Form", () => {
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
        urlOpener.visitSignupUrlEn();
        signUpPage.signupdata(true).then((data) => {
            agreementPass.doEndtoEndAgreementsQuick();
            preApproval.doPreapproval(
                "Other",
                "850,000",
                "6",
                "10,000",
                true,
                "45",
                "0",
                "2023",
                1,
                data.crNumber + " Corp Limited",
                1
            );

        });
        contactPage.doContactQuick();
        financePage.doFinanceQuick();
        projectPage.doProjectDetailQuick();
        otherPage.doOtherDetails(testData);

    });
});