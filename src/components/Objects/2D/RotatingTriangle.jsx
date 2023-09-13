import React, { Component } from 'react';
import '../../../assets/styles/styles.css'
class RotatingTriangle extends Component {
    constructor(props) {
        super(props);

        // Define the triangle's vertices
        this.vertices = [
            { x: 100, y: 100 },
            { x: 200, y: 100 },
            { x: 150, y: 200 }
        ];

        this.state = {
            rotationAngle: 0,
            isAnimating: false
        };

        this.canvasRef = React.createRef();
    }

    // Function to rotate a point around the origin (0, 0)
    rotatePoint(point, angleInRadians) {
        const x = point.x * Math.cos(angleInRadians) - point.y * Math.sin(angleInRadians);
        const y = point.x * Math.sin(angleInRadians) + point.y * Math.cos(angleInRadians);
        return { x, y };
    }

    // Function to draw a rotated triangle
    drawRotatedTriangle(vertices, angleInDegrees) {
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();

        for (const vertex of vertices) {
            const rotatedVertex = this.rotatePoint(vertex, angleInRadians);
            ctx.lineTo(rotatedVertex.x, rotatedVertex.y);
        }

        ctx.closePath();
        ctx.stroke();
    }

    // Function to start the animation
    startAnimation = () => {
        if (!this.state.isAnimating) {
            this.setState({ isAnimating: true }, () => {
                this.animate();
            });
        }
    }

    // Animation loop using requestAnimationFrame
    animate() {
        this.setState(
            (prevState) => ({
                rotationAngle: prevState.rotationAngle + 1
            }),
            () => {
                this.drawRotatedTriangle(this.vertices, this.state.rotationAngle);
                if (this.state.isAnimating) {
                    requestAnimationFrame(this.animate.bind(this));
                }
            }
        );
    }

    // Function to stop the animation
    stopAnimation = () => {
        this.setState({ isAnimating: false });
    }

    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} width={400} height={400}></canvas>
                <button onClick={this.startAnimation}>Start Animation</button>
                <button onClick={this.stopAnimation}>Stop Animation</button>
            </div>
        );
    }
}

export default RotatingTriangle;
