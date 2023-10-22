import React, { useEffect } from 'react';
import JXG from 'jsxgraph';

const JSXGraphComponent = () => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js";
        script.async = true;

        document.body.appendChild(script);
        // JSXGraph initialization and code
        (function () {
            const board = JXG.JSXGraph.initBoard('jxgbox', {
                boundingbox: [-8, 8, 8, -8],
                keepaspectratio: false,
                axis: false
            });

            var view = board.create('view3d',
                [[-6, -3], [8, 8],             // 2D box of view
                [[-5, 5], [-5, 5], [-5, 5]]],  // 3D bounding cube
                {});
            view.D3.az_slide.setValue(2.0); // 0 .. 2*Math.PI
            view.D3.el_slide.setValue(0.1); // 0 .. Math.PI / 2
            board.update();
        })();
    }, []);

    return (

        <div>

            <h1>JSXGraph Example</h1>
            {/* Create a div element to hold the JSXGraph board */}
            <div id="jxgbox" class="jxgbox"></div>
        </div>
    );
};

export default JSXGraphComponent;
