import baseUrl from "../base/baseurl";
import signup from "../pages/signUp";
import locators from "../pages/locators/signin_uploc.json";

describe("Registration testing", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  const urlinfo = new baseUrl();
  const registerstart = new signup();


  it("Register user E2E", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.signupdata();
  });

  it("Registration should fail if KYC server is down", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.kycRequestOtpServerDown();
  });


  it("Registration should fail for Mobile Ownership verification = False", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.mobileOwnershipVerificationFalse();
  });

  it("Clicking on the Arabic button the URL changing to the right one ", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.urlChangingvalidation(
      "عربى",
      "eq",
      "https://client.bildnw.com/register"
    );
  });


  it("Register user E2E", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.signupdata();
  });

  it("Continue button is enabled after filling all the required info", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.enabledContinueButton();
  });

  it("User is in the OTP verification page successfull", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.otpVerifyPageSignup();
    registerstart.verifyHeading();
  });


  it("Thorw error message for the same ID/Iqama Number", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.sameIDorIqamaNumber();
  });

  it("Signin button is visible in Register page", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.signinButtonVisibility();
  });

  it("DOB Year starting from 1905", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.DOBRangeCheckForInitialYear();
  });

  it("DOB Year lasting to 2010", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.DOBRangeCheckForLatestYear();
  });


  it("FAQ is working", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.FAQLanding();
  });

  it("FAQ is working in Arabic", () => {
    urlinfo.visitSignupUrlAr();
    registerstart.FAQLandingArabic();
  });


  it("Throw DOB doesnt match with ID error message", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.dobMismatchWithID();
  })

  it("Throw error message for the existing CR number", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.sameCRNumberErrorMessage();
  });

  it("Throw error message for the same email", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.sameEmailErrorMessage();
  });


  it("Throw error message for the same phone number", () => {
    urlinfo.visitSignupUrlEn();
    registerstart.samePhoneNumberErrorMessage();
  });

});
