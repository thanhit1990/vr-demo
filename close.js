import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/libs/dat.gui.module.js';
var gui = new GUI();
// change size of gui
gui.width = 300;
// change text font size of gui
gui.domElement.style.fontSize = "12px";
var obj = {
    close: function () {
        window.close();
    }
};
var closeButton = gui.add(obj, "close").name("Close");
// Change background of button 
var closeButtonStyle = closeButton.domElement.style;
closeButtonStyle.color = 'white';