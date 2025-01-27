import locators from '../pages/locators/signin_uploc.json'


class login {

    loginE2EQuick(phone, otpType) {
        cy.xpath(locators.phoneNoSignin, { timeout: 10000 }).type(phone) // waits up to 10 seconds
        cy.wait(3000)
        if (otpType === 'email') {
            cy.xpath(locators.emailCheckbox).click({ force: true });
        }
        if (otpType === 'sms') {
            cy.xpath(locators.smsCheckbox).click({ force: true });
        }
        cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/auth/otp/create/').as('signInOTPApi')
        cy.xpath(locators.continueButton).click()
        cy.wait('@signInOTPApi').interceptFormData((formData) => {
            expect(formData["phone"]).to.eq("+966" + phone);
            if (otpType === 'email')
                expect(formData["use_mail"]).to.eq('true');
        }).then((interception) => {
            assert.isTrue(interception.response.statusCode === 200, 'API call was successful')
        })
        cy.xpath(locators.otpBox).type('111111');
        cy.xpath(locators.verifyOTP).click();
        cy.wait(10000)
    }

    loginE2E(otpType, phone = null) {
        let staticPhoneNo = '589898823'
        if (phone !== null) {
            staticPhoneNo = phone
        }
        cy.xpath(locators.phoneNoSignin, { timeout: 10000 }).type(staticPhoneNo) // waits up to 10 seconds
        cy.wait(3000)
        if (otpType === 'sms') {
            cy.xpath(locators.smsCheckbox).click({ force: true });
        }
        if (otpType === 'email') {
            cy.xpath(locators.emailCheckbox).click({ force: true });
        }
        cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/auth/otp/create/').as('signInOTPApi')
        cy.xpath(locators.continueButton).click()
        cy.wait(10000)
        cy.wait('@signInOTPApi').interceptFormData((formData) => {
            expect(formData["phone"]).to.eq("+966" + staticPhoneNo);
            if (otpType === 'email')
                expect(formData["use_mail"]).to.eq('true');
        }).then((interception) => {
            assert.isTrue(interception.response.statusCode === 200, 'API call was successful')
        })
        cy.xpath(locators.otpPageHeading, { timeout: 10000 }).should('have.text', 'Verify OTP')
        cy.get(locators.loginResendLabel).invoke('text').then((text) => {
            expect(text.trim()).to.match(/Resend OTP in\s+\d+\s*seconds/);
        });
        cy.xpath(locators.otpBox).type('111111')
        cy.wait(35000)
        cy.xpath(locators.loginResendExpiryLabel).invoke('text').should('match', /Didn't recieve the OTP yet\?/);
        cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/auth/otp/create/').as('resendSignInOTPApi')
        cy.get(locators.resendLoginOTP).click()
        cy.wait('@resendSignInOTPApi').then((interception) => {
            assert.isTrue(interception.response.statusCode === 200, 'API call was successful')
        })
        cy.wait(3000) // wait for the verify text to disappear
        cy.get(locators.loginResendLabel).invoke('text').then((text) => {
            expect(text.trim()).to.match(/Resend OTP in\s+\d+\s*seconds/);
        });
        cy.xpath(locators.verifyOTP).click()
        cy.url({ timeout: 20000 }).should('include', '/dashboard');
    }

    makeLoginErrorRequest(phone, type, message) {
        cy.xpath(locators.phoneNoSignin, { timeout: 10000 }).type(phone) // waits up to 10 seconds
        cy.wait(3000)
        if (type === 'email') {
            cy.xpath(locators.emailCheckbox).click({ force: true });
        }
        if (type === 'sms') {
            cy.xpath(locators.smsCheckbox).click({ force: true });
        }
        if (phone.length < 9) {
            cy.xpath(locators.continueButton).click()
            cy.get(locators.loginError).invoke('text').should('eq', message);
            return
        } else {
            cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/auth/otp/create/').as('signInOTPApi')
            cy.xpath(locators.continueButton).click()
            cy.wait('@signInOTPApi').interceptFormData((formData) => {
                expect(formData["phone"]).to.eq("+966" + phone);
                if (type === 'email')
                    expect(formData["use_mail"]).to.eq('true');
            }).then((interception) => {
                assert.isTrue(interception.response.statusCode >= 400, 'API call was not successful')
            })
            cy.get(locators.loginError).invoke('text').should('eq', message);
        }
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

    verifyHeading(heading) {
        cy.get(locators.loginPageHeading).invoke('text').then((text) => {
            expect(text.trim()).to.eq(heading);
        });
    }

    rememberMeCheckBox(status) {
        //ByDefault : checked
        switch (status) {
            case "DEFAULT":
                cy.get(locators.rememberMeCheckBox).should('be.checked');
                break;
            case "OFF":
                cy.get(locators.rememberMeCheckBox).uncheck();
                cy.get(locators.rememberMeCheckBox).should('not.be.checked');
                break;
            case "ON":
                cy.get(locators.rememberMeCheckBox).check();
                cy.get(locators.rememberMeCheckBox).should('be.checked');
                break;
            default:
                console.log("Please provide a valid status");
        }
    }

    validateCookieExpiry(cookieName, condition, hours) {
        const currentTime = new Date();
        cy.log("Current Time: " + currentTime);
        currentTime.setHours(currentTime.getHours() + hours);
        const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
        cy.log("Unix Timestamp: " + unixTimestamp);
        cy.getCookie(cookieName).should('have.property', 'expiry');
        cy.getCookie(cookieName).then((cookie) => {
            cy.log("Cookie Expiry: " + cookie.expiry);
            switch (condition) {
                case ">":
                    expect(unixTimestamp).to.be.greaterThan(cookie.expiry);
                    break;
                case "<":
                    expect(unixTimestamp).to.be.lessThan(cookie.expiry);
                    break;
                case "=":
                    expect(cookie.expiry).to.eq(unixTimestamp);
                    break;
                default:
                    console.log("Please provide a valid condition");
            }

        });
    }

}
export default login