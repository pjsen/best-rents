// Best Rents, Inc. — site scripts (no dependencies)

// Mobile menu
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // Equipment dropdown (click/tap support; hover handled in CSS on desktop)
  document.querySelectorAll('.nav-dd > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = btn.parentElement;
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dd.open').forEach(function (dd) {
      dd.classList.remove('open');
      dd.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  });
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Quote request form — submits to the URL in the form's action attribute
// (Formspree by default) and shows a thank-you message without leaving the page.
(function () {
  var form = document.getElementById('quote-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var btn = form.querySelector('button[type=submit]');

  // Pickup date can't be before delivery date
  var del = form.querySelector('#delivery-date');
  var pick = form.querySelector('#pickup-date');
  var today = new Date().toISOString().slice(0, 10);
  if (del) del.min = today;
  if (del && pick) {
    pick.min = today;
    del.addEventListener('change', function () { pick.min = del.value || today; });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      status.className = 'form-status err';
      status.textContent = 'This form is not connected yet. Please call 305-891-2399 or email info@bestrentsinc.com.';
      return;
    }
    btn.disabled = true;
    var label = btn.textContent;
    btn.textContent = 'Sending…';
    status.className = 'form-status';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        document.getElementById('quote-card').innerHTML = document.getElementById('success-tpl').innerHTML;
        window.scrollTo({ top: document.getElementById('quote-card').offsetTop - 110, behavior: 'smooth' });
      } else {
        return res.json().then(function (data) {
          throw new Error((data && data.errors && data.errors.map(function (x) { return x.message; }).join(', ')) || 'Submission failed');
        });
      }
    }).catch(function () {
      status.className = 'form-status err';
      status.textContent = 'Sorry, something went wrong sending your request. Please call 305-891-2399 or email info@bestrentsinc.com.';
      btn.disabled = false;
      btn.textContent = label;
    });
  });
})();
