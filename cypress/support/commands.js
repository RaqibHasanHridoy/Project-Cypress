import "cypress-intercept-formdata"
import 'cypress-file-upload';

// ! Generate random number to input in the forms
export const genRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min) || 10;
};

export const genManCrNumber = () => {
  const firstDigit = '7';
  const middleDigits = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // Generates a 5-digit number, padded with leading zeros if necessary
  const lastDigits = '1032';
  return `${firstDigit}${middleDigits}${lastDigits}`;
};

export const cookieCleanUp = () => {
  cy.clearCookies();
  cy.clearLocalStorage();
}

export const mockUnlock = () => {
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