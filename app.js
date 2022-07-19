function play_stream(url,inputUrl) {
    var video = document.getElementById('video');
    var m3u8Url = decodeURIComponent(url);

    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(m3u8Url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
        document.title = url;
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = m3u8Url;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
        document.title = url;
    }
}

function getURL (name) {
   return twitch.getStream(name)
	.then(data => data[2].url)
}


const valueInput = () => {
    let button = document.getElementById("btn-play");
    let urlInput = document.getElementById("inputUrl");
    button.addEventListener('click', function() {
        let urlForInput = document.getElementById("inputUrl").value;
        (async () => {
    const data = await getURL(urlForInput);
    play_stream(data);
})();

    }
        )
        urlInput.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("btn-play").click();
  }
});
}
valueInput();
