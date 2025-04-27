const countdown = () => {
    const countDate = new Date("May 17, 2025 16:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.getElementById('days').innerText = textDay.toString().padStart(2, '0');
    document.getElementById('hours').innerText = textHour.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = textMinute.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = textSecond.toString().padStart(2, '0');
};

setInterval(countdown, 1000);

// Scroll Animation + Button Wackeln
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'footer') {
        document.getElementById('rsvp-button').classList.add('wobble');
        }
    }
    });
}, { threshold: 0.3 });

observer.observe(document.getElementById('header'));
observer.observe(document.getElementById('details'));
observer.observe(document.getElementById('footer'));

// Konfetti erstellen
const colors = ['#FF5252', '#FFEB3B', '#69F0AE', '#40C4FF', '#E040FB'];
const confettiContainer = document.getElementById('confettis');

for (let i = 0; i < 50; i++) {
    let confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (3 + Math.random() * 5) + 's';
    confetti.style.animationDelay = Math.random() * 5 + 's';
    confettiContainer.appendChild(confetti);
}