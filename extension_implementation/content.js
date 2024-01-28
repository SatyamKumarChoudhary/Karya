// Get the current URL
const currentUrl = window.location.href;

// Check if the current URL matches the LinkedIn search URL
if (currentUrl === "https://www.linkedin.com/search/results/people/?keywords=java&origin=SWITCH_SEARCH_VERTICAL&sid=v!%3B") {
  // If the URL matches, execute your extension logic here

  // Get the ul element by its class name
  const ulElement = document.querySelector('.reusable-search__entity-result-list');

  // Check if the ul element is found
  if (ulElement) {
    // Initialize an empty array to store data from li elements
    const dataArray = [];

    // Loop through each li element inside the ul
    ulElement.querySelectorAll('.reusable-search__result-container').forEach(liElement => {
      // Get the data from the li element (you can customize this part based on your actual data structure)
      const data = liElement.textContent.trim();

      // Push the data into the array
      dataArray.push(data);
    });

    // Now, dataArray contains the data from all li elements inside the ul
    console.log(dataArray);

    // Store the dataArray in Chrome storage
    chrome.storage.sync.set({ 'dataArray': dataArray }, function() {
      console.log('Data saved to storage:', dataArray);
    });
  } else {
    console.error('UL element not found');
  }
}

// You can add more code here to interact with the content of the web page
