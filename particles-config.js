// Particles.js konfigürasyonu
document.addEventListener('DOMContentLoaded', function() {
    // Ana sayfa için particles
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#8B5CF6", "#6366F1", "#3B82F6", "#EC4899", "#10B981"]
            },
            shape: {
                type: ["circle", "edge", "triangle"],
                stroke: {
                    width: 2,
                    color: "#6366F1"
                }
            },
            opacity: {
                value: 0.7,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.2,
                    sync: false
                }
            },
            size: {
                value: 6,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 2,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#6366F1",
                opacity: 0.4,
                width: 2,
                triangles: {
                    enable: true,
                    color: "#8B5CF6",
                    opacity: 0.2
                }
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "bounce",
                bounce: true,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                repulse: {
                    distance: 300,
                    duration: 0.8
                }
            }
        },
        retina_detect: true
    });

    // Portfolio section için particles
    particlesJS("portfolio-particles", {
        fps_limit: 60,
        particles: {
            number: {
                value: 120,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ["#8B5CF6", "#6366F1", "#3B82F6", "#EC4899"]
            },
            shape: {
                type: ["circle", "triangle", "edge"],
                stroke: {
                    width: 1.5,
                    color: "#6366F1"
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.8,
                    opacity_min: 0.3,
                    sync: false
                }
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: true,
                    speed: 1.5,
                    size_min: 1.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 180,
                color: "#6366F1",
                opacity: 0.4,
                width: 1.5,
                triangles: {
                    enable: true,
                    color: "#8B5CF6",
                    opacity: 0.2
                }
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 800,
                    rotateY: 1600
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.6
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true,
        fullScreen: {
            enable: false
        }
    });
});
