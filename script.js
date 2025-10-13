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
