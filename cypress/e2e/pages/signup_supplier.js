import locators from '../pages/locators/signin+signup_supplier.json'
import { genRandomNumber, genManCrNumber } from "../../support/commands";


class signup
{
  dummyDataCreation() {
    const phone = "5" + Math.floor(10000000 + Math.random() * 90000000).toString(); // Generate a random phone number each time
    
    // Make a fresh request to fetch new data
    return cy.request({
        method: 'GET',
        url: 'https://mockapp.bildnw.quest/',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: false, //disable caching
    }).then((response) => {
        const iqama = response.body.nationalId; // Extract iqama from the response
        return { phone, iqama }; // Return fresh phone and iqama values
    });
} 

    signupE2E(otp) {
        // Call dummyDataCreation to get phone and iqama
        this.dummyDataCreation().then(({ phone, iqama }) => {
            // Fill in the signup form
            cy.xpath(locators.phoneNoSignup).type(phone);
            cy.xpath(locators.iqamaNumber).type(iqama);
            
            // Select the birth date
            cy.xpath(locators.birthDay).click()
            cy.contains(locators.DOBday).click({ force: true });
            cy.xpath(locators.birthMonth).click({ force: true });
            cy.contains(locators.DOBmonth).click();
            cy.xpath(locators.birthYear).click({ force: true });
            cy.contains(locators.DOByear).click();

            // Intercept the API call for user creation
            cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/auth/users/').as('createUser');
            
            // Click the consent checkbox and continue
            cy.contains(locators.consentCheckBox).click();

            cy.contains(locators.continueButton).click();
            // Wait for the user creation API call to complete and assert the response
            cy.wait('@createUser').its('response.statusCode').should('eq', 201);

            //Waiting for the OTP Countdown
            cy.wait(190000)

            // Resend OTP Call for Registration
            cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/auth/otp/create/').as('createOtp');
            cy.contains(locators.resendRegOtp).click()
            // Wait for the user creation API 2nd call to complete and assert the response
            cy.wait('@createOtp').its('response.statusCode').should('eq', 200);
    
            cy.wait(5000);
            // Enter OTP
            cy.xpath(locators.otpInputBox).click().type(otp);

            // Intercept the API call for JWT creation
            cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/auth/jwt/create/').as('createJWT');
            
            // Click the second continue button
            cy.contains('button', locators.continueButton).click();

            // Wait for the JWT creation API call to complete and assert the response
            cy.wait('@createJWT').its('response.statusCode').should('eq', 200);
        });
    }

    signupQuickE2E(otp) {
        // Call dummyDataCreation to get phone and iqama
        this.dummyDataCreation().then(({ phone, iqama }) => {
          cy.xpath(locators.phoneNoSignup).type(phone);
          cy.wait(1000);
          cy.xpath(locators.iqamaNumber).type(iqama);
          cy.wait(1000);
          cy.xpath(locators.birthDay).click()
          cy.contains(locators.DOBday).click({ force: true });
          cy.xpath(locators.birthMonth).click();
          cy.contains(locators.DOBmonth).click({ force: true });
          cy.xpath(locators.birthYear).click();
          cy.contains(locators.DOByear).click({ force: true });
          cy.contains(locators.consentCheckBox).click();
          cy.contains(locators.continueButton).click();
          cy.wait(5000);
          cy.xpath(locators.otpInputBox).click().type(otp);
          cy.wait(1000);
          cy.contains('button', locators.continueButton).click();  
        });
    }

    errorDuringRegisterformSubmision(phone,iqama,errorMessage) {
      cy.xpath(locators.phoneNoSignup).type(phone);
      cy.wait(1000);
      cy.xpath(locators.iqamaNumber).type(iqama);
      cy.wait(1000);
      cy.xpath(locators.birthDay).click()
      cy.contains(locators.DOBday).click({ force: true });
      cy.xpath(locators.birthMonth).click();
      cy.contains(locators.DOBmonth).click({ force: true });
      cy.xpath(locators.birthYear).click();
      cy.contains(locators.DOByear).click({ force: true });
      cy.contains(locators.consentCheckBox).click();
      cy.contains(locators.continueButton).click();
      cy.wait(5000);
      cy.contains(errorMessage).should('be.visible');
    }

    errorDetectionPhoneField(invalidPhone,errorMessagePhone){
        cy.xpath(locators.phoneNoSignup).type(invalidPhone)
        cy.wait(3000)
        cy.contains(errorMessagePhone).should('be.visible');
        cy.wait(1000)
    }

    errorDetectionIqamaField(validPhone,Invalidiqama,errorMessageIqama){
        cy.xpath(locators.phoneNoSignup).type(validPhone)
        cy.wait(3000)
        cy.xpath(locators.iqamaNumber).type(Invalidiqama)
        cy.contains(errorMessageIqama).should('be.visible');
        cy.wait(1000)
    }

    switchToArabic(){
        cy.contains(locators.enPageSignup).should('be.visible');
        cy.contains(locators.switchToArabicOption).click(); 
        cy.contains(locators.arPageSignup).should('be.visible');
    }

    landingLoginPage(redirectedURL){
            cy.contains(locators.loginOption).click();
            cy.url().should('eq',redirectedURL);
    }

    clickEnFirst(){
      cy.contains(locators.switchToEnglishOption).click()
  }
}
export default signup