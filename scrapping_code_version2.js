const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// FOR LOGIN
async function loginToLinkedIn(driver, username, password) {
    // Navigate to LinkedIn login page
    await driver.get("https://www.linkedin.com/login");
    // Enter username and password
    await driver.findElement(By.id("username")).sendKeys(username);
    await driver.findElement(By.id("password")).sendKeys(password);
    // Click on the "Sign in" button
    await driver.findElement(By.css(".login__form_action_container button")).click();
    console.log("login successful");
    // Wait for the login to complete (you may need to adjust the wait condition)
    // return driver.wait(until.titleContains("LinkedIn"), 10000);
}

// FOR SCRAPING
async function extractLinkedInProfile(
/** @type {import('selenium-webdriver').WebDriver} */ driver, url,
) {
    const locUL = By.css('ul.reusable-search__entity-result-list');
    const locLI = By.css('ul.reusable-search__entity-result-list > li.reusable-search__result-container');
    const locTitle = By.css('span.entity-result__title-text');
    const locPrimarySubtitle = By.css('div.entity-result__primary-subtitle');
    const locSecondarySubtitle = By.css('div.entity-result__secondary-subtitle');

    // Navigate to the LinkedIn profile page
    await driver.get(url);
    // Wait for the profile page to load
    // await driver.wait(until.titleContains("LinkedIn"), 10000);
    await driver.wait(until.elementLocated(locUL), 10000);

    const liElements = await driver.findElements(locLI);
    console.log("number of <li>s: ", liElements.length);
    for (const li of liElements) {
        const title = await li.findElement(locTitle);
        const primarySubtitle = await li.findElement(locPrimarySubtitle);
        const secondarySubtitle = await li.findElement(locSecondarySubtitle);
        console.log({
            title: await title.getText(),
            designation: await primarySubtitle.getText(),
            location: await secondarySubtitle.getText(),
        });
    }
}

// MAIN FUNCTION
async function main() {

      //Dummy url as of now
    const url = "https://www.linkedin.com/search/results/people/?keywords=java&origin=SWITCH_SEARCH_VERTICAL&sid=v!%3B";
    let options = new chrome.Options();
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    try {
        // Replace 'your_username' and 'your_password' with your actual LinkedIn credentials
        await loginToLinkedIn(driver, "9142945779", "#Qwerty12345678.");
        await sleep(20000);
        await extractLinkedInProfile(driver, url);
    } catch(e) {
        console.error("driver failed:", error);
    } finally {
        await driver.quit();
    }
}

// Execute the main function
main();