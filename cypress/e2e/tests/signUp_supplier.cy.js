import baseurl from '../base/baseurl'
import login from '../pages/signup_supplier'
import { cookieCleanUp } from '../../support/commands'
import signup from '../pages/signup_supplier'

const urlinfo = new baseurl()
const register = new signup()

describe('Register Test', () => {
    beforeEach(() => {
      cy.wait(20000);
    });

it('Testing Error message for the Invalid Phone Number', () => {
      cookieCleanUp()
      urlinfo.visitSignup_supplier()
      register.clickEnFirst()
      register.errorDetectionPhoneField("57777777","Please add a valid Saudi Arabia phone number")
  })

it('Testing Error message for the Invalid Iqama Number', () => {
    cookieCleanUp()
    urlinfo.visitSignup_supplier()
    register.clickEnFirst()
    register.errorDetectionIqamaField("577777888","666666666","Please add a valid Iqama number")
})

it('Testing Error message for an Existing Phone Number', () => {
  cookieCleanUp()
  urlinfo.visitSignup_supplier()
  register.clickEnFirst()
  register.errorDuringRegisterformSubmision("555555555","5555559999","User associated with the provided phone number already exists. Please try to sign in or reach out to us at +966547238142")
})

it('Testing Error message for an Existing Iqama Number', () => {
  cookieCleanUp()
  urlinfo.visitSignup_supplier()
  register.clickEnFirst()
  register.errorDuringRegisterformSubmision("555558999","5555555555","Oops! It looks like there's already an account registered with your national ID. Try to Sign in or contact us at +966547238142")
})


it('Testing Arabic Lan Switching', () => {
  cookieCleanUp()
  urlinfo.visitSignup_supplier()
  register.clickEnFirst()
  register.switchToArabic()
})

it('Testing Signin page redirection', () => {
  cookieCleanUp()
  urlinfo.visitSignup_supplier()
  register.clickEnFirst()
  register.landingLoginPage("https://supplierapp.bildnw.com/")
})

it('Testing Quick SignupE2E Flow', () => {
        cookieCleanUp()
        urlinfo.visitSignup_supplier()
        register.clickEnFirst()
        register.signupQuickE2E("111111")
    })
  
it('Testing SignupE2E Flow Icluding the OTP Validation and Resending the OTP', () => {
  cookieCleanUp()
  urlinfo.visitSignup_supplier()
  register.clickEnFirst()
  register.signupE2E("111111")
})







})