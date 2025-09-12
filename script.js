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

doubleCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove 'selected' from all cards first
    doubleCards.forEach(c => c.classList.remove('selected'));
    // Add 'selected' only to the clicked card
    card.classList.add('selected');
  });
});


// JS for my CUSTOM double flavour 
const flavourCards = document.querySelectorAll('.flavour-card');
let selectedFlavours = [];

flavourCards.forEach(card => {
  card.addEventListener('click', () => {
    const flavour = card.dataset.flavour;

    if (selectedFlavours.includes(flavour)) {
      // Deselect if already selected
      selectedFlavours = selectedFlavours.filter(f => f !== flavour);
      card.classList.remove('selected');
    } else {
      if (selectedFlavours.length < 2) {
        selectedFlavours.push(flavour);
        card.classList.add('selected');
      } else {
        alert("You can only select up to 2 flavours!");
      }
    }
  });
});

function continueSelection() {
  if (selectedFlavours.length === 0) {
    alert("Please select at least 1 flavour.");
    return;
  }

  // Save selection to localStorage
  localStorage.setItem("customDouble", selectedFlavours.join(" + "));

  // Redirect back to main page at double flavour section
  window.location.href = "index.html#double-flavours";
}

document.addEventListener("DOMContentLoaded", () => {
  const customDouble = document.querySelector(".custom-double");
  const savedCustom = localStorage.getItem("customDouble");

  if (savedCustom && customDouble) {
    customDouble.innerHTML = `<p>Custom Double Flavour: ${savedCustom}</p>`;
    customDouble.classList.add("selected");
  }
});

