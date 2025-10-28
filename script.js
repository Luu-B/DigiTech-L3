$(document).ready(function(){
	
	$('.mobile-icon').click( function() {
		$('nav ul').toggleClass("showing");

	});

});

//Nav shrink when scrolling
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

// Order builder system
let currentIceCream = {};
let allOrders = [];

// Selectors
const coneCards = document.querySelectorAll('.cone-card');
const flavourCards = document.querySelectorAll('.flavour-card');
const doubleCards = document.querySelectorAll('.double-card');
const toppingCards = document.querySelectorAll('.topping-card');
const orderItems = document.getElementById('order-items');
const checkoutSection = document.getElementById('checkout');
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');

// Ask for size input with validation and cancel option
function askForSize(coneType) {
  let size = "";
  while (true) {
    size = prompt(`You selected ${coneType}. Enter size: Small (S) or Normal (N). Type 'cancel' to stop.`);
    if (!size) continue;
    size = size.trim().toLowerCase();
    if (size === "s" || size === "small") return "small";
    if (size === "n" || size === "normal") return "normal";
    if (size === "cancel") {
      alert("Selection cancelled.");
      return null;
    }
    alert("Invalid input. Please enter S/small, N/normal, or cancel.");
  }
}

// Cone/Tub
coneCards.forEach(card => {
  card.addEventListener('click', () => {
    coneCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    const name = card.querySelector('h3').innerText;
    const size = name === 'Takeaway Tub' ? 'One Size' : askForSize(name);
	if (!size) return;

    currentIceCream = {
      cone: name,
      size: size,
      flavours: [],
      toppings: [],
      price: calculateBasePrice(name, size)
    };
    alert(`You selected a ${size} ${name}`);
	updateOrderSummary();
  });
});

// Flavours
flavourCards.forEach(card => {
  card.addEventListener('click', () => {
    const flavour = card.querySelector('h3').innerText;
    const size = currentIceCream.size;

    if (!size) {
      alert("Please select a cone/tub first!");
      return;
    }

    // Check flavour rules
    if (flavour === 'Plain Vanilla' && currentIceCream.flavours.some(f => f !== 'Plain Vanilla')) {
      alert("Plain Vanilla cannot be mixed with fruit flavours!");
      return;
    }
    if (currentIceCream.flavours.includes('Plain Vanilla') && flavour !== 'Plain Vanilla') {
      alert("Plain Vanilla cannot be mixed with fruit flavours!");
      return;
    }

    if (size === 'small' && currentIceCream.flavours.length >= 1) {
      alert("Small size can only have 1 flavour!");
      return;
    }
    if (size === 'normal' && currentIceCream.flavours.length >= 2) {
      alert("Normal size can have up to 2 flavours or a double flavour.");
      return;
    }

    card.classList.toggle('selected');
    if (currentIceCream.flavours.includes(flavour)) {
      currentIceCream.flavours = currentIceCream.flavours.filter(f => f !== flavour);
    } else {
      currentIceCream.flavours.push(flavour);
    }
	
	updateOrderSummary();
  });
});

// Double flavour
doubleCards.forEach(card => {
  card.addEventListener('click', () => {
    if (currentIceCream.size !== 'normal' && currentIceCream.cone !== 'Takeaway Tub') {
      alert("Double flavours are only for normal size or Takeaway Tub!");
      return;
    }
    doubleCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    currentIceCream.flavours = [card.querySelector('p').innerText];
	
	updateOrderSummary();
  });
});

// Toppings
toppingCards.forEach(card => {
  card.addEventListener('click', () => {
    const topping = card.querySelector('h3').innerText;
    card.classList.toggle('selected');

    if (currentIceCream.toppings.includes(topping)) {
      currentIceCream.toppings = currentIceCream.toppings.filter(t => t !== topping);
    } else {
      currentIceCream.toppings.push(topping);
	}
	//this is to replace the price every time you select/deselect toppings. instead of the prices going abnormally high. 
	const basePrice = calculateBasePrice(currentIceCream.cone, currentIceCream.size);
    let toppingTotal = 0;
    currentIceCream.toppings.forEach(t => toppingTotal += getToppingPrice(t));
    currentIceCream.price = basePrice + toppingTotal;
	
	updateOrderSummary(); 
  });
});

