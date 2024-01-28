// Get data from storage and display it in the popup
chrome.storage.sync.get(['dataArray'], function(result) {
    const dataArray = result.dataArray || [];
    const resultList = document.getElementById('resultList');
  
    dataArray.forEach(data => {
      const listItem = document.createElement('li');
      listItem.textContent = data;
      resultList.appendChild(listItem);
    });
  });
  