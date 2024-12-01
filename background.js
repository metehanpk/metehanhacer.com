// Background animation with Three.js
let scene, camera, renderer, particles, starField, stars = [];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Only setup if hero section exists
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // Scene setup with minimal settings
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        precision: "lowp" // Düşük hassasiyet modu
    });
    
    try {
        // Minimal renderer settings
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(1); // Sabit 1x pixel ratio
        renderer.setClearColor(0x000000, 0);
        
        // Optimize memory usage
        renderer.info.autoReset = false;
        
        // Create main particles with minimal count
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 75; // 75 parçacık

        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);
        const sizeArray = new Float32Array(particlesCount);

        // Daha geniş ve dengeli parçacık dağılımı
        for(let i = 0; i < particlesCount * 3; i += 3) {
            // Çift spiral dağılım
            const t = (i / particlesCount) * Math.PI * 4; // 4 tur spiral
            const radius = (Math.random() * 0.5 + 0.5) * 20; // Daha geniş ve dengeli radius
            posArray[i] = Math.cos(t * 3) * radius;
            posArray[i + 1] = (Math.random() - 0.5) * 15;
            posArray[i + 2] = Math.sin(t * 3) * radius;
            
            // Geliştirilmiş mor-pembe gradient
            const hue = 0.7 + Math.random() * 0.15; // 0.7-0.85 arası (mor-pembe)
            const saturation = 0.5 + Math.random() * 0.3; // Daha düşük satürasyon
            const lightness = 0.3 + Math.random() * 0.2; // Daha düşük parlaklık
            const color = new THREE.Color().setHSL(hue, saturation, lightness);
            colorArray[i] = color.r;
            colorArray[i + 1] = color.g;
            colorArray[i + 2] = color.b;
            
            // Daha büyük ve değişken boyutlar
            sizeArray[i/3] = Math.random() * 3 + 2; // 2-5 arası boyut
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

        // Enhanced shader material
        const particlesMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                attribute vec3 color;
                attribute float size;
                varying vec3 vColor;
                varying float vSize;
                uniform float uTime;
                
                void main() {
                    vColor = color;
                    vSize = size;
                    vec3 pos = position;
                    
                    // Karmaşık ve yumuşak dalga hareketi
                    float wave1 = sin(pos.x * 0.3 + uTime) * 0.3;
                    float wave2 = cos(pos.z * 0.2 + uTime * 0.8) * 0.3;
                    float wave3 = sin(pos.x * 0.2 - pos.z * 0.2 + uTime * 1.2) * 0.2;
                    pos.y += wave1 + wave2 + wave3;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Gelişmiş boyut kontrolü
                    float depth = (-mvPosition.z * 0.15) + 1.0;
                    gl_PointSize = size * (180.0 / -mvPosition.z) * depth;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vSize;
                
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    // Azaltılmış parlaklık efekti
                    float strength = 1.0 - (dist * 2.0);
                    strength = pow(strength, 2.0); // Daha keskin kenarlar
                    
                    // Daha düşük yoğunluklu merkez parlaklığı
                    vec3 glow = mix(vColor * 0.6, vColor * 0.9, strength);
                    float alpha = strength * 0.6; // Daha düşük opaklık
                    
                    gl_FragColor = vec4(glow, alpha);
                }
            `,
            uniforms: {
                uTime: { value: 0 }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Simplified star field
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 200; // Yıldız sayısını da azalttık
        const starPositions = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);

        for(let i = 0; i < starCount * 3; i += 3) {
            // Daha geniş küresel dağılım
            const radius = 30 + Math.random() * 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            
            starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i + 2] = radius * Math.cos(phi);
            
            // Daha büyük yıldızlar
            starSizes[i/3] = Math.random() * 0.8 + 0.2;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

        // Enhanced star material
        const starMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                varying float vAlpha;
                varying float vSize;
                
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Gelişmiş derinlik efekti
                    float distanceFromCenter = length(position) / 45.0;
                    vAlpha = 1.0 - distanceFromCenter;
                    vSize = size;
                    
                    gl_PointSize = size * (250.0 / -mvPosition.z);
                }
            `,
            fragmentShader: `
                varying float vAlpha;
                varying float vSize;
                
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    float strength = 1.0 - (dist * 2.0);
                    strength = pow(strength, 2.5); // Daha keskin yıldızlar
                    
                    // Daha soluk yıldız renkleri
                    vec3 coldColor = vec3(0.7, 0.8, 0.9);
                    vec3 warmColor = vec3(0.9, 0.8, 0.7);
                    vec3 color = mix(coldColor, warmColor, vSize);
                    
                    gl_FragColor = vec4(color, strength * vAlpha * 0.4); // Daha düşük opaklık
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        starField = new THREE.Points(starGeometry, starMaterial);
        scene.add(starField);

        camera.position.z = 20; // Kamerayı biraz daha uzaklaştırdık

        // Optimized mouse movement with debouncing
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let mouseTimeout;

        window.addEventListener('mousemove', (event) => {
            if (mouseTimeout) clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                mouseX = (event.clientX - window.innerWidth / 2) * 0.0002;
                mouseY = (event.clientY - window.innerHeight / 2) * 0.0002;
            }, 50); // 50ms debounce
        });

        // Super optimized animation loop
        let lastFrame = 0;
        const targetFPS = 24; // Daha düşük FPS
        const frameTime = 1000 / targetFPS;
        let frameCount = 0;

        function animate(currentTime) {
            requestAnimationFrame(animate);

            // FPS limiting
            const delta = currentTime - lastFrame;
            if (delta < frameTime) return;
            lastFrame = currentTime - (delta % frameTime);

            // Skip frames for low-end devices
            if (false && frameCount++ % 2 !== 0) return;

            // Minimal movement updates
            targetX += (mouseX - targetX) * 0.002;
            targetY += (mouseY - targetY) * 0.002;

            if (particles) {
                particles.rotation.x += targetY * 0.02;
                particles.rotation.y += targetX * 0.02;
                particles.material.uniforms.uTime.value = currentTime * 0.00005;
            }

            if (starField) {
                starField.rotation.y += 0.00002;
            }

            renderer.render(scene, camera);
        }

        animate();

        // Optimized resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            
            resizeTimeout = setTimeout(() => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(1);
            }, 250);
        });

        // Cleanup
        window.addEventListener('unload', () => {
            if (particles) {
                particles.geometry.dispose();
                particles.material.dispose();
            }
            if (starField) {
                starField.geometry.dispose();
                starField.material.dispose();
            }
            if (renderer) {
                renderer.dispose();
            }
        });
    } catch (error) {
        console.error('Three.js initialization error:', error);
    }
});
