import baseurl from '../base/baseurl'
import login from '../pages/signin'
import { cookieCleanUp } from '../../support/commands'

describe('Login Test', () => {
  beforeEach(() => {
    cy.wait(20000);
  });
  const urlinfo = new baseurl()
  const loginStub = new login()



  it('testing OTP send via Email', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    loginStub.loginE2E("email")
  })

  it('User cannot login with un-verified email address', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    loginStub.makeLoginErrorRequest("597521245", "email", "Email is not verified, please login via phone number")
  })

  it('User cannot login with short number ( < 9 digits )', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    loginStub.makeLoginErrorRequest("4178944", "email", "Enter valid phone number")
  })

  it('User cannot login with number that is not registered', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    loginStub.makeLoginErrorRequest("577318525", "email", "Phone number is not registered. Please Sign up first")
  })

  it('checking Remember Me: (ON) checkbox cookie functionality : 14 day expiry', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    cy.wait(5000)
    loginStub.rememberMeCheckBox("ON")
    loginStub.loginE2E()
    loginStub.validateCookieExpiry("accessToken", "<", 300)  //checks if 
  })

  it('checking Remember Me: (OFF) checkbox cookie functionality : 30 mins expiry', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    cy.wait(5000)
    loginStub.rememberMeCheckBox("OFF")
    loginStub.loginE2E()
    loginStub.validateCookieExpiry("accessToken", ">", 1)
  })


  it('Testing Login works 2E2 with OTP', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    loginStub.loginE2E()
  })

  it('testing Login Page redirection to FAQ page', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    loginStub.linkChecks("FAQ")
  })


  it('testing Login Page redirection to FAQ page - Arabic ', () => {
    cookieCleanUp()
    urlinfo.visitHomePageAr()
    loginStub.linkChecks("FAQ-ar")
  })

  it('testing Login Page redirection to its arabic and english version', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    loginStub.linkChecks("Arabic")
    loginStub.verifyHeading("تسجيل دخول")
    loginStub.linkChecks("English")
    loginStub.verifyHeading("Sign In")
  })


  it('testing OTP send via SMS', () => {
    cookieCleanUp()
    urlinfo.visitHomePageEn()
    loginStub.loginE2E()
  })


})
