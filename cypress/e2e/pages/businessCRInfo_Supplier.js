import locators from './locators/businessInfo_supplier.json'

class businessInfoSupplier 
{
    createDummyData() {
        const unNumber = "7" + Math.floor(100000000 + Math.random() * 900000000).toString();
        const crNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        
        const generateCompanyName = () => {
            const randomDigit = Math.floor(Math.random() * 100000000); 
            return `Cypress${randomDigit} Ltd`;
        };
    
        const generateArabicCompanyName = () => {
            const arabicWords = ["الابتكار", "التقنية", "الأنظمة", "الحلول", "المستقبل", "التطوير", "الشبكات", "البرمجيات", "الشركات", "المؤسسات"];
            const randomWord = arabicWords[Math.floor(Math.random() * arabicWords.length)];
            const randomDigit = Math.floor(Math.random() * 100000000); 
            return `${randomWord}${randomDigit} Ltd`;
        };
    
        return {
            unNumber,
            crNumber,
            generateCompanyName,
            generateArabicCompanyName
        };
    }

        businessFormE2E(iban) {
            const { crNumber, unNumber, generateCompanyName, generateArabicCompanyName } = this.createDummyData();
            
            cy.xpath(locators.crNumberInput).click().type(crNumber);
            cy.xpath(locators.ibanInput).type(iban);
            cy.xpath(locators.unInput).click().type(unNumber);
            cy.xpath(locators.companyNameEN).type(generateCompanyName());
            cy.xpath(locators.companyNameAR).type(generateArabicCompanyName());
            cy.xpath(locators.nidUploader).invoke('show').attachFile('file_contract.pdf', { subjectType: 'drag-n-drop' })
            
            cy.intercept('POST', 'https://dev.bildnw.quest/v1/core/suppliers/').as('CreateSupplierApi');
            
            cy.contains(locators.continueButton).click()

            cy.wait('@CreateSupplierApi').then((interception) => {
                const validIban = 'SA1480000504608010179175';
        
                if (iban === validIban) {
                    // Validate success response
                    expect(interception.response.statusCode).to.eq(201);
                } else {
                    // Validate error response
                    expect(interception.response.statusCode).to.be.within(400, 499); 
                }
            });
        }

    errorDetection(errorMessage){
        cy.contains(errorMessage).should('be.visible');
        cy.wait(1000)
    }
    
    clickEnFirst(){
        cy.contains(locators.switchToEnglishOption).click()
    }
}

export default businessInfoSupplier