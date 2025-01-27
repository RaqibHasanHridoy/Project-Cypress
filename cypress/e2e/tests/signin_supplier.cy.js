import baseurl from '../base/baseurl'
import signin from '../pages/signin_supplier'
import { cookieCleanUp} from '../../support/commands'

const urlinfo = new baseurl()
const login = new signin()

describe('Supplier Login Test', () => {
    beforeEach(() => {
        cookieCleanUp();
        cy.wait(2000);
    });

    it('Testing Arabic Language Switching', () => {
        cookieCleanUp()
        urlinfo.visitSignin_supplier()
        login.clickEnFirst()  
        login.switchToArabic()
    })

    it('Testing Redirection to the Troubleshoot Page', () => {
        cookieCleanUp()
        urlinfo.visitSignin_supplier()
        login.clickEnFirst()  
        login.landingToTroubleshootPage("https://supplierapp.bildnw.com/troubleshoot")
    })

    it('Testing error message for Wrong OTP', () => {
        cookieCleanUp()
        urlinfo.visitSignin_supplier()
        login.clickEnFirst()  
        login.errorDetectionOtpField("585834966","222222","Incorrect OTP entered. Please try again.")
    })

    it('Testing error message for Invalid Phone Number', () => {
        cookieCleanUp() 
        urlinfo.visitSignin_supplier()
        login.clickEnFirst() 
        login.errorDetectionPhoneNumber("59077777","Please add a valid Saudi Arabia phone number")
    })

    it('Testing error message for Unregistered Phone Number', () => {
        cookieCleanUp() 
        urlinfo.visitSignin_supplier()
        login.clickEnFirst() 
        login.errorDetectionPhoneNumberUnreg("590777779","Phone number is not registered. Please Sign up first")
    })

    it('Testing quick login with all valid info.', () => {
        cookieCleanUp()
        urlinfo.visitSignin_supplier()
        login.clickEnFirst()  
        login.loginQuickE2E("585834966","111111")
    })

    it('Testing login E2E with all valid info.', () => {
        cookieCleanUp()
        urlinfo.visitSignin_supplier()
        login.clickEnFirst()  
        login.loginE2E("585834966","111111")
    })


  })