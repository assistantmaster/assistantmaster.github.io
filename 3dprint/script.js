function toggleMenu() {
    // Hamburger-Icon umschalten
    const burger = document.querySelector('.burger-6');
    burger.classList.toggle('is-closed');

    // Menüfeld umschalten
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}
function adresse() {
    document.getElementById("adresse").innerHTML = '<a onclick="zensieren()" href="javascript:void(0);">Feldrosenweg 21 <br> 50259 Pulheim</a>'
}
function zensieren() {
    document.getElementById("adresse").innerHTML = '<a onclick="adresse()" href="javascript:void(0);">Adresse: <br>********</a>'
}