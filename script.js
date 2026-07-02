const form = document.getElementById('orderForm');
const summary = document.getElementById('summary');
const errorBox = document.getElementById('formError');
const thankYouMessage = document.getElementById('thankYouMessage');

function updateSummary() {
  const selectedItems = document.querySelectorAll('.item-checkbox:checked');
  if (selectedItems.length === 0) {
    summary.innerHTML = 'No items selected yet.';
    return;
  }

  let items = [];
  let grandTotal = 0;

  selectedItems.forEach((checkbox) => {
    const parent = checkbox.closest('.menu-item');
    const qtyInput = parent.querySelector('.qty-box');
    const qty = parseInt(qtyInput.value, 10) || 1;
    const price = parseInt(checkbox.dataset.price, 10);
    const subtotal = price * qty;
    grandTotal += subtotal;
    items.push(`${checkbox.dataset.name} x${qty} = ${subtotal} Rs`);
  });

  summary.innerHTML = `
    <ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>
    <strong>Grand Total: ${grandTotal} Rs</strong>
  `;
}

document.querySelectorAll('.item-checkbox').forEach((checkbox) => {
  checkbox.addEventListener('change', updateSummary);
});

document.querySelectorAll('.qty-box').forEach((input) => {
  input.addEventListener('input', updateSummary);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  errorBox.textContent = '';
  thankYouMessage.textContent = '';

  const name = document.getElementById('name').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const address = document.getElementById('address').value.trim();

  if (name.length < 2) {
    errorBox.textContent = 'Please enter your name.';
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    errorBox.textContent = 'Please enter a valid 10-digit mobile number.';
    return;
  }

  if (address.length < 5) {
    errorBox.textContent = 'Please enter your address.';
    return;
  }

  const selectedItems = document.querySelectorAll('.item-checkbox:checked');
  if (selectedItems.length === 0) {
    errorBox.textContent = 'Please select at least one item.';
    return;
  }

  thankYouMessage.textContent = `Thank you, ${name}! Your order has been placed.`;
  form.reset();
  updateSummary();
});
