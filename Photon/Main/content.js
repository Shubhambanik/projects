
// This is the main content script which is getting affected by the popup. It will receive
// certain messages regarding particular changes and will make the changes accordingly.
// It also has a local storage which helps the extension to remember what changes were made to
// particular websites.


// Make changes only when whole document is loaded
if (document.readyState !== 'loading') {
  start();
} else {
  dclhandler = true;
  document.addEventListener('DOMContentLoaded', start);
}

function start() {

  // Check if the user already has a preference for that webpage and update brightness
  if (localStorage.getItem("brightness") != null) {
    let temp = localStorage.getItem("brightness")
    document.querySelector("html").style.filter = `brightness(${temp})`;
  }

  // Check if the user already has a preference for that webpage and update dark mode
  if (localStorage.getItem("dark") == 1) {
    document.querySelector("html").style.filter = "none";
    document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";
    let media = document.querySelectorAll("img, picture, video");
    media.forEach((mediaItem) => {
      mediaItem.style.filter = "invert(1) hue-rotate(180deg)"
    })
  }

  // Check if the user already has a preference for that webpage and update read mode
  if (localStorage.getItem("read") == 1) {
    document.querySelector("html").style.filter = "none";
    document.querySelector("html").style.filter = "invert(1%) sepia(13%) saturate(1314%) hue-rotate(30deg) brightness(100%) contrast(92%)";
    let media = document.querySelectorAll("img, picture, video");
    media.forEach((mediaItem) => {
      mediaItem.style.filter = "invert(0%) sepia(13%) saturate(0%) hue-rotate(30deg) brightness(100%) contrast(92%)"
    })
  }

  // Check if the user already has a preference for that webpage and update night mode
  if (localStorage.getItem("night") == 1) {
    document.querySelector("html").style.filter = "none";
    document.querySelector("html").style.filter = "invert(5%) sepia(0%) saturate(0%) hue-rotate(175deg) brightness(102%) contrast(86%)";
    let media2 = document.querySelectorAll("img, picture, video");
    media2.forEach((mediaItem) => {
      mediaItem.style.filter = "invert(5%) sepia(0%) saturate(0%) hue-rotate(175deg) brightness(102%) contrast(86%)"
    })
  }


  chrome.runtime.onMessage.addListener(gotMessage);
  function gotMessage(message, sender, sendResponse) {

    // Extract the message which has been sent to the content script
    message = message.txt

    // true message means that the dark mode is turned on and thus invert is used in filter
    if (message == true && typeof(message) == 'boolean'){
      document.querySelector("html").style.filter = "none";
      localStorage.setItem("read", 0)
      localStorage.setItem("night", 0)
      localStorage.setItem("dark", 1)
      document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";
      // This is done to ensure filter doesn't affect the media
      let media = document.querySelectorAll("img, picture, video");
      media.forEach((mediaItem) => {
        mediaItem.style.filter = "invert(1) hue-rotate(180deg)"
      })
    }

    // false message means that the dark mode is turned off and thus filter is brought to none
    else if (message == false && typeof(message) == 'boolean') {
      localStorage.setItem("dark", 0)
      document.querySelector("html").style.filter = "none";
      let media = document.querySelectorAll("img, picture, video");
      media.forEach((mediaItem) => {
        mediaItem.style.filter = "none"
      })
    }

    // true2 message refers that the read mode is clicked and thus make the appropriate filter changes
    else if (message.localeCompare("true2") == 0) {

      check = document.querySelector("html").style.filter
      check2 = "invert(1%) sepia(13%) saturate(1314%) hue-rotate(30deg) brightness(100%) contrast(92%)"
      num = check.localeCompare(check2)

      // Read mode has been turned off
      if (num == 0) {
        localStorage.setItem("read", 0)
        document.querySelector("html").style.filter = "none";
        let media = document.querySelectorAll("img, picture, video");
        media.forEach((mediaItem) => {
          mediaItem.style.filter = "none"
        })

      }

      // Read mode has been turned on
      else {
        localStorage.setItem("read", 1)
        localStorage.setItem("night", 0)
        localStorage.setItem("dark", 0)

        // Make the appropriate filter changes
        document.querySelector("html").style.filter = "none";
        document.querySelector("html").style.filter = "invert(1%) sepia(13%) saturate(1314%) hue-rotate(30deg) brightness(100%) contrast(92%)";
        let media = document.querySelectorAll("img, picture, video");
        media.forEach((mediaItem) => {
          mediaItem.style.filter = "invert(0%) sepia(13%) saturate(0%) hue-rotate(30deg) brightness(100%) contrast(92%)"
        })
      }
    }

    // full message means that the full screen button has been clicked
    else if (message.localeCompare("full") == 0) {
      var elem = document.documentElement;
      elem.requestFullscreen();

    }

    // Undo button has been clicked and thus all changes have to be removed and storage for that
    // webpage is cleared
    else if (message.localeCompare("undo") == 0) {
      localStorage.setItem("brightness", 1)
      localStorage.setItem("read", 0)
      localStorage.setItem("dark", 0)
      localStorage.setItem("night", 0)

      document.querySelector("html").style.filter = "none";
      localStorage.clear()
    }


    // dark message refers that the night mode is clicked and thus make the appropriate filter changes
    else if (message.localeCompare("dark") == 0) {

      check3 = document.querySelector("html").style.filter
      check4 = "invert(5%) sepia(0%) saturate(0%) hue-rotate(175deg) brightness(102%) contrast(86%)"
      num2 = check3.localeCompare(check4)

      // Night mode has been turned off
      if (num2 == 0) {
        localStorage.setItem("night", 0)
        document.querySelector("html").style.filter = "none";
        let media = document.querySelectorAll("img, picture, video");
        media.forEach((mediaItem) => {
          mediaItem.style.filter = "none"
        })
      }

      // Night mode has been turned on
      else {
        localStorage.setItem("night", 1)
        localStorage.setItem("read", 0)
        localStorage.setItem("dark", 0)

        document.querySelector("html").style.filter = "none";
        document.querySelector("html").style.filter = "invert(5%) sepia(0%) saturate(0%) hue-rotate(175deg) brightness(102%) contrast(86%)";
        let media2 = document.querySelectorAll("img, picture, video");
        media2.forEach((mediaItem) => {
          mediaItem.style.filter = "invert(5%) sepia(0%) saturate(0%) hue-rotate(175deg) brightness(102%) contrast(86%)"
        })
      }
    }

    // This message is a number and thus only corresponds to the brightness of the screen
    else {

      // Set all parameters to their unclicked state
      localStorage.setItem("night", 0)
      localStorage.setItem("read", 0)
      localStorage.setItem("dark", 0)

      // message is divided as filter takes decimal digits
      message = message / 100

      // message is stored in the brightness storage
      localStorage.setItem("brightness", `${message}`)

      // Appropriate filter changes are made
      document.querySelector("html").style.filter = `brightness(${message})`;
    }
  }
}


