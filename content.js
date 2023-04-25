function savePictures() {
    document.querySelectorAll(".diff-viewer").forEach(element => {
        domtoimage.toJpeg(element)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'diff.jpeg';
                link.href = dataUrl;
                link.click();
            });
    })
    
    alert("wait for downloading...")
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'save_pictures') {
        savePictures();
    }
});
