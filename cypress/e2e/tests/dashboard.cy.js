import baseurl from '../base/baseurl'
import login from '../pages/signin'
import dashboard from '../pages/dashboard'
import locator from '../pages/locators/dashboard.json'

describe('Dashboard', () => {
    beforeEach(() => {
        cy.wait(20000);
    });
    const urlOpener = new baseurl()
    const loginPage = new login()
    const dashboardPage = new dashboard()


    it("Login to a Credit Approved Client and View Dashboard + Purchase Request", () => {
        const testData = locator.testData[1]
        urlOpener.visitHomePageEn()
        loginPage.loginE2EQuick(testData.user)
        dashboardPage.viewApprovedDashboard(testData)
    })

})