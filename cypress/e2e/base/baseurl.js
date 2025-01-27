class baseUrl {
    visitHomePageEn() {
        cy.visit("https://client.bildnw.com/en/signin");
    }
    visitSignupUrlEn() {
        cy.visit("https://client.bildnw.com/en/register");
    }
    visitSignupUrlAr() {
        cy.visit("https://client.bildnw.com/register");
    }
    visitHomePageAr() {
        cy.visit("https://client.bildnw.com/signin");
    }
    visitTroubleshootUrl(direct, lang) {
        lang = lang === "ar" ? "/" : "/en/";
        cy.log(direct, lang);
        if (direct) {
            cy.visit("https://client.bildnw.com" + lang + "troubleshoot");
        } else {
            cy.visit("https://client.bildnw.com" + lang + "signin");
            cy.contains("Having trouble logging in?").click();
        }
    }
    changePhoneNumberUrl(lang) {
        lang = lang === "ar" ? "/" : "/en/";
        cy.visit("https://client.bildnw.com" + lang + "add_phone");
    }

    visitSignin_supplier() {
        cy.visit("https://supplierapp.bildnw.com/");
    }
    visitSignup_supplier() {
        cy.visit("https://supplierapp.bildnw.com/signup");
    }

    visitTroubleshoot_supplier() {
        cy.visit("https://supplierapp.bildnw.com/troubleshoot");
    }
}
export default baseUrl;