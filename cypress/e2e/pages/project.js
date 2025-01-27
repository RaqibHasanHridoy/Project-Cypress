import locators from './locators/project.json';
class project {

    isProjectListOpen() {
        cy.url().should('include', '/project/project_list');
    }

    projectListOpen() {
        cy.contains("Create project").click();
        cy.wait(4000)
        cy.url().should('include', '/project/create_project');
    }


    doProjectDetailQuick() {
        const projectData = {
            "materials": [
                "Other",
                "Steel",
                "Cables",
                "Plumbing",
            ],
            "estimatedProfitMargin": "10",
            "paymentDays": "30",
            "paymentDelay": 10,
            "advancePayment": true,
            "lcSecured": true,
            "typeOfProject": "Medical",
            "howManyProjects": "1",
            "publicEntity": false,
            "top3Clients": {
                "1": {
                    "phone": "555555555",
                    "companyName": "ABC Limited",
                    "name": "John Doe",
                },
                "2": {
                    "phone": "555555557",
                    "companyName": "DEF Limited",
                    "name": "Jane Doe",
                },
                "3": {
                    "phone": "555555559",
                    "companyName": "GHI Limited",
                    "name": "John Doe",
                },
            },
            "contactConsent": true,
            "projectContractFile": "file_contract.pdf",
            "projectInvoiceFile": "file_invoice.pdf"
        }
        this.doProjectDetail(projectData);
    }

    doProjectDetail(data) {

        cy.get(locators.materialDropdown).click();
        data.materials.forEach((material) => {
            cy.get(".mantine-MultiSelect-dropdown").contains(material).click({ force: true });
        });
        cy.get("body").click(900, 400);
        cy.get('[class*="mantine-Input-rightSection mantine-MultiSelect-rightSection"]').click({ force: true });
        cy.get(locators.invoicePaymentSlider).contains(data.paymentDays).click();
        cy.get('input[type="range"][data-index="0"]').eq(1)
            .invoke('val', data.paymentDelay)
            .trigger('change', { force: true });
        if (data.advancePayment) {
            cy.xpath(locators.checkBoxs).eq(0).click({ force: true });
        }
        if (data.lcSecured) {
            cy.xpath(locators.checkBoxs).eq(1).click({ force: true });
        }
        cy.url().then((url) => {
            if (url !== "https://client.bildnw.com/en/profile/project") {
                cy.contains(data.typeOfProject).click();
                cy.contains(locators.howManyProjectsDone).parent().parent().find("input").type(data.howManyProjects);
                if (!data.publicEntity) {
                    cy.xpath(locators.publicEntity).eq(1).click({ force: true });
                }
            }
        });
        cy.xpath(locators.clientPhoneNumber).eq(0).type(data.top3Clients["1"].phone);
        cy.xpath(locators.clientPhoneNumber).eq(1).type(data.top3Clients["2"].phone);
        cy.xpath(locators.clientPhoneNumber).eq(2).type(data.top3Clients["3"].phone);
        cy.xpath("//input[@type='text']").eq(1).type(data.top3Clients["1"].companyName);
        cy.xpath("//input[@type='text']").eq(2).type(data.top3Clients["1"].name);
        cy.xpath("//input[@type='text']").eq(3).type(data.top3Clients["2"].companyName);
        cy.xpath("//input[@type='text']").eq(4).type(data.top3Clients["2"].name);
        cy.xpath("//input[@type='text']").eq(5).type(data.top3Clients["3"].companyName);
        cy.xpath("//input[@type='text']").eq(6).type(data.top3Clients["3"].name);
        if (data.contactConsent) {
            cy.xpath(locators.checkBoxs).eq(2).click({ force: true });
        }
        cy.xpath("//input[@type='file']").eq(0).attachFile(data.projectContractFile);
        cy.contains(locators.estimatedProfitMargin).parent().parent().find("input").type(data.estimatedProfitMargin);
        cy.contains('Project Details').click();
        cy.contains("Save").click();
    }
}

export default project