//Nav JS
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

// Single Flavour
const flavourCards = document.querySelectorAll('.flavour-card');

flavourCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove "selected" from all cards
    flavourCards.forEach(c => c.classList.remove('selected'));

    // Add "selected" only to the clicked one
    card.classList.add('selected');
  });
});


// Double Flavour 
const doubleCards = document.querySelectorAll('.double-card');

doubleCards.forEach(card => {
  card.addEventListener('click', () => {
    doubleCards.forEach(c => c.classList.remove('selected')); // Remove from all
    card.classList.add('selected'); // Add to clicked one
  });
});
