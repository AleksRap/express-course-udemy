const convertToPriceFormat = (text) => new Intl.NumberFormat('ru-Ru', {
  currency: 'rub',
  style: 'currency'
}).format(text);

document.addEventListener('DOMContentLoaded', () => {
  const price = document.querySelectorAll('.price');

  price.forEach((el) => {
    el.textContent = convertToPriceFormat(el.textContent);
  });
});

const card = document.querySelector('#card');

if (card) {
  card.addEventListener('click', async (e) => {
    if (e.target.closest('[data-action="delete"]')) {
      const { id } = e.target.dataset;

      const res = await fetch('/card/remove/' + id, {
        method: 'DELETE',
      });

      const cardResponse = await res.json();

      if (cardResponse.courses.length) {
        const coursesTemplate = cardResponse.courses.map((course) => `
           <tr>
              <td>${course.title}</td>
              <td>${course.count}</td>
              <td>
                <button class="btn btn-small" data-id=${course.id} data-action="delete">Удалить</button> 
              </td>
          </tr>
        `).join('');

        card.querySelector('tbody').innerHTML = coursesTemplate;
        card.querySelector('.price').textContent = convertToPriceFormat(cardResponse.price);
      } else {
        card.innerHTML = '<p>Корзина пуста</p>'
      }
    }
  });
}
