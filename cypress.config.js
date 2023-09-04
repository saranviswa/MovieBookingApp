const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on("before:browser:launch", (browser, launchOptions) => {
        // You can modify browser launch options here
        if (browser.name === "chrome") {
          launchOptions.args.push("--disable-dev-shm-usage");
        }
        return launchOptions;
      });

      // Add more event listeners as needed

      // Example: Listen for a custom event
      on("task", {
        myCustomTask(param) {
          // Perform some custom task and return a result
          return doSomethingWith(param);
        },
      });
    },
  },
});
