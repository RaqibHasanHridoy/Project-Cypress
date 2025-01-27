import baseurl from '../base/baseurl'
import login from '../pages/signup_supplier'
import { cookieCleanUp } from '../../support/commands'
import signup from '../pages/signup_supplier'
import businessInfoSupplier from '../pages/businessCRInfo_Supplier'
import partnershipAgreement from '../pages/agreement_supplier'


const urlinfo = new baseurl()
const register = new signup()
const supplierData= new businessInfoSupplier()
const agreement= new partnershipAgreement()

describe('Supplier Business Info Test', () => {
  beforeEach(() => {
      cookieCleanUp();
      cy.wait(2000);
  });

   it('Testing agreement page title', () => {
      cookieCleanUp()
      urlinfo.visitSignup_supplier()
      register.clickEnFirst()
      register.signupQuickE2E("111111")
      supplierData.clickEnFirst()
      supplierData.businessFormE2E("SA1480000504608010179175")
      agreement.validate('text', 'Partnership Agreement')
    })

    it('Testing partner status', () => {
        cookieCleanUp()
        urlinfo.visitSignup_supplier()
        register.clickEnFirst()
        register.signupQuickE2E("111111")
        supplierData.clickEnFirst()
        supplierData.businessFormE2E("SA1480000504608010179175")
        agreement.validate('text', 'In Review')
      })

    it('Testing agreement page URL', () => {
        cookieCleanUp()
        urlinfo.visitSignup_supplier()
        register.clickEnFirst()
        register.signupQuickE2E("111111")
        supplierData.clickEnFirst()
        supplierData.businessFormE2E("SA1480000504608010179175")
        agreement.validate('url', 'https://supplierapp.bildnw.com/register')
      })

    it('Testing agreement page scrolling alert message', () => {
        cookieCleanUp()
        urlinfo.visitSignup_supplier()
        register.clickEnFirst()
        register.signupQuickE2E("111111")
        supplierData.clickEnFirst()
        supplierData.businessFormE2E("SA1480000504608010179175")
        agreement.validate('text', 'Please scroll down to the bottom to accept the agreement')
      }) 

      it('Testing agreement page button is Inactive', () => {
        cookieCleanUp()
        urlinfo.visitSignup_supplier()
        register.clickEnFirst()
        register.signupQuickE2E("111111")
        supplierData.clickEnFirst()
        supplierData.businessFormE2E("SA1480000504608010179175")
        agreement.checkButtonStatus('inactive')
      })


      it('Testing agreement page scroll to bottom and the button is activated and the alert message should disappear', () => {
        cookieCleanUp()
        urlinfo.visitSignup_supplier()
        register.clickEnFirst()
        register.signupQuickE2E("111111")
        supplierData.clickEnFirst()
        supplierData.businessFormE2E("SA1480000504608010179175")
        agreement.Scroll()
        agreement.checkButtonStatus('active')
      }) 

      it('Testing agreement page submission with API call and Status code', () => {
        cookieCleanUp()
        urlinfo.visitSignup_supplier()
        register.clickEnFirst()
        register.signupQuickE2E("111111")
        supplierData.clickEnFirst()
        supplierData.businessFormE2E("SA1480000504608010179175")
        agreement.agreementE2ESubmission()
      })

})

