import locators from '../pages/locators/signin+signup_supplier.json'

class login
{
    loginQuickE2E(phone, otp){
        cy.xpath(locators.phoneNoSignin).type(phone)
        cy.wait(3000);
        cy.contains('button', locators.sendOtpButton).click();
        cy.wait(4000);
        cy.xpath(locators.otpInputBox).type(otp);
        cy.wait(3000);
        cy.contains('button', locators.nextButton).click();  
    }
    
    loginE2E(phone, otp){
        cy.xpath(locators.phoneNoSignin).type(phone)
        cy.wait(40000)
        cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/auth/otp/create/').as('sendOtpRequest')
        cy.contains('button', locators.sendOtpButton).click();
        cy.wait('@sendOtpRequest').its('response.statusCode').should('eq', 200);
        cy.wait(40000);
        cy.xpath(locators.resendOtp).click();
        cy.wait('@sendOtpRequest').its('response.statusCode').should('eq', 200);
        cy.xpath(locators.otpInputBox).type(otp);
        cy.wait(3000)
        cy.contains('button', locators.nextButton).click();  
    }

    errorDetectionPhoneNumber(phone,errorMessagePhone){
        cy.xpath(locators.phoneNoSignin).type(phone)
        cy.wait(3000)
        cy.contains(errorMessagePhone).should('be.visible');
    }

    errorDetectionPhoneNumberUnreg(phone,errorMessagePhoneUnreg){
        cy.xpath(locators.phoneNoSignin).type(phone)
        cy.wait(3000)
        cy.contains('button', locators.sendOtpButton).click();
        cy.contains(errorMessagePhoneUnreg).should('be.visible');
    }

    errorDetectionOtpField(phone,otp,errorMessageOtp){
        cy.xpath(locators.phoneNoSignin).type(phone)
        cy.wait(3000)
        cy.contains('button', locators.sendOtpButton).click();
        cy.xpath(locators.otpInputBox).type(otp);
        cy.wait(3000);
        cy.contains('button', locators.nextButton).click();  
        cy.contains(errorMessageOtp).should('be.visible');
    }

    landingToTroubleshootPage(redirectedURL){
        cy.contains('a',locators.troubleshootOption).click();
        cy.url().should('eq',redirectedURL);
    }

    switchToArabic(){
        cy.contains(locators.enPageSignin).should('be.visible');
        cy.contains(locators.switchToArabicOption).click(); 
        cy.contains(locators.arPageSignin).should('be.visible');
    }

    clickEnFirst(){
        cy.contains(locators.switchToEnglishOption).click()
    }

}
export default login