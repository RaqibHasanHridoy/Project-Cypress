import locator from './locators/purchaseRequest.json'

class purchaseRequest {

    cannotCreatePurchaseRequest(key) {
        cy.contains(locator.purchaseRequestButton).should('not.enabled')
        if (key === "Credit Rejected") {
            cy.contains(locator.purchaseRequestError[key]).should('be.visible')
        }
        cy.xpath(locator.disabledPurchaseRequestButton).trigger('mousemove', { force: true });
        if (key === "Credit Rejected") {
            cy.contains(locator.purchaseRequestError["noPermission"]).should('be.visible')
        }
        else {
            cy.contains(locator.purchaseRequestError[key]).should('be.visible')
        }
    }

    createPurchaseRequest(data) {
        cy.wait(5000)
        this.verifyUrl();
        this.clickCreatePurchaseRequestButton();
        cy.wait(5000)
        cy.xpath(locator.qouteDoucmentUpload).attachFile(this.fileFinder(data.qouteDoc));
        cy.get(locator.materialDropdownSelector).click({ force: true });
        data.materials.forEach(material => {
            cy.get(locator.materialDropdownList).contains(material).click({ force: true });
        });
        cy.get(locator.closeDropdown).eq(0).click({ force: true });
        cy.get(locator.cost).type(data.cost.total);
        cy.wait(2000)
        cy.get(locator.dealTimeDropdown).eq(0).click({ force: true });
        cy.contains(data.cost.time).click({ force: true });
        cy.contains(data.cost.fullPrice).should('be.visible');
        cy.contains(locator.deliveryLocation).parent().parent().find('input').type(data.delivery.location);
        cy.get(locator.dropdownGeneral).eq(1).click({ force: true });
        cy.contains(data.delivery.reciver).click({ force: true });
        cy.xpath(locator.phoneNumber).eq(0).type(data.delivery.phone);
        cy.get(locator.dropdownGeneral).eq(2).click({ force: true });
        cy.contains(data.supplier.id).click({ force: true });
        cy.contains(locator.supplierName).parent().parent().find('input').type(data.supplier.name);
        cy.xpath(locator.phoneNumber).eq(1).type(data.supplier.phone);
        cy.contains(locator.supplierEmail).parent().parent().find('input').type(data.supplier.email);
        this.submitPurchaseRequest();
        this.purchaseRequestSuccessMessage();
        cy.wait(3000);
    }

    verifyUrl() {
        cy.url().should('include', 'purchase/purchase_requests')
    }

    clickCreatePurchaseRequestButton() {
        cy.contains(locator.purchaseRequestButton).click({ force: true })
    }

    fileFinder(fileName) {
        return `${fileName}`;
    }

    submitPurchaseRequest() {
        cy.intercept(
            "POST",
            "https://dev.bildnw.quest/v1/purchase/purchase_requests/"
        ).as("purchaseRequestAPI");
        cy.contains(locator.submitButton).click({ force: true });
        cy.wait("@purchaseRequestAPI").then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
        });
    }

    purchaseRequestSuccessMessage() {

        cy.wait(3000);
        cy.url().should('include', '/en/purchase/purchase_successfully')
        cy.contains(locator.purchaseRequestSuccessMessage).should('be.visible')
    }

    extractParams() {
        return cy.url().then(url => {
            const urlObj = new URL(url);
            const params = new URLSearchParams(urlObj.search);
            const id = params.get('id');
            const quotationId = params.get('quotation_id');
            return { id, quotationId };
        });
    }

    extractParamsFromUrl() {
        return cy.location('search').then(search => {
            const params = new URLSearchParams(search);
            const queryParams = {};
            params.forEach((value, key) => {
                queryParams[key] = value;
            });
            return queryParams;
        });
    }

    backToPurchaseRequestList() {
        cy.contains("View Quotation").click({ force: true });
        cy.wait(3000);
    }

    verifyQuotation(params) {
        cy.url().should('include', 'purchase/pr_request_detail')
        cy.url().should('include', params.id)
        cy.url().should('include', params.quotationId)
        cy.contains(params.quotationId).should('be.visible')
    }

    verifyListItem(params, data) {
        cy.get('[class*="_purchase_request_table_column"]').eq(0).find('[class*="_purchase_request_table_order_number"]').eq(0).invoke('text').should('eq', params.quotationId)
        cy.get('[class*="_purchase_request_table_column"]').eq(1).find('[class*="_purchase_request_table_total_value"]').eq(0).invoke('text').should('include', data.cost.total)
        cy.get('[class*="_purchase_request_table_column"]').eq(4).find('[class*="_purchase_request_table_status"]').eq(0).invoke('text').should('include', "In review")
    }

    pressAllPurchaseRequestButton() {
        cy.contains(locator.allPurchaseRequestButton).click({ force: true });
    }

    purchaseRequestListAvailableCreditLimit(dealData, creditDashboardData, purchaseRequestData) {
        let totalCredit = parseFloat(creditDashboardData.totalCredit.replace(/ SAR|,/g, ""));
        let usedCredit = parseFloat(creditDashboardData.creditUsed.replace(/ SAR|,/g, ""));
        let totalCost = parseFloat(purchaseRequestData.cost.total.replace(/,/g, ""));
        let creditAvailable = (totalCredit - usedCredit - totalCost).toFixed(0).toString(); // Convert to string without decimal places
        cy.log(`Credit Available: ${creditAvailable}`);
        cy.log("This is credit calculate data ", creditAvailable, totalCost, totalCredit);
        cy.get('[class*="PurchaseRequests_cost"]').invoke('text').then((text) => {
            cy.log("This is the credit available on PR list page", text);
            let textValue = parseFloat(text.replace(/ SAR|,/g, "")).toFixed(0).toString(); // Convert to string without decimal places
            assert.equal(textValue, creditAvailable);
        });
    }

}

export default purchaseRequest