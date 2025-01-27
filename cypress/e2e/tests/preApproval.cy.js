import baseurl from "../base/baseurl";
import preapproval from "../pages/preapproval";
import signup from "../pages/signUp";
import Agreements from "../pages/agreements";


describe("Pre Approval", () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });


    const urlOpener = new baseurl();
    const preApproval = new preapproval();
    const agreementPass = new Agreements();
    const signUpPage = new signup();

    const materials = ["Other", "Cables", "Steel", "Concerete"]


    it("Pre Approval E2E", () => {
        urlOpener.visitSignupUrlEn();
        signUpPage.signupdata(true).then((data) => {
            agreementPass.doEndtoEndAgreementsQuick();
            preApproval.doPreapproval(
                materials[0],
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
    });

});