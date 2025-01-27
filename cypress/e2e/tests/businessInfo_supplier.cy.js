import baseurl from '../base/baseurl'
import login from '../pages/signup_supplier'
import { cookieCleanUp } from '../../support/commands'
import signup from '../pages/signup_supplier'
import businessInfoSupplier from '../pages/businessCRInfo_Supplier'

const urlinfo = new baseurl()
const register = new signup()
const supplierData= new businessInfoSupplier()

describe('Supplier Business Info Test', () => {
  beforeEach(() => {
      cookieCleanUp();
      cy.wait(2000);
  });

      it('Testing Error message for Invalid IBAN data, Error Message and 4xx Status Code', () => {
      cookieCleanUp()
      urlinfo.visitSignup_supplier()
      register.clickEnFirst()
      register.signupQuickE2E("111111")
      supplierData.clickEnFirst()
      supplierData.businessFormE2E("SA7810000022170913000209")
      supplierData.errorDetection("Invalid IBAN Number")
    })

    it('Testing Business Info Submission with Valid IBAN data with Successfull 201 Status Code', () => {
      cookieCleanUp()
      urlinfo.visitSignup_supplier()
      register.clickEnFirst()
      register.signupQuickE2E("111111")
      supplierData.clickEnFirst()
      supplierData.businessFormE2E("SA1480000504608010179175")
    })

})