// Helper to display order in sidebar
function updateOrderSummary() {
  orderItems.innerHTML = "";
  if (Object.keys(currentIceCream).length) {
    const div = document.createElement('div');
    div.classList.add('order-item');
    div.innerHTML = `
      <strong>${currentIceCream.cone}</strong><br>
      Size: ${currentIceCream.size}<br>
      Flavours: ${currentIceCream.flavours.join(', ') || 'None'}<br>
      Toppings: ${currentIceCream.toppings.join(', ') || 'None'}<br>
      Price: $${currentIceCream.price.toFixed(2)}
    `;
    orderItems.appendChild(div);
  }

  allOrders.forEach((ice, index) => {
    const div = document.createElement('div');
    div.classList.add('order-item');
    div.innerHTML = `
      <strong>Ice Cream ${index + 1}</strong><br>
      ${ice.size} ${ice.cone}<br>
      Flavours: ${ice.flavours.join(', ') || 'None'}<br>
      Toppings: ${ice.toppings.join(', ') || 'None'}<br>
      Price: $${ice.price.toFixed(2)}
    `;
    orderItems.appendChild(div);
  });
}

// Pricing
function calculateBasePrice(cone, size) {
  const prices = {
    "Waffle Cone": { small: 5, normal: 6 },
    "Plain Cone": { small: 4, normal: 5 },
    "Tub": { small: 4, normal: 5 },
    "Takeaway Tub": { "One Size": 6 }
  };
  return prices[cone][size] || prices[cone]["One Size"];
}

function getToppingPrice(name) {
  return name.includes("Flake") ? 0.6 : 0.3;
}

// Checkout / add another
document.getElementById('checkout-btn').addEventListener('click', showCheckout);

//Add another ice cream button functionality
document.getElementById('add-another-btn').addEventListener('click', () => {
  if (Object.keys(currentIceCream).length) {
    allOrders.push(currentIceCream);               // Save current ice cream
    currentIceCream = {};                           // Reset for next build
    document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected')); // Unselect UI
    updateOrderSummary();                           // Update sidebar
    alert("Current ice cream added! Start building your next one."); // Notify user
  } else {
    alert("You haven't built an ice cream yet!");  // Handle empty build
  }
});

// Checkout display
function showCheckout() {
  if (Object.keys(currentIceCream).length) {
    allOrders.push(currentIceCream);
    currentIceCream = {};
  }
  updateOrderSummary();

  checkoutItems.innerHTML = "";
  let total = 0;
  allOrders.forEach((ice, index) => {
    let discount = 0;
    if (ice.flavours.includes('Plain Vanilla')) {
      discount = 0.5;
    }
    const priceAfterDiscount = ice.price - discount;
    total += priceAfterDiscount;

    const div = document.createElement('div');
    div.classList.add('checkout-item');
    div.innerHTML = `
      <strong>Ice Cream ${index + 1}</strong><br>
      ${ice.size} ${ice.cone}<br>
      Flavours: ${ice.flavours.join(', ')}<br>
      Toppings: ${ice.toppings.join(', ') || 'None'}<br>
      ${discount > 0 ? `<em>Plain Vanilla Discount: -$0.50</em><br>` : ""}
      <strong>Price: $${priceAfterDiscount.toFixed(2)}</strong>
    `;
    checkoutItems.appendChild(div);
  });

  checkoutTotal.innerText = `Total: $${total.toFixed(2)}`;
  checkoutSection.classList.add('visible');
  window.scrollTo(0, checkoutSection.offsetTop);
}

// Back to builder button
document.getElementById('back-to-builder').addEventListener('click', () => {
  checkoutSection.classList.remove('visible');
});

// Confirming order
document.getElementById('confirm-order').addEventListener('click', () => {
  alert("Thank you for your order!");
  allOrders = [];
  updateOrderSummary();
  checkoutSection.classList.remove('visible');
});


