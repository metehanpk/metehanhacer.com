// Texture loader singleton
const textureLoader = new THREE.TextureLoader();

// Aurora Effect with optimized shader
function createAurora() {
    const auroraGeometry = new THREE.PlaneGeometry(30, 15, 32, 32);
    const auroraMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec2 vUv;
            varying float vElevation;
            uniform float time;
            
            void main() {
                vUv = uv;
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                float elevation = sin(modelPosition.x * 3.0 + time) * 
                                sin(modelPosition.y * 2.5 + time) * 0.5;
                modelPosition.z += elevation;
                vElevation = elevation;
                
                gl_Position = projectionMatrix * viewMatrix * modelPosition;
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec2 vUv;
            varying float vElevation;
            
            void main() {
                float strength = sin(vUv.y * 30.0 + time * 2.0) * 0.3 + 0.5;
                vec3 purpleColor = vec3(0.5, 0.0, 1.0);
                vec3 pinkColor = vec3(1.0, 0.0, 0.5);
                vec3 finalColor = mix(purpleColor, pinkColor, strength + vElevation);
                
                gl_FragColor = vec4(finalColor, strength * 0.3);
            }
        `,
        uniforms: {
            time: { value: 0 }
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
    });

    const aurora = new THREE.Mesh(auroraGeometry, auroraMaterial);
    aurora.position.z = -10;
    aurora.rotation.x = Math.PI * 0.1;
    
    if (scene) {
        scene.add(aurora);
    }

    return {
        mesh: aurora,
        material: auroraMaterial,
        dispose: () => {
            if (auroraGeometry) auroraGeometry.dispose();
            if (auroraMaterial) auroraMaterial.dispose();
            if (scene && aurora) scene.remove(aurora);
        }
    };
}

// Initialize effects with error handling
let effects = {
    aurora: null
};

// Animation loop
function animate() {
    if (effects.aurora && effects.aurora.material) {
        effects.aurora.material.uniforms.time.value += 0.01;
    }
    requestAnimationFrame(animate);
}

// Initialize effects
try {
    effects.aurora = createAurora();
    animate();
} catch (error) {
    console.error('Failed to initialize effects:', error);
}

// Cleanup function
function disposeEffects() {
    if (effects.aurora) effects.aurora.dispose();
}

// Add cleanup on page unload
window.addEventListener('unload', disposeEffects);
