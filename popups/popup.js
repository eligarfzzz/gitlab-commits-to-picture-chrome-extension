function isLocationGitlabCommit(url) {
    // if(location.host != "gitlab.com"){
    //     return false;
    // }
    const reg = /^https:\/\/gitlab.com(\/.+)+\/-\/commit\/([a-zA-Z0-9])+$/;
    return reg.test(url);
}


function sendSavePictures(tab) {
    chrome.tabs.sendMessage(tab.id, { text: 'save_pictures' });
}

async function getCurrentTab() {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tabs.length > 0) {
        return tabs[0];
    } else {
        return null;
    }
}


document.addEventListener('DOMContentLoaded', async function () {
    const tab = await getCurrentTab();
    if (isLocationGitlabCommit(tab.url)) {
        document.querySelector("#mainbutton").onclick = () => { sendSavePictures(tab) };
        document.querySelector("#mainbutton").innerHTML = "click to save pictures";
    } else {
        document.querySelector("#mainbutton").onclick = null;
        document.querySelector("#mainbutton").innerHTML = "this is not gitlab";
    }
});

