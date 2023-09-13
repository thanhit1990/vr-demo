import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Algebra_Avatar from '../assets/images/Algebra.png';
import Geometry_Avatar from '../assets/images/Geometry.png';
import Operations_Avatar from '../assets/images/Operations.png';
import Measurement_Avatar from '../assets/images/Measurement.png';
import Statistics_Avatar from '../assets/images/Probability and Statistics.png';
import Number_Avatar from '../assets/images/Number Sense.png';

const Home = () => {
    // let openedWindow = null;

    const [selectedRoom, setSelectedRoom] = useState('');

    const handleRoomClick = (roomUrl) => {
        // const roomUrl = roomUrls[pictureUrl];
        setSelectedRoom(roomUrl);
        const newWindow = window.open(roomUrl, 'XR Room');

        // Listen for messages from Window B
        window.addEventListener('message', (event) => {
            // Check if the message is from Window B
            if (event.source === newWindow) {
                // Access the data sent from Window B
                const dataFromWindowB = event.data;

                // Check if the variable has changed
                if (dataFromWindowB.variableChanged) {
                    // Close Window B
                    newWindow.close();
                }
            }
        });

        // Save a reference to the child window
        setChildWindow(newWindow);
    };

    const rooms = [
        { name: 'Algebra', pictureUrl: Algebra_Avatar, roomUrl: '/vr-demo/VRApp' },
        { name: 'Geometry', pictureUrl: Geometry_Avatar, roomUrl: '/vr-demo/JSXGraphReact' },
        { name: 'Operations', pictureUrl: Operations_Avatar, roomUrl: '/vr-demo/JSXGraphComponent' },
        { name: 'Measurement', pictureUrl: Measurement_Avatar, roomUrl: '/vr-demo/JSXGraphReact' },
        { name: 'Number Sense', pictureUrl: Number_Avatar, roomUrl: '/vr-demo/JSXGraphComponent' },
        { name: 'Probability and Statistics', pictureUrl: Statistics_Avatar, roomUrl: '/vr-demo/VRApp' },
        // Add more rooms with their respective picture URLs
    ];
    
    return (
        <Container>
            <Row>
                {rooms.map((room, index) => (
                    <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                        <img
                            src={room.pictureUrl}
                            alt={room.name}
                            onClick={() => handleRoomClick(room.roomUrl)}
                            className="img-fluid shadow"
                            style={{ cursor: 'pointer', width: '150px', height: '150px' }}
                        />
                        <p style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginTop: '10px', marginBottom: '10px' }}>{room.name}</p>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;