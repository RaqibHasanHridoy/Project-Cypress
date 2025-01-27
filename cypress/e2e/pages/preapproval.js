import locators from "./locators/preapproval.json";
class preapproval {


    doPreapprovalQuick() {
        const data = {
            "material": "Other",
            "amount": "850,000",
            "duration": "6",
            "revenue": "10,000",
            "profit": true,
            "profitPercentage": "45",
            "loan": "0",
            "year": "2023",
            "auditReportIndex": 1,
            "name": "CR123456 Corp Limited",
            "howDidYouHearIndex": 1
        }
        this.preApprovalFieldFillingOnly(
            data.material,
            data.amount,
            data.duration,
            data.revenue,
            data.profit,
            data.profitPercentage,
            data.loan,
            data.year,
            data.auditReportIndex,
            data.name,
            data.howDidYouHearIndex
        );
        this.pressPreApprovalContinueButton(true);
    }

    doPreapproval(materialVal, amount, duration, revenue, profit, profitPercentage, loan, year, auditReportIndex, name, howDidYouHearIndex) {
        cy.wait(10000);
        cy.get(locators.material).click();
        cy.contains(materialVal).click();
        cy.wait(1000);
        cy.get('body').click(0, 0);
        cy.contains(locators.credit).get("#input-default").type(amount, { force: true });
        cy.xpath("//input[@type='radio' and @value='" + duration + "']").click({ force: true });
        cy.contains(locators.revenue).get("#input-default").type(revenue, { force: true });
        if (profit) {
            cy.xpath("//*[@class='mantine-kegijc mantine-Radio-label' and text()='Profit']")
                .click();
        } else {
            cy.xpath("//*[@class='mantine-kegijc mantine-Radio-label' and text()='Loss']")
                .click();
        }
        cy.xpath(locators.profitPercentage).type(profitPercentage, { force: true });
        cy.contains(locators.loan).get("#input-default").type(loan, { force: true });
        cy.contains(locators.companyEstablished).click({ force: true });
        cy.get(`button.mantine-UnstyledButton-root.mantine-PickerControl-pickerControl.mantine-YearPicker-pickerControl.mantine-1hcjx8j:contains(${year})`).click();
        cy.get('body').click(0, 0);
        cy.contains(locators.auditReport).parent().find(".mantine-Input-input").click({ force: true });
        cy.contains(locators.auditReportList[auditReportIndex]).click();
        cy.contains(locators.companyName).parent().parent().find("input").type(name, { force: true });
        cy.contains(locators.howDidYouHearAboutUs).parent().parent().find(".mantine-Input-input").click({ force: true });
        cy.contains(locators.howDidYouHearList[howDidYouHearIndex]).click();
        cy.intercept(
            "POST",
            "https://dev.bildnw.quest/v1/etc/referrals/"
        ).as("feedBackForm");
        cy.intercept(
            "PATCH",
            "https://dev.bildnw.quest/v1/core/clients/*/pre_approval"
        ).as("preApproval");
        cy.contains("Continue").click();
        cy.wait("@feedBackForm").then((interception) => {
            assert.equal(interception.response.statusCode, 201, "Feedback form submitted successfully");
        });
        cy.wait("@preApproval").then((interception) => {
            assert.equal(interception.response.statusCode, 200, "Preapproval form submitted successfully");
        });
        cy.contains("Thanks for your submission!", { timeout: 5000 }).should("be.visible");
        cy.contains("Visit portal").click();
        cy.wait(3000);
        cy.url().should("include", "/contacts");
    }

    preApprovalFieldFillingOnly(material, amount, duration, revenue, profit, profitPercentage, loan, year, auditReportIndex, name, howDidYouHearIndex) {
        cy.wait(10000);
        cy.get(locators.material).click();
        cy.contains(material).click();
        cy.get('body').click(0, 0);
        cy.contains(locators.credit).get("#input-default").type(amount, { force: true });
        cy.xpath("//input[@type='radio' and @value='" + duration + "']").click({ force: true });
        cy.contains(locators.revenue).get("#input-default").type(revenue, { force: true });
        if (profit) {
            cy.xpath("//*[@class='mantine-kegijc mantine-Radio-label' and text()='Profit']")
                .click();
        } else {
            cy.xpath("//*[@class='mantine-kegijc mantine-Radio-label' and text()='Loss']")
                .click();
        }
        cy.xpath(locators.profitPercentage).type(profitPercentage, { force: true });
        cy.contains(locators.loan).get("#input-default").type(loan, { force: true });
        cy.contains(locators.companyEstablished).click({ force: true });
        cy.get(`button.mantine-UnstyledButton-root.mantine-PickerControl-pickerControl.mantine-YearPicker-pickerControl.mantine-1hcjx8j:contains(${year})`).click();
        cy.get('body').click(0, 0);
        cy.contains(locators.auditReport).parent().find(".mantine-Input-input").click({ force: true });
        cy.contains(locators.auditReportList[auditReportIndex]).click();
        cy.contains(locators.companyName).parent().parent().find("input").type(name, { force: true });
        cy.contains(locators.howDidYouHearAboutUs).parent().parent().find(".mantine-Input-input").click({ force: true });
        cy.contains(locators.howDidYouHearList[howDidYouHearIndex]).click();
    }

    preapprovalContinueButtonStatus(isClickable) {
        cy.contains("Continue").should(isClickable ? 'be.enabled' : 'not.be.enabled');
    }

    pressPreApprovalContinueButton(withIntercept) {
        if (withIntercept) {
            cy.intercept(
                "POST",
                "https://dev.bildnw.quest/v1/etc/referrals/"
            ).as("feedBackForm");
            cy.intercept(
                "PATCH",
                "https://dev.bildnw.quest/v1/core/clients/*/pre_approval"
            ).as("preApproval");
        }
        cy.contains("Continue").click();
        if (withIntercept) {
            cy.wait("@feedBackForm").then((interception) => {
                assert.equal(interception.response.statusCode, 201, "Feedback form submitted successfully");
            });
            cy.wait("@preApproval").then((interception) => {
                assert.equal(interception.response.statusCode, 200, "Preapproval form submitted successfully");
            });
        }
        cy.wait(3000);
        cy.contains("Thanks for your submission!", { timeout: 5000 }).should("be.visible");
        cy.contains("Visit portal").click();
        cy.wait(3000);
    }
}

export default preapproval