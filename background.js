chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.loggedIn) {
    console.log("Korisnik je uspešno prijavljen. Preusmeravam korisnika na drugu stranicu...");
    // Ako je korisnik uspešno prijavljen, preusmeravamo ga na drugu stranicu
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tabId = tabs[0].id;
      chrome.tabs.update(tabId, {url: chrome.runtime.getURL("popup.html")}); // Pravilno postavljamo URL za preusmeravanje
    });
  }
});
