// JavaScript Document

// JS for my Nav
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



// JS for my cones / tubs 
document.querySelectorAll('.cone-card').forEach(card => {
  card.addEventListener('click', () => {
    alert(`You selected: ${card.querySelector('h3').innerText}`);
  });
});



// JS for my single flavour
const flavourCards = document.querySelectorAll('.flavour-card');

flavourCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove "selected" from all cards
    flavourCards.forEach(c => c.classList.remove('selected'));

    // Add "selected" only to the clicked one
    card.classList.add('selected');
  });
});



// Js for my double flavour choices/custom flavour

const doubleCards = document.querySelectorAll('.double-card');
const customDouble = document.querySelector('.custom-double');

doubleCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('selected');
  });
});

customDouble.addEventListener('click', () => {
  customDouble.classList.toggle('selected');
});
