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

// Ordering System

// Generate ice cream boxes based on dropdown
function generateIcecreamBoxes() {
  const number = parseInt(document.getElementById('quantity').value);
  const grid = document.getElementById('icecream-grid');
  grid.innerHTML = '';

  for (let i = 1; i <= number; i++) {
    const box = document.createElement('div');
    box.classList.add('icecream-box');
    box.textContent = `Ice Cream ${i}`;
    box.addEventListener('click', () => toggleSelect(box));
    grid.appendChild(box);
  }
}

// Toggle selection style
function toggleSelect(box) {
  box.classList.toggle('selected');
}

// Finish & checkout validation
function finishOrder() {
  const selected = document.querySelectorAll('.icecream-box.selected');
  if (selected.length === 0) {
    alert('Please select at least one ice cream before checkout!');
    return;
  }

  const total = selected.length * 6; // Example pricing
  alert(`You selected ${selected.length} ice creams.\n Estimated Total: $${total}`);
}

// Automatically generate initial box on page load
document.addEventListener('DOMContentLoaded', generateIcecreamBoxes);
