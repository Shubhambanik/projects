# Photon
#### Video Demo:  https://youtu.be/ETfEvmHkIFY
#### Description: Almost all students irrespective of stream have to spend hours and hours in front of a computer. This causes strain to the eyes as well as headaches.This happened to me as well and thus I decided to make this as my final project. Photon is a chrome extenion which helps to reduce the brightness of the screen. Along with it there is a dark mode toggle, a reading mode, a night mode and finally a full screen button in case a student has to view a document full screen with a filter.

### **manifest.json**
This file contains the name of the extension, the permissions it requires along with the name of the background and the content script. It contains the icon of the extension. This is the file from which chrome extension can better understand the context.

### **index.html**
This file contains how the popup will look like along with it's various buttons and I have made it by just replacing how it would look like in a webpage to an extension. Thus just like a webpage would have looked like, I just changed the view to a small popup by practicing in a separate local website.

### **style.css**
This file contains the styling of the pop-up which includes how it could be more user-friendly, such as button and icon colors and more.

### **pop-up.js**
This file contains the logic of the pop-up and thus sends messages as and when required to the background script, the changing the brightness number, the dark mode toggle and finally what message should be sent due to which button. Each button sends a different type of message which is interpreted by the content script.

### **background.js**
The only way that my pop-up will be able to contact with the main content of the page is via a background script which acts as a mediater.

## **content.js**
And finaly we have a content script. On the basis of the messages it receives it will alter the content of the webpage dynamically mainly with the help of filters, except the full screen method. Filter is a CSS property which makes use of brightness, inverse, saturation and much more in this case. It can be viewed in the code as well as in the developer mode.

Finally after all the files were ready, you need to go to chrome extension from tools, turn on developer mode and then in load unpacked, upload the main folder containing the files.

    There were some other additions which I debated such as additional filters as well as changing the contrast and saturation of the page as well. However I asked myself which were the things I would like as a student and thus went with my intuition of including those which were of the maximum priority.

This is just one chrome extension which I have added until now and I plan to add one every month such as a virtual highlighter, a dictionary and more.

Finally I would like to thank David J.Malan, Brian Yu, Doug Lloyd as well as the whole CS50 team without whom I would have never learnt the beauty of computer science. Thank you.
