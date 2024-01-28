const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


   // FOR LOGIN 

   async function loginToLinkedIn(username, password) {
    let options = new chrome.Options();
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  
    try {
      // Navigate to LinkedIn login page
      await driver.get("https://www.linkedin.com/login");
  
      // Enter username and password
      await driver.findElement(By.id("username")).sendKeys(username);
      await driver.findElement(By.id("password")).sendKeys(password);
  
      // Click on the "Sign in" button
      await driver.findElement(By.css(".login__form_action_container button")).click();
  
      // Wait for the login to complete (you may need to adjust the wait condition)
      await driver.wait(until.titleContains("LinkedIn"), 10000);
  
      return driver; // Return the driver instance after login
  
    } catch (error) {
      console.error("Login failed:", error.message);
      await driver.quit();
      return null;
    }
  }









   //FOR SCRAPPING


async function extractLinkedInProfile(url) {
  // Set up the Chrome browser
  let options = new chrome.Options();
  //   options.addArguments('--headless'); // Run in headless mode (without opening a browser window)

  // Create a new WebDriver instance
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the LinkedIn profile page
    await driver.get(url);

    // Wait for the profile page to load
    await driver.wait(until.titleContains("LinkedIn"), 10000);

    const nameLocation = '//*[@id="Pt7OlZpkTF6jW6/IDw61ww=="]/div/ul/li[1]/div/div/div/div[2]/div[1]/div[1]/div/span[1]/span/a/span/span[1]'
    const title = '//*[@id="Pt7OlZpkTF6jW6/IDw61ww=="]/div/ul/li[1]/div/div/div/div[2]/div[1]/div[2]'
    const location = '//*[@id="Pt7OlZpkTF6jW6/IDw61ww=="]/div/ul/li[1]/div/div/div/div[2]/div[1]/div[3]'
    // Extract profile information
    const name_e = await driver.findElement(By.xpath(nameLocation)).getText();
    const title_e = await driver.findElement(By.xpath(title)).getText();
    const location_e = await driver.findElement(By.xpath(location)).getText();

    // const headline = await driver.findElement(By.xpath('//h2[contains(@class, "mt1 t-18 t-black t-normal")]/text()')).getText();
    // const connections = await driver.findElement(By.xpath('//span[contains(@class, "t-bold")]/text()')).getText();

    console.log("Name:", name_e);
    console.log("title:", title_e);
    console.log("location  :", location_e);
    // console.log('Headline:', headline);
    // console.log('Connections:', connections);

    // You can extract more information as needed
  } finally {
    // Close the browser window
    await driver.quit();
  }
}

// Provide the LinkedIn profile URL

// let search = "java"
// const profileUrl = "https://www.linkedin.com/search/results/people/?keywords={search}&origin=SWITCH_SEARCH_VERTICAL&sid=v!%3B://github.com/";
// extractLinkedInProfile(profileUrl);




// MAIN FUNCTION
async function main() {
    // Replace 'your_username' and 'your_password' with your actual LinkedIn credentials
    let driver = await loginToLinkedIn("9142945779", "#Qwerty12345678.");
  
    if (driver) {
      console.log("Login successful!");
  
      // Navigate to the search results page
      await driver.get("https://www.linkedin.com/search/results/people/?keywords=java&origin=SWITCH_SEARCH_VERTICAL&sid=v!%3B");
  
      // Call the function to extract profile information
      await extractLinkedInProfile(driver.getCurrentUrl());
    } else {
      console.log("Login failed. Check your credentials.");
    }
  }
  
  // Execute the main function
  main();