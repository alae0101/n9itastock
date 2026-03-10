import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// track mouse globally so particles can react
const mouse = new THREE.Vector2(0, 0)
if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
}

function Particles({ count }) {
    const ref = useRef()

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const col = new Float32Array(count * 3)

        const orange = new THREE.Color('#f06a1e')
        const white = new THREE.Color('#ffffff')
        const dark = new THREE.Color('#444444')

        for (let i = 0; i < count; i++) {
            // spread in a sphere
            const r = 20 * Math.cbrt(Math.random())
            const theta = Math.random() * 2 * Math.PI
            const phi = Math.acos(2 * Math.random() - 1)

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            pos[i * 3 + 2] = r * Math.cos(phi)

            const rand = Math.random()
            const c = rand > 0.8 ? orange : rand > 0.4 ? white : dark
            col[i * 3] = c.r
            col[i * 3 + 1] = c.g
            col[i * 3 + 2] = c.b
        }

        return [pos, col]
    }, [count])

    useFrame(state => {
        if (!ref.current) return
        const t = state.clock.getElapsedTime()

        // auto rotate + follow mouse
        const tx = t * 0.02 + mouse.y * 0.5
        const ty = t * 0.05 + mouse.x * 0.5
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, tx, 0.05)
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, ty, 0.05)
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} sizeAttenuation />
        </points>
    )
}

// the icosahedron wireframe in the background
function WireFrame() {
    const ref = useRef()

    useFrame(state => {
        if (!ref.current) return
        const t = state.clock.getElapsedTime()
        const tx = mouse.y * 0.2
        const ty = t * -0.03 + mouse.x * 0.2
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, tx, 0.05)
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, ty, 0.05)
    })

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[8, 1]} />
            <meshBasicMaterial color="#f06a1e" wireframe transparent opacity={0.15} />
        </mesh>
    )
}

function Hero3D() {
    return (
        <div className="hero-canvas-container fixed-hero-bg">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <fog attach="fog" args={['#0a0a0a', 10, 30]} />
                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <Particles count={1500} />
                <WireFrame />
            </Canvas>
        </div>
    )
}

export default Hero3D
