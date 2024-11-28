// Particles.js konfigürasyonu
document.addEventListener('DOMContentLoaded', function() {
    const isLowEnd = window.navigator.hardwareConcurrency <= 4;
    const isMobile = window.innerWidth < 768;
    
    particlesJS("particles-js", {
        particles: {
            number: {
                value: isLowEnd ? 15 : (isMobile ? 20 : 30), // Daha da az parçacık
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: "#9333ea"
            },
            shape: {
                type: "circle" // Sadece daire
            },
            opacity: {
                value: 0.3,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 1.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#9333ea",
                opacity: 0.2,
                width: 1,
                triangles: {
                    enable: false
                }
            },
            move: {
                enable: true,
                speed: isLowEnd ? 1 : (isMobile ? 1.5 : 2),
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !isLowEnd && !isMobile, // Düşük performanslı cihazlarda devre dışı
                    mode: "grab"
                },
                onclick: {
                    enable: false
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 0.5
                    }
                }
            }
        },
        fps_limit: 30,
        retina_detect: false,
        detect_on: "canvas"
    });
});
