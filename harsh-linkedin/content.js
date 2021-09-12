chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("LinkedIN Fetching User Data Extenstion")
    fetchAndSaveData()
    sendResponse("Sucessfully Completed")
});

function getName() {
  find_username = document.getElementsByClassName("pv-text-details__left-panel mr5");
  let name = find_username[0].children[0].children[0].innerText
  return name
}

function getCompany() {
  company_name = document.getElementsByClassName("pv-text-details__right-panel");
  let company = company_name[0].children[0].children[0].innerText
  return company
}

function fetchAndSaveData() {
  const name = getName().split(" ")
  const company = getCompany()
  sendDataToApi(name, company)
}

function sendDataToApi(name, company) {
    let url = "http://localhost:3000/api/v1/merchants"
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        first_name: name[0],
        last_name: name[1],
        company_name: company
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "authentication_token": "RHEuNi7uzVpQ5qE3FKwEaa_zXYFouq59RPzwJxtq7apJe7Vhzq5FkcspkMxheEJmsHthHs77m3zKP1KLRMu4urjSGVpijiZszNVHbq6zkntBLD8ZyybusUVJBi_xzkbxnTcyvvrvBb4hwnryCR6UR4vSXRRTzGwfRUViNaFUpxY",
        "platform": "web"
      }
  }).then(() => {
      console.log("Data sent & stored to database sucessfully");
  }).catch(err => console.log(err));
}