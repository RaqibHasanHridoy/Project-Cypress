import locators from "../pages/locators/signin_uploc.json";
import { genRandomNumber, genManCrNumber } from "../../support/commands";

class signup {

  dummyDataCreation() {
    const crNumber = genManCrNumber();
    const phone = "5" + Math.floor(10000000 + Math.random() * 90000000).toString();
    return cy.request({
      method: 'GET',
      url: 'https://mockapp.bildnw.quest/',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      const iqama = response.body.nationalId;
      const email = "cyTest-" + Date.now() + "-" + response.body.email;
      return { crNumber, phone, iqama, email };
    });
  }

  signupdata(noApiWaits) {
    return this.dummyDataCreation().then(({ crNumber, phone, iqama, email }) => {
      cy.wait(3000);
      cy.intercept(
        "POST",
        "https://dev.bildnw.quest/v1/core/check_cr_number/"
      ).as("crNumberCheckApi");
      cy.get("._input_text_inner_wrapper__Q9Pkr")
        .get(".placerHolderText")
        .each(($element) => {
          console.log($element.html());
          if ($element.html() === "CR Number") {
            cy.wrap($element)
              .parent()
              .parent()
              .find(locators.undefinedInput)
              .click()
              .type(crNumber);
          }
        });
      cy.wait("@crNumberCheckApi").then((interception) => {
        assert.isTrue(
          interception.response.statusCode === 200,
          "CR Number check API call was successful"
        );
      });
      cy.wait(5000);
      //cy.xpath(locators.phoneNumber).click().type(phone);
      cy.contains(locators.phoneNumber).prev("input").type(phone);
      cy.get("._input_text_inner_wrapper__Q9Pkr")
        .get(".placerHolderText")
        .each(($element) => {
          console.log($element.html());
          if ($element.html() === "Enter email address") {
            cy.wrap($element)
              .parent()
              .parent()
              .find(locators.undefinedInput)
              .click()
              .type(email);
          }
        });
      //cy.get(locators.nationalId).click().type(iqama);
      cy.contains(locators.nationalId).parent().prev("input").type(iqama);
      cy.get(locators.birthDay).click().type("2 {enter}");
      cy.contains(locators.birthMonth).click({ force: true });
      cy.contains(locators.DOBmonth).click();
      cy.contains(locators.birthYear).click({ force: true });
      cy.contains(locators.DOByear).click();
      cy.xpath(locators.checkBox).click();
      cy.contains(locators.registerinfoContinueButton).click();
      cy.xpath(locators.registerOTPPageHeading, { timeout: 100000 }).should(
        "have.text",
        "Verify"
      );
      cy.xpath(locators.otpBox).type("111111");
      cy.xpath(locators.registerResendLabel).invoke('text').then((text) => {
        expect(text.trim()).to.match(/Resend OTP in\s+\d+\s*seconds/);
      });
      if (noApiWaits !== true) {
        cy.wait(180000);
        cy.xpath(locators.registerResendLabel)
          .invoke("text")
          .should("match", /Didn't recieve the OTP yet\?/);
        cy.intercept(
          "POST",
          "https://dev.bildnw.quest/v1/core/auth/otp/create/"
        ).as("resendSignUpOTPApi");
        cy.get(locators.resendRegisterOTP).click();
        cy.wait("@resendSignUpOTPApi").then((interception) => {
          assert.isTrue(
            interception.response.statusCode === 200,
            "Resending Register OTP API call was successful"
          );
        });
        cy.wait(5000);
        cy.xpath(locators.registerResendLabel).invoke('text').then((text) => {
          expect(text.trim()).to.match(/Resend OTP in\s+\d+\s*seconds/);
        });
      }
      cy.xpath(locators.verifyOTP).click();
      cy.url({ timeout: 100000 }).should("include", "/global_agreement");
      return cy.wrap({ crNumber, phone, iqama, email });
    });
  }

  enabledContinueButton() {
    cy.wait(3000);
    const crNumber = genRandomNumber(1000000000, 9999999999);
    const phone =
      "5" + Math.floor(10000000 + Math.random() * 90000000).toString();
    const iqama = Math.floor(1000000000 + Math.random() * 900000000);
    const email = "cyTest-" + Date.now() + "@gmail.com";

    cy.contains(locators.CRNumber).parent().prev("input").type(crNumber);
    cy.contains(locators.phoneNumber).prev("input").type(phone);
    cy.contains(locators.Email).parent().prev("input").type(email);
    cy.contains(locators.nationalId).parent().prev("input").type(iqama);
    cy.get(locators.birthDay).click().type("2 {enter}");
    cy.contains(locators.birthMonth).click({ force: true });
    cy.contains(locators.DOBmonth).click();
    cy.contains(locators.birthYear).click({ force: true });
    cy.contains(locators.DOByear).click();
    cy.xpath(locators.checkBox).click();
    cy.contains(locators.registerinfoContinueButton).should("be.enabled");
    cy.wait(4000);
  }

  otpVerifyPageSignup() {
    cy.wait(3000);
    const crNumber = genRandomNumber(1000000000, 9999999999);
    const phone =
      "5" + Math.floor(10000000 + Math.random() * 90000000).toString();
    const iqama = Math.floor(1000000000 + Math.random() * 900000000);
    const email = "cyTest-" + Date.now() + "@gmail.com";
    cy.contains(locators.CRNumber).parent().prev("input").type(crNumber);
    cy.contains(locators.phoneNumber).prev("input").type(phone);
    cy.contains(locators.Email).parent().prev("input").type(email);
    cy.contains(locators.nationalId).parent().prev("input").type(iqama);
    cy.get(locators.birthDay).click().type("2 {enter}");
    cy.contains(locators.birthMonth).click({ force: true });
    cy.contains(locators.DOBmonth).click();
    cy.contains(locators.birthYear).click({ force: true });
    cy.contains(locators.DOByear).click();
    cy.xpath(locators.checkBox).click();
    cy.contains(locators.registerinfoContinueButton).click();
    cy.wait(4000);
  }

  /*
  * This method are for the error message validation for the same CR Number, Email, Phone Number and ID/Iqama Number"
  */

  dobMismatchWithID() {
    this.dummyDataCreation().then(({ crNumber, phone, iqama, email }) => {
      cy.contains(locators.CRNumber).parent().prev("input").type(crNumber);
      cy.contains(locators.phoneNumber).prev("input").type(phone);
      cy.contains(locators.Email).parent().prev("input").type(email);
      cy.contains(locators.nationalId).parent().prev("input").type(iqama);
      cy.get(locators.birthDay).click().type("1 {enter}");
      cy.contains(locators.birthMonth).click({ force: true });
      cy.contains("January").click();
      cy.contains(locators.birthYear).click({ force: true });
      cy.contains("1906").click();
      cy.xpath(locators.checkBox).click();
      cy.intercept(
        "POST",
        "https://dev.bildnw.quest/v1/core/auth/users/"
      ).as("SignUpApi");
      cy.contains(locators.registerinfoContinueButton).click();
      cy.wait("@SignUpApi").then((interception) => {
        assert.equal(
          interception.response.statusCode, 403,
          "Signup failed with 403 status code"
        )
        assert.equal(
          interception.response.body['detail'], "1906-01-01 does not match the birth date on record for the ID supplied (Note: Date must be in Gregorian)",
          "Error from BE for DOB not matching appears in key and Array index 0"
        )
      });
      cy.wait(5000);
      cy.get("._notify_text_wrapper__81OQm").first().should("have.text", "1906-01-01 does not match the birth date on record for the ID supplied (Note: Date must be in Gregorian)")

    });
  }

  sameCRNumberErrorMessage() {
    this.dummyDataCreation().then(({ phone, iqama, email }) => {
      cy.wait(3000);
      cy.intercept(
        "POST",
        "https://dev.bildnw.quest/v1/core/check_cr_number/"
      ).as("crNumberCheckApi");
      cy.wait(5000);
      const usedCrNumber = "4548785124";
      cy.contains(locators.CRNumber).parent().prev("input").type(usedCrNumber);
      cy.wait("@crNumberCheckApi").then((interception) => {
        assert.equal(
          interception.response.statusCode, 400,
          "Signup failed with 400 status code due to used CR number"
        )
        assert.equal(
          interception.response.body['cr_number'][0], "This CR number is linked to another client",
          "Error from BE for existing Cr number appears in cr_number key and Array index 0"
        )
      });
      cy.get("#errorMessage > span").should("have.text", "This CR number is linked to another client")
      cy.contains(locators.phoneNumber).prev("input").type(phone);
      cy.contains(locators.Email).parent().prev("input").type(email);
      cy.contains(locators.nationalId).parent().prev("input").type(iqama);
      cy.get(locators.birthDay).click().type("2 {enter}");
      cy.contains(locators.birthMonth).click({ force: true });
      cy.contains(locators.DOBmonth).click();
      cy.contains(locators.birthYear).click({ force: true });
      cy.contains(locators.DOByear).click();
      cy.xpath(locators.checkBox).click();
      cy.get('.btn.cta-primary.btn_disabled').should('be.disabled')
    });
  }
  sameEmailErrorMessage() {
    this.dummyDataCreation().then(({ crNumber, phone, iqama }) => {
      cy.wait(3000);
      const staticEmail = "DONOTDELETE@donotdeletethisacc.buildnow"
      cy.wait(5000);
      cy.contains(locators.CRNumber).parent().prev("input").type(crNumber);
      cy.contains(locators.phoneNumber).prev("input").type(phone);
      cy.contains(locators.Email).parent().prev("input").type(staticEmail);
      cy.contains(locators.nationalId).parent().prev("input").type(iqama);
      cy.get(locators.birthDay).click().type("2 {enter}");
      cy.contains(locators.birthMonth).click({ force: true });
      cy.contains(locators.DOBmonth).click();
      cy.contains(locators.birthYear).click({ force: true });
      cy.contains(locators.DOByear).click();
      cy.xpath(locators.checkBox).click();


      cy.intercept(
        "POST",
        "https://dev.bildnw.quest/v1/core/auth/users/"
      ).as("SignUpApi");
      cy.contains(locators.registerinfoContinueButton).click();
      cy.wait("@SignUpApi").then((interception) => {
        assert.equal(
          interception.response.statusCode, 400,
          "Signup failed with 400 status code"
        )
        assert.equal(
          interception.response.body['email'][0], "User with this email is already registered.",
          "Error from BE for existing email appears in Email key and Array index 0"
        )
      });
      cy.wait(5000);
      cy.get("#errorMessage > span").should("have.text", "User with this email is already registered.")
    });
  }
  samePhoneNumberErrorMessage() {
    cy.wait(3000);

    const crNumber = genRandomNumber(1000000000, 9999999999);
    const phone = 597521245;
    const iqama = Math.floor(1000000000 + Math.random() * 900000000);
    const email = "cyTest-" + Date.now() + "@gmail.com";

    cy.wait(5000);
    cy.contains(locators.CRNumber).parent().prev("input").type(crNumber);
    cy.contains(locators.phoneNumber).prev("input").type(phone);
    cy.contains(locators.Email).parent().prev("input").type(email);
    cy.contains(locators.nationalId).parent().prev("input").type(iqama);
    cy.get(locators.birthDay).click().type("2 {enter}");
    cy.contains(locators.birthMonth).click({ force: true });
    cy.contains(locators.DOBmonth).click();
    cy.contains(locators.birthYear).click({ force: true });
    cy.contains(locators.DOByear).click();
    cy.xpath(locators.checkBox).click();
    cy.contains(locators.registerinfoContinueButton).click();
    cy.wait(5000);
    cy.contains(
      "User associated with the provided phone number already exists. Please try to sign in or reach out to us at +966547238142"
    ).should("be.visible");
  }
  sameIDorIqamaNumber() {
    cy.wait(3000);

    const crNumber = genRandomNumber(1000000000, 9999999999);
    const phone =
      "5" + Math.floor(10000000 + Math.random() * 90000000).toString();
    const iqama = 2342390809;
    const email = "cyTest-" + Date.now() + "@gmail.com";

    cy.wait(5000);
    cy.contains(locators.CRNumber).parent().prev("input").type(crNumber);
    cy.contains(locators.phoneNumber).prev("input").type(phone);
    cy.contains(locators.Email).parent().prev("input").type(email);
    cy.contains(locators.nationalId).parent().prev("input").type(iqama);
    cy.get(locators.birthDay).click().type("2 {enter}");
    cy.contains(locators.birthMonth).click({ force: true });
    cy.contains(locators.DOBmonth).click();
    cy.contains(locators.birthYear).click({ force: true });
    cy.contains(locators.DOByear).click();
    cy.xpath(locators.checkBox).click();
    cy.contains(locators.registerinfoContinueButton).click();
    cy.wait(5000);
    cy.contains(
      "Oops! It looks like there's already an account registered with your national ID. Try to Sign in or contact us at +966547238142"
    ).should("be.visible");
  }

  kycRequestOtpServerDown() {
    cy.wait(3000);
    const crNumber = genRandomNumber(1000000000, 9999999999);
    const phone = "5" + Math.floor(10000000 + Math.random() * 90000000).toString();
    const iqama = "1010101010"
    const email = "cyTest-" + Date.now() + "@gmail.com";
    cy.contains(locators.CRNumber).parent().prev("input").type(crNumber);
    cy.contains(locators.phoneNumber).prev("input").type(phone);
    cy.contains(locators.Email).parent().prev("input").type(email);
    cy.contains(locators.nationalId).parent().prev("input").type(iqama);
    cy.get(locators.birthDay).click().type("2 {enter}");
    cy.contains(locators.birthMonth).click({ force: true });
    cy.contains(locators.DOBmonth).click();
    cy.contains(locators.birthYear).click({ force: true });
    cy.contains(locators.DOByear).click();
    cy.xpath(locators.checkBox).click();
    cy.intercept(
      "POST",
      "https://dev.bildnw.quest/v1/core/auth/users/"
    ).as("SignUpApi");
    cy.contains(locators.registerinfoContinueButton).click();
    cy.wait("@SignUpApi").then((interception) => {
      assert.equal(
        interception.response.statusCode, 403,
        "Signup failed with other status code"
      )
      assert.equal(
        interception.response.body['detail'], "There was a problem verifying your data.Try again.",
        "Response body detail is not as expected : " + interception.response.body['detail'].toString()
      )
    });
    cy.wait(5000);
    cy.get("div._notify_text_wrapper__81OQm").should("have.text", "There was a problem verifying your data.Try again.")
  }

  mobileOwnershipVerificationFalse() {

    const crNumber = genRandomNumber(1000000000, 9999999999);
    const phone = 597598765;
    const iqama = Math.floor(1000000000 + Math.random() * 900000000);
    const email = "cyTest-" + Date.now() + "@gmail.com";
    cy.wait(3000);
    cy.contains(locators.CRNumber).parent().prev("input").type(crNumber);
    cy.contains(locators.phoneNumber).prev("input").type(phone);
    cy.contains(locators.Email).parent().prev("input").type(email);
    cy.contains(locators.nationalId).parent().prev("input").type(iqama);
    cy.get(locators.birthDay).click().type("2 {enter}");
    cy.contains(locators.birthMonth).click({ force: true });
    cy.contains(locators.DOBmonth).click();
    cy.contains(locators.birthYear).click({ force: true });
    cy.contains(locators.DOByear).click();
    cy.xpath(locators.checkBox).click();
    cy.intercept(
      "POST",
      "https://dev.bildnw.quest/v1/core/auth/users/"
    ).as("SignUpApi");
    cy.contains(locators.registerinfoContinueButton).click();
    cy.wait("@SignUpApi").then((interception) => {
      assert.equal(
        interception.response.statusCode, 403,
        "Signup failed with 403 "
      )
      assert.equal(
        interception.response.body['detail'], "There's a mismatch in your KYC details. Please contact support.",
        "KYC passed"
      )
    });
    cy.get("div._notify_text_wrapper__81OQm").should("have.text", "There's a mismatch in your KYC details. Please contact support.")
  }


  signinButtonVisibility() {
    cy.wait(3000);

    cy.contains("Sign In").should("be.visible");
    cy.contains("Sign In").should("not.be.disabled").click();
  }

  DOBRangeCheckForInitialYear() {
    cy.wait(3000);
    cy.contains(locators.birthYear).click({ force: true });
    cy.contains(locators.DOBFirstYear).click();
  }
  DOBRangeCheckForLatestYear() {
    cy.wait(3000);
    cy.contains(locators.birthYear).click({ force: true });
    cy.contains(locators.DOBLatestYear).click();
  }

  FAQLanding() {
    cy.wait(3000);

    cy.contains("FAQ")
      .click()
      .should("have.attr", "target", "_blank")
      .and("have.attr", "href", "https://www.buildnow.sa/en#faqs");
  }

  FAQLandingArabic() {
    cy.wait(3000);

    cy.contains("التعليمات")
      .click()
      .should("have.attr", "target", "_blank")
      .and("have.attr", "href", "https://www.buildnow.sa/#faqs");
  }


  urlChangingvalidation(button, eqornot, testUrl) {
    cy.contains(button).click();
    cy.url().should(eqornot, testUrl);
  }

  verifyHeading(heading) {
    cy.contains("Verify").should("exist");
  }
}
export default signup;
