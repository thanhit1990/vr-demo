import React, { useRef, useEffect } from 'react';

function MyComponent() {
    // useEffect to find the button element by its inner text
    useEffect(() => {
        const buttons = document.querySelectorAll('button');

        buttons.forEach((button) => {
            if (button.innerText === 'Enter VR') {
                // Set the ref to the button element
                button.click();
            }
        });
    }, []);

    return (
        <div>
            Hello VR
        </div>
    );
}

export default MyComponent;
