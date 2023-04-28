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

    /**
     * @type {HTMLButtonElement}
     */
    const btn = document.querySelector("#mainbutton");
    if (isLocationGitlabCommit(tab.url)) {
        btn.onclick = () => { sendSavePictures(tab) };
        btn.innerHTML = "click to save pictures";
        btn.disabled = false;
    } else {
        btn.onclick = null;
        btn.innerHTML = "this site is not a gitlab commit😅";
        btn.disabled = true;
    }
    
});

