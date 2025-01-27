import baseurl from "../base/baseurl";
import preapproval from "../pages/preapproval";
import signup from "../pages/signUp";
import Agreements from "../pages/agreements";
import finance from "../pages/finance";
import project from "../pages/project";
import contacts from "../pages/contacts";

describe("Project", () => {

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

    it("Do Project E2E", () => {
        const projectData = {
            "materials": [
                "Other",
                "Steel",
                "Cables",
                "Plumbing",
            ],
            "estimatedProfitMargin": "10",
            "paymentDays": "30",
            "paymentDelay": 10,
            "advancePayment": true,
            "lcSecured": true,
            "typeOfProject": "Medical",
            "howManyProjects": "1",
            "publicEntity": false,
            "top3Clients": {
                "1": {
                    "phone": "555555555",
                    "companyName": "ABC Limited",
                    "name": "John Doe",
                },
                "2": {
                    "phone": "555555557",
                    "companyName": "DEF Limited",
                    "name": "Jane Doe",
                },
                "3": {
                    "phone": "555555559",
                    "companyName": "GHI Limited",
                    "name": "John Doe",
                },
            },
            "contactConsent": true,
            "projectContractFile": "file_contract.pdf",
            "projectInvoiceFile": "file_invoice.pdf"
        }
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
        projectPage.doProjectDetail(projectData);

    });

});