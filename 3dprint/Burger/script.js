function toggleMenu() {
    // Hamburger-Icon umschalten
    const burger = document.querySelector('.burger-6');
    burger.classList.toggle('is-closed');

    // Menüfeld umschalten
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}