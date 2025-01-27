class mockUtils {

    lockKYC(flag) {
        return cy.request({
            method: 'POST',
            url: 'https://mockapp.bildnw.quest/lock/kyc',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "kyc": flag
            }
        });
    }

    lockKYB(flag) {
        return cy.request({
            method: 'POST',
            url: 'https://mockapp.bildnw.quest/lock/kyb',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "kyb": flag
            }
        });
    }

    resetLocks() {
        cy.request({
            method: 'POST',
            url: 'https://mockapp.bildnw.quest/lock/kyc',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "kyc": false
            }
        });
        cy.request({
            method: 'POST',
            url: 'https://mockapp.bildnw.quest/lock/kyb',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "kyb": false
            }
        });
        cy.wait(2000);
    }

}

export default mockUtils;