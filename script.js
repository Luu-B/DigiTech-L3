// JavaScript Document
// JS for my cones / tubs 

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.padding = '5px 30px';
    nav.style.height = '50px';
  } else {
    nav.style.padding = '10px 30px';
    nav.style.height = '60px';
  }
});

document.querySelectorAll('.cone-card').forEach(card => {
  card.addEventListener('click', () => {
    alert(`You selected: ${card.querySelector('h3').innerText}`);
  });
});
// JS for my single flavour
const flavourCards = document.querySelectorAll('.flavour-card');

flavourCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('selected');
  });
});
