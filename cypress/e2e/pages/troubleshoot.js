import locators from "./locators/troubleshoot.json";
import baseUrl from "../base/baseurl";
import signUp from "./signup";

class troubleshoot {

    changePhoneNumber(data) {
        let newNumber = data["phone"];
        newNumber = newNumber.slice(0, -2) + "00";


        const oldNumber = data["phone"];
        cy.log("Old number", oldNumber);
        cy.log("New number", newNumber);
        cy.xpath("//input[@data-placeholder='Phone number']").each((element, index) => {
            if (index === 0) {
                cy.wrap(element).type(oldNumber, { force: true });
            } else if (index === 1) {
                cy.wrap(element).type(newNumber, { force: true });
            }
        });
        cy.intercept(
            "POST",
            "https://dev.bildnw.quest/v1/core/users/change_phone/"
        ).as("changePhoneOTPrequest");
        cy.contains("Continue").click();
        cy.wait("@changePhoneOTPrequest").interceptFormData((formData) => {
            expect(formData["old_phone"]).to.eq("+966" + oldNumber);
            expect(formData["new_phone"]).to.eq("+966" + newNumber);
            expect(formData["change_phone"]).to.eq("true");
        }).then((interception) => {
            assert.equal(interception.response.statusCode, 200, "Change Phone API call successful");
        });
        cy.get("h1").should("have.text", "Verify OTP" || "تحقق من الرمز المؤقت");
        cy.wait(185000);
        cy.intercept(
            "POST",
            "https://dev.bildnw.quest/v1/core/users/change_phone/"
        ).as("changePhoneOTPrequest");
        cy.contains("Resend").click();
        cy.wait("@changePhoneOTPrequest").then((interception) => {
            assert.equal(interception.response.statusCode, 200, "Resend OTP API call successful");
            assert.equal(interception.response.body["detail"], "The OTP has been sent to your phone", "OTP sent successfully");
            assert.equal(interception.response.body["number"], "+966" + newNumber, "OTP sent successfully to new number");
        });
        cy.wait(5000)
        cy.get(locators.enterOTPbox).type("111111");
        cy.intercept(
            "POST",
            "https://dev.bildnw.quest/v1/core/auth/jwt/create/"
        ).as("verifyOTPChangePhoneRequest");
        cy.contains('button', 'Verify').click();
        cy.wait("@verifyOTPChangePhoneRequest").interceptFormData(formData => {
            expect(formData["otp"]).to.eq("111111");
            expect(formData["phone"]).to.eq("+966" + oldNumber);
            expect(formData["change_phone"]).to.eq("true");
        }).then((interception) => {
            assert.equal(interception.response.statusCode, 200, "Verify OTP API call successful");
        });
        cy.get(".AddPhone_loaderHeading__dZCGK").should("have.text", "The new phone number has been added to your data");
        return newNumber;
    }

    pressBackButton(lang) {
        if (lang === "ar") {
            cy.contains("رجوع");
        } else {
            cy.contains("Back").click();
        }
    }

    changeLang(lang) {
        if (lang === "en") {
            cy.contains("English").click();
        } else {
            cy.contains("عربى").click();
        }
    }


    verifyUrl(lang) {
        cy.wait(3000);
        cy.url().should("include", locators.url[lang]);
    }

    verifyOptions(lang) {
        locators.verifyOptions[lang].forEach((element) => {
            cy.contains(element).should("be.visible");
        });
    }

    openTroubleShootOption(index, lang) {
        cy.wait(3000);
        cy.contains(locators.verifyOptions[lang][index]).click();
        cy.wait(3000);
        const selectedLocator = locators.verifyTextBody[lang][index];
        cy.contains(selectedLocator["heading"]).should("be.visible");
        selectedLocator["text"].forEach((element) => {
            cy.contains(element).should("be.visible");
        });

    }

    linkChecks(button) {
        const { redirectTo, text, tag, type } = locators.clickableLinks[button];
        if (type === 'tab') {
            cy.get(`${tag}:contains(${text})`).first().invoke('attr', 'href').then((href) => {
                cy.expect(href).to.eq(redirectTo);
            })
        } else {
            cy.get(`${tag}:contains(${text})`).first().click({ timeout: 10000 });
            cy.wait(7000)
            cy.url().should('include', redirectTo);
        }
    }
}

export default troubleshoot