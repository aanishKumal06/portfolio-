// Smooth scroll for navbar links (native)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (!target) {
            console.log('Target element not found:', targetId);
            return;
        }

        // Use native smooth scroll
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: targetPosition - 100,
            behavior: 'smooth'
        });
    });
});





function loaderAnimation() {
    var loader = document.querySelector("#loader")
    setTimeout(function () {
        loader.style.top = "-100%"
    }, 4200)
}

// Ensure content is visible even if loader fails
window.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector("#loader");
    if (loader) {
        // Fallback: hide loader after maximum 5 seconds
        setTimeout(function() {
            if (loader.style.top !== "-100%") {
                loader.style.top = "-100%";
            }
        }, 5000);
    }
});

const sectionIds = ["home", "about", "project"];
let lastHash = "";
let hashTicking = false;

function getActiveSectionId() {
    const triggerLine = (window.innerHeight || document.documentElement.clientHeight) * 0.35;
    let activeId = sectionIds[0];

    sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) {
            return;
        }
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
            activeId = id;
        }
    });

    return activeId;
}

// Update URL hash when scrolling through sections
function updateHash() {
    const activeId = getActiveSectionId();
    if (activeId !== lastHash) {
        lastHash = activeId;
        history.replaceState(null, null, `#${activeId}`);
    }
}

// Listen for scroll events (native)
window.addEventListener('scroll', () => {
    if (!hashTicking) {
        window.requestAnimationFrame(() => {
            updateHash();
            hashTicking = false;
        });
        hashTicking = true;
    }
});

loaderAnimation()

// Mobile menu toggle
const menuBtn = document.querySelector('nav h3');
const navPart2 = document.querySelector('#nav-part2');
const fullScr = document.querySelector('#full-scr');
const fullDiv1 = document.querySelector('#full-div1');

if (menuBtn && navPart2 && fullScr) {
    // Clone nav items into full screen menu
    const navClone = navPart2.cloneNode(true);
    navClone.id = 'nav-mobile';
    fullDiv1.appendChild(navClone);

    menuBtn.addEventListener('click', function() {
        if (fullScr.style.top === '0%') {
            fullScr.style.top = '-100%';
        } else {
            fullScr.style.top = '0%';
        }
    });

    // Close menu when clicking on a link in mobile menu
    fullDiv1.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            fullScr.style.top = '-100%';
        }
    });

    // Close menu when clicking on the overlay
    fullScr.addEventListener('click', function(e) {
        if (e.target === fullScr) {
            fullScr.style.top = '-100%';
        }
    });
}



