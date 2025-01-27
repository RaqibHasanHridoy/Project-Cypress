import locator from './locators/dashboard.json'
class dashboard {

    viewDashboardMessage(message) {
        cy.contains(message).should('be.visible', { timeout: 5000 })
    }

    viewApprovedDashboard(data) {
        cy.wait(3000);
        cy.url().should('include', '/dashboard')
        cy.contains(locator.creditUsed).should('be.visible')
        cy.contains(locator.creditUsed).parent().find('.false').then((item) => {
            expect(item.text()).to.eq(data.creditUsed + " SAR")
        })
        cy.contains(locator.totalCredit).should('be.visible')
        cy.contains(locator.totalCredit).parent().find('.false').then((item) => {
            expect(item.text()).to.eq(data.totalCredit + " SAR")
        })
        cy.contains(data.deal.dealName).should('be.visible')
        cy.contains(data.deal.dealName).parent().parent().find(".undefined").contains(data.deal.status).should('be.visible')
        cy.contains(data.upcomingPaymentCount + " " + locator.upcomingPaymentPartialLabel).should('be.visible')
        cy.contains(data.deal.dealName).click()
        cy.wait(2000)
        cy.url().should('include', 'pr_request_detail?id=' + data.deal.id)
        cy.contains(data.deal.dealAmount).should('be.visible')
        cy.contains(data.deal.customerPays).should('be.visible')
        cy.contains(data.deal.time).should('be.visible')
        cy.contains(data.deal.project).should('be.visible')
        cy.contains(data.deal.wantedMaterial).should('be.visible')
        cy.contains(data.deal.supplierName).should('be.visible')
        cy.contains(data.deal.msg).should('be.visible')
        cy.xpath(locator.viewQuotationButton).should("have.attr", "href").and("include", data.deal.qouteDocument)

    }

    viewCreditLimitOnDashboard() {
        return new Cypress.Promise((resolve) => {
            let creditDetails = {};
            cy.get('[class*="_dashboard-purchase-overview_left"]').find(".false").eq(0).invoke('text').then((text) => {
                creditDetails.creditUsed = text;
                cy.get('[class*="_dashboard-purchase-overview_rightTotalCredit"]').eq(0).invoke('text').then((text2) => {
                    creditDetails.totalCredit = text2;
                    cy.log(creditDetails);
                    resolve(creditDetails);
                });
            });
        });
    }


    openTab(tabName) {
        cy.contains(tabName).click({ force: true })
    }

    viewDetails() {
        cy.contains(locator.viewDetails).click({ force: true })
    }
}




export default dashboard