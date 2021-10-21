
// In this extension there is mainly going to be the same procedure followed over and over.
// When someone changes the value of brightness or a mode a message is sent to the background script from where
// it reaches the content script.
// Along with this the change is stored at the local storage as well so that when the popup
// is reopened again the change remains constant without altering the look



const rangeInput = document.querySelectorAll('input');
const value = document.querySelectorAll('.value');

// If user has changed brightness, then extract it from the local storage and show it to the popup
if (localStorage.getItem("brightness") != null) {
    rangeInput[0].value = localStorage.getItem("brightness")
    value[0].textContent = localStorage.getItem("brightness")
}


// This deals with the brightness when the mouse is placed on the slider
document.getElementById("bright").addEventListener("mousedown", function () {
    
    // Switch off the dark mode if turned on
    const check_switch = document.getElementById('switch');
    if (check_switch.checked == true) {
        let simulate = document.getElementById("switch")
        simulate.click()
    }

    const rangeInput = document.querySelectorAll('input');
    const value = document.querySelectorAll('.value');

    // Dynamically change the value shown by the slider as it is changed
    for (let i = 0; i < rangeInput.length; i++) {
        value[i].textContent = rangeInput[i].value;
        rangeInput[i].addEventListener('input', () => {
            if (value[i]) {
                value[i].textContent = rangeInput[i].value;
                // Store the value for future use
                localStorage.setItem("brightness", `${value[i].textContent}`)
                let params = {
                    active: true,
                    currentWindow: true
                };
                chrome.tabs.query(params, gotTabs);

                function gotTabs(tabs) {
                    // send a message to the content script
                    let message = value[i].textContent
                    localStorage.setItem("brightness", `${message}`)
                    let msg = {
                        txt: value[i].textContent
                    };
                    chrome.tabs.sendMessage(tabs[0].id, msg);
                }
            }
        })
    }
})


// This deals with the read mode
document.getElementById("night").addEventListener("click", function () {

    // Switch off the night mode and dark mode if turned on
    localStorage.setItem("dark", 0)
    const check_switch = document.getElementById('switch');
    if (check_switch.checked == true) {
        let simulate = document.getElementById("switch")
        simulate.click()
    }

    // Update the condition of the read mode- 1 stands for on and 0 for off
    if (localStorage.getItem("read") == 1) {
        localStorage.setItem("read", 0)
    }
    else {
        localStorage.setItem("read", 1)
    }

    // Send a message called true2 which comes from the read mode
    let cd = "true2"
    let params = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        // send a message to the content script
        let message = cd
        let msg = {
            txt: cd
        };
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }
});


// This deals with the full screen mode
document.getElementById("full").addEventListener("click", function () {

    // When button is clicked, send a message called full to signify full screen mode
    let ce = "full"
    let params = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        // send a message to the content script
        let message = ce
        let msg = {
            txt: ce
        };
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }

});


// This deals with the dark mode
document.getElementById("switch").addEventListener("click", function () {

    // Switch off the read and night modes if turned on
    localStorage.setItem("dark", 0)
    localStorage.setItem("read", 0)
    const cb = document.getElementById('switch');

    // Update accordingly whether the dark mode is turned on or off
    if (cb.checked == true) {
        localStorage.setItem("turn", 1)
    }
    else {
        localStorage.setItem("turn", 0)
    }

    // Send a message accordingly to the content script
    let params = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        // send a message to the content script
        let message = cb.checked
        let msg = {
            txt: cb.checked
        };
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }
});


// This deals with the night mode
document.getElementById("dark").addEventListener("click", function () {

    // Switch off other modes if on
    localStorage.setItem("read", 0)
    const check_switch = document.getElementById('switch');
    if (check_switch.checked == true) {
        let simulate = document.getElementById("switch")
        simulate.click()
    }

    // Update the status of the button
    if (localStorage.getItem("dark") == 1) {
        localStorage.setItem("dark", 0)
    }
    else {
        localStorage.setItem("dark", 1)
    }

    // Send a message called dark to the content script
    let cf = "dark"
    let params = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        // send a message to the content script
        let message = cf
        let msg = {
            txt: cf
        };
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }
});


// This is the undo function which reverts all changes back to normal
document.getElementById("undo").addEventListener("click", function () {
    
    // Set the read mode, night mode as well as the switch to off as well
    const check_switch = document.getElementById('switch');
    if (check_switch.checked == true) {
        let simulate = document.getElementById("switch")
        simulate.click()
    }
    localStorage.setItem("read", 0)
    localStorage.setItem("dark", 0)

    // Set the values of brightness bar back to 100 and update storage
    const rangeInput = document.querySelectorAll('input');
    const value = document.querySelectorAll('.value');
    rangeInput[0].value = 100
    value[0].textContent = 100
    localStorage.setItem("brightness", 100)

    // Send a message of undo to the content script
    let cg = "undo"
    let params = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        // send a message to the content script
        let message = cg
        let msg = {
            txt: cg
        };
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }
});
