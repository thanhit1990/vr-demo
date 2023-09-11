import React from 'react';

const OpenCloseWindow = () => {
    let openedWindow = null;

    const openWindow = () => {
        // Open a new window when the link is clicked
        openedWindow = window.open('https://www.example.com', 'MyWindow', 'width=500,height=500');
    };

    const closeWindow = () => {
        // Change the variable here as needed
        // const variableChanged = true;
        if (window.opener) {
            // window.opener.location.href = '/tab-a';
            window.close(); // Close tab B
        }
        // Send a message to Window A
        // window.opener.postMessage({ variableChanged }, '*');

    };

    return (
        <div>
            <button onClick={openWindow}>Open Window</button>
            <button onClick={closeWindow}>Close Window</button>
        </div>
    );
};

export default OpenCloseWindow;
