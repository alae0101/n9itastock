import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const globalMouse = new THREE.Vector2(0, 0);
if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

const Particles = ({ count }) => {
    const mesh = useRef();

    // Generate random positions and colors for particles
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorBrand = new THREE.Color('#f06a1e');
        const colorWhite = new THREE.Color('#ffffff');
        const colorMuted = new THREE.Color('#444444');

        for (let i = 0; i < count; i++) {
            // Random position in a sphere
            const r = 20 * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            // Random color mix
            const rand = Math.random();
            const mixedColor = rand > 0.8
                ? colorBrand
                : rand > 0.4
                    ? colorWhite
                    : colorMuted;

            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        return [positions, colors];
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            const time = state.clock.getElapsedTime();
            const targetX = time * 0.02 + (globalMouse.y * 0.5);
            const targetY = time * 0.05 + (globalMouse.x * 0.5);

            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetX, 0.05);
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetY, 0.05);
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
};

const NetworkLines = () => {
    const mesh = useRef();

    useFrame((state) => {
        if (mesh.current) {
            const time = state.clock.getElapsedTime();
            const targetX = (globalMouse.y * 0.2);
            const targetY = time * -0.03 + (globalMouse.x * 0.2);

            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetX, 0.05);
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetY, 0.05);
        }
    });

    return (
        <mesh ref={mesh}>
            <icosahedronGeometry args={[8, 1]} />
            <meshBasicMaterial
                color="#f06a1e"
                wireframe={true}
                transparent={true}
                opacity={0.15}
            />
        </mesh>
    );
}

const Hero3D = () => {
    return (
        <div className="hero-canvas-container fixed-hero-bg">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <fog attach="fog" args={['#0a0a0a', 10, 30]} />
                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <Particles count={1500} />
                <NetworkLines />
            </Canvas>
        </div>
    );
};

export default Hero3D;
