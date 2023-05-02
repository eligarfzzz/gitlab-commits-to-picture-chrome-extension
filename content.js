function savePictures() {

    document.querySelectorAll(".diff-file.file-holder").forEach(element => {
        /**
         * @type {HTMLElement}
         */
        const title = element.getElementsByClassName("js-file-title")[0];
        
        // replace `position: sticky` to `position: static` to ensure layout in picture is correct
        const prevPosition = title.style.position;
        title.style.position = "static";

        // `html-to-image` can not handle `svg` with `href` attribute for now,
        // update the lib after fixing the issue
        // https://github.com/bubkoo/html-to-image/issues/392
        htmlToImage.toJpeg(element)
            .then(function (dataUrl) {

                const link = document.createElement('a');
                link.download = 'diff.jpeg';
                link.href = dataUrl;
                link.click();

                // revert style
                title.style.position = prevPosition;

            });
    })
    
    alert("downloading... wait for a few seconds please")

}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'save_pictures') {
        savePictures();
    }
});
