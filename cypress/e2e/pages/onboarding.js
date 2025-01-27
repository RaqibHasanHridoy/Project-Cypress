class onboarding {
    getOnboardingUrl() {
        cy.wait(5000);
        cy.url().then((url) => {
            assert.equal(url, "https://client.bildnw.com/en/profile/completed", "Onboarding Profile completed");
        });
    }

    verifyOnboarding() {
        cy.wait(5000);
        cy.contains("You’ve completed your profile successfully!").should("be.visible");
        cy.contains("Let us review and get back to you shortly!").should("be.visible");
        cy.contains("Awaiting Approval").should("be.visible");
        cy.contains("Your profile is under review").should("be.visible");
    }

    backToDashboard() {
        cy.contains("Back to dashboard").click();
        cy.wait(5000);
        cy.url().then((url) => {
            assert.equal(url, "https://client.bildnw.com/en/dashboard", "Back to Dashboard");
        });
    }

}

export default onboarding;