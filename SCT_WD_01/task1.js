document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }


  let cart = JSON.parse(localStorage.getItem('speedywheels_cart') || '[]');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');


  const addButtons = document.querySelectorAll('.add-to-cart');
  if (addButtons && addButtons.length && cartItemsList && cartTotal) {
    addButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.currentTarget;
        const name = target.dataset.name || 'Item';
        const price = parseFloat(target.dataset.price) || 0;

        cart.push({ name, price });
        saveAndUpdate();
      });
    });

    cartItemsList.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('remove-btn')) {
        const idx = parseInt(e.target.dataset.index, 10);
        if (!Number.isNaN(idx) && idx >= 0 && idx < cart.length) {
          cart.splice(idx, 1);
          saveAndUpdate();
        }
      }
    });

    updateCart();
  }

  function saveAndUpdate() {
    localStorage.setItem('speedywheels_cart', JSON.stringify(cart));
    updateCart();
  }

  function updateCart() {
    cartItemsList.innerHTML = '';

    let total = 0;
    cart.forEach((item, i) => {
      const li = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${item.name} - ₹${item.price}`;
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-btn';
      removeBtn.textContent = 'Remove';
      removeBtn.dataset.index = i;

      li.appendChild(nameSpan);
      li.appendChild(removeBtn);
      cartItemsList.appendChild(li);
      total += Number(item.price) || 0;
    });
    cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
  }
});