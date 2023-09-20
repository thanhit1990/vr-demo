import React, { useRef } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function AnimationSlider({ fbx }) {
  let mixer = null;
  const clips = useRef(fbx.animations);
  const anims = useRef([]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  for (let i = 0, len = clips.current.length; i < len; i++) {
    const clip = clips.current[i];
    const action = mixer.current.clipAction(clip);
    action.play();
    action.paused = true;
    anims.current.push({ clip, action });
  }

  const seek = (percentage) => {
    for (let i = 0, len = anims.current.length; i < len; i++) {
      const { clip, action } = anims.current[i];
      action.time = percentage * clip.duration;
    }
  };

  return null;
}

function GLTFViewer() {
  const gltf = useLoader(GLTFLoader, "../../../assets/Models/3D/box3d.fbx");

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive object={gltf.scene} />
      <AnimationSlider gltf={gltf} />
    </Canvas>
  );
}

function FBXViewer() {
  const fbx = useLoader(FBXLoader, "box3d.fbx");

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive object={fbx} />
      <AnimationSlider fbx={fbx} />
    </Canvas>
  );
}

export default FBXViewer;