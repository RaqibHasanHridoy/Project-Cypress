const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
