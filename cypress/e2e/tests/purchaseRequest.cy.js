import baseurl from "../base/baseurl";
import dashboard from "../pages/dashboard";
import signin from "../pages/signin";
import purchaseRequest from "../pages/purchaseRequest";

describe("Purchase Request", () => {

    beforeEach(() => {
        cy.wait(20000);
        cy.clearCookies();
        cy.clearLocalStorage();
    })

    const urlOpener = new baseurl();
    const dashboardPage = new dashboard();
    const loginPage = new signin();
    const purchaseRequestPage = new purchaseRequest();


    it("You can not create purchase request for credit approved client if credit manager on staff disabled your deals", () => {
        urlOpener.visitHomePageEn();
        loginPage.loginE2EQuick("562863449", "sms");
        dashboardPage.openTab("Purchases");
        purchaseRequestPage.cannotCreatePurchaseRequest("creditManagerOnStaffDisabled");

    });

    it("You can not create purchase request with Credit Rejected Account", () => {
        urlOpener.visitHomePageEn();
        loginPage.loginE2EQuick("551654782", "sms");
        dashboardPage.openTab("Purchases");
        purchaseRequestPage.cannotCreatePurchaseRequest("Credit Rejected");

    });


    it("Do Purchase request and validate credits amount", () => {
        urlOpener.visitHomePageEn();
        let dealData = {};
        const purchaseRequestData = {
            "qouteDoc": "file_finance_3years.pdf",
            "materials": ["Plumbing", "Cables"],
            "cost": {
                "total": "10,000",
                "time": "3 Months",
                "fullPrice": "12,698"
            },
            "delivery": {
                "location": "ABC",
                "reciver": "423534 34534",
                "phone": "574845121"
            },
            "supplier": {
                "id": "Supplier Sync Verify",
                "name": "ABC Supplier",
                "phone": "574845121",
                "email": "randomQATest@buildnowqatest.env"
            }
        }
        loginPage.loginE2EQuick("582221868", "sms");
        dashboardPage.viewCreditLimitOnDashboard().then((creditsOnDashboard) => {
            cy.log(creditsOnDashboard);
            dashboardPage.openTab("Purchases");
            purchaseRequestPage.createPurchaseRequest(purchaseRequestData);
            purchaseRequestPage.extractParams().then((params) => {
                cy.log(params);
                dealData = params;
                purchaseRequestPage.backToPurchaseRequestList();
                purchaseRequestPage.verifyQuotation(params);
                purchaseRequestPage.pressAllPurchaseRequestButton();
                purchaseRequestPage.verifyListItem(params, purchaseRequestData);
            });
            purchaseRequestPage.purchaseRequestListAvailableCreditLimit(dealData, creditsOnDashboard, purchaseRequestData);
        });


    });

    it("Do Purchase Request E2E", () => {
        const purchaseRequestData = {
            "qouteDoc": "file_finance_3years.pdf",
            "materials": ["Plumbing", "Cables"],
            "cost": {
                "total": "10,000",
                "time": "3 Months",
                "fullPrice": "12,698"
            },
            "delivery": {
                "location": "ABC",
                "reciver": "423534 34534",
                "phone": "574845121"
            },
            "supplier": {
                "id": "Supplier Sync Verify",
                "name": "ABC Supplier",
                "phone": "574845121",
                "email": "randomQATest@buildnowqatest.env"
            }
        }
        urlOpener.visitHomePageEn();
        loginPage.loginE2EQuick("582221868", "sms");
        dashboardPage.openTab("Purchases");
        purchaseRequestPage.createPurchaseRequest(purchaseRequestData);
        purchaseRequestPage.extractParams().then((params) => {
            cy.log(params);
            purchaseRequestPage.backToPurchaseRequestList();
            purchaseRequestPage.verifyQuotation(params);
            purchaseRequestPage.pressAllPurchaseRequestButton();
            purchaseRequestPage.verifyListItem(params, purchaseRequestData);
        });

    });




});