const toCurrency = (text) => new Intl.NumberFormat('ru-Ru', {
  currency: 'rub',
  style: 'currency'
}).format(text);

const toDate = (date) => new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}).format(new Date(date));

document.addEventListener('DOMContentLoaded', () => {
  const price = document.querySelectorAll('.price');

  price.forEach((el) => {
    el.textContent = toCurrency(el.textContent);
  });

  const date = document.querySelectorAll('.date');

  date.forEach((el) => {
    el.textContent = toDate(el.textContent);
  });
});

const cart = document.querySelector('#cart');

if (cart) {
  cart.addEventListener('click', async (e) => {
    if (e.target.closest('[data-action="delete"]')) {
      const { id } = e.target.dataset;

      const res = await fetch('/cart/remove/' + id, {
        method: 'DELETE',
      });

      const cartResponse = await res.json();

      if (cartResponse.courses.length) {
        const coursesTemplate = cartResponse.courses.map((course) => `
           <tr>
              <td>${course.title}</td>
              <td>${course.count}</td>
              <td>
                <button class="btn btn-small" data-id=${course.id} data-action="delete">Удалить</button> 
              </td>
          </tr>
        `).join('');

        cart.querySelector('tbody').innerHTML = coursesTemplate;
        cart.querySelector('.price').textContent = toCurrency(cartResponse.price);
      } else {
        cart.innerHTML = '<p>Корзина пуста</p>'
      }
    }
  });
}
