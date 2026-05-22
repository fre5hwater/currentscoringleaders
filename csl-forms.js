/* ============================================================================
   CSL — Shared form submission helper (Formspree backend)
   ----------------------------------------------------------------------------
   POSTs form data as JSON to a Formspree endpoint. Handles success/error
   states, spinner, honeypot, and graceful messaging.

   USAGE
     <form onsubmit="return CSL.submitForm(event, 'booking')">
       ...
       <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"
              class="honeypot" aria-hidden="true">
       <button type="submit">Send</button>
     </form>

   SETUP
     Formspree endpoint is configured below. In Formspree dashboard, keep
     notifications pointed to currentscoringleaders@gmail.com or the preferred
     CSL inbox.
   ========================================================================= */

var CSL_FORMSPREE_ID = 'mgorbnyd';
var CSL_BACKEND_URL  = 'https://formspree.io/f/' + CSL_FORMSPREE_ID;

(function () {
  var CSL = window.CSL || (window.CSL = {});

  CSL.submitForm = function (event, formType) {
    if (event && event.preventDefault) event.preventDefault();
    var form = event.target.closest('form') || event.target;
    var data = {};
    var elements = Array.prototype.slice.call(form.elements);
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (!el.name) continue;
      if (el.type === 'checkbox') {
        if (!data[el.name]) data[el.name] = [];
        if (el.checked) data[el.name].push(el.value || 'yes');
      } else if (el.type === 'radio') {
        if (el.checked) data[el.name] = el.value;
      } else {
        data[el.name] = el.value;
      }
    }
    // Flatten checkbox arrays
    var keys = Object.keys(data);
    for (var j = 0; j < keys.length; j++) {
      var k = keys[j];
      if (Array.isArray(data[k])) data[k] = data[k].join(', ');
    }
    // Synthesize 'name' from split-name fields when a form only collects first/last
    if (!data.name) {
      var first = data.first_name || data.firstname || '';
      var last  = data.last_name  || data.lastname  || '';
      var joined = (first + ' ' + last).trim();
      if (joined) data.name = joined;
    }
    // Friendly aliases that align with the Apps Script sheet headers
    if (data.genre && !data.genres)       data.genres       = data.genre;
    if (data.references && !data.referrer) data.referrer    = data.references;
    if (data.notes && !data.additional)   data.additional   = data.notes;
    return CSL.submitData(data, formType, form);
  };

  CSL.submitData = function (data, formType, form) {
    data.form_type = formType;
    var btn = form && form.querySelector('[type="submit"]');
    var origBtnHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; Sending...';
    }

    if (!CSL_FORMSPREE_ID || CSL_FORMSPREE_ID === 'FORM_ID_NOT_CONFIGURED') {
      console.error('CSL form backend not configured. Edit CSL_FORMSPREE_ID in csl-forms.js.');
      _showMsg(form, 'Form backend not configured yet. Email currentscoringleaders@gmail.com directly.', 'error');
      if (btn) { btn.disabled = false; btn.innerHTML = origBtnHtml; }
      return false;
    }

    // Honeypot check — if filled, silently "succeed" without sending.
    if (data._gotcha) {
      _showMsg(form, 'Got it — check your email for a confirmation. We reply within 48 hours.', 'success');
      if (form && form.reset) form.reset();
      if (btn) { btn.disabled = false; btn.innerHTML = origBtnHtml; }
      return false;
    }

    fetch(CSL_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.ok) {
        _showMsg(form, 'Got it — check your email for a confirmation. We reply within 48 hours.', 'success');
        if (form && form.reset) form.reset();
      } else {
        return response.json().then(function (json) {
          var msg = (json && json.errors && json.errors.length)
            ? json.errors.map(function (e) { return e.message; }).join(' ')
            : 'Submission failed (' + response.status + '). Please email currentscoringleaders@gmail.com directly.';
          _showMsg(form, msg, 'error');
        }).catch(function () {
          _showMsg(form, 'Submission failed. Please email currentscoringleaders@gmail.com directly.', 'error');
        });
      }
    }).catch(function (err) {
      console.error('CSL submit error:', err);
      _showMsg(form, 'Network error — please email currentscoringleaders@gmail.com directly.', 'error');
    }).then(function () {
      if (btn) { btn.disabled = false; btn.innerHTML = origBtnHtml; }
    });
    return false;
  };

  function _showMsg(form, text, kind) {
    if (!form) { alert(text); return; }
    var box = form.querySelector('.csl-form-msg');
    if (!box) {
      box = document.createElement('div');
      box.className = 'csl-form-msg';
      box.style.cssText = 'margin-top:1rem;padding:1rem 1.25rem;border-radius:10px;font-size:0.88rem;line-height:1.5;';
      form.appendChild(box);
    }
    if (kind === 'success') {
      box.style.background = 'rgba(16,185,129,0.12)';
      box.style.border = '1px solid rgba(16,185,129,0.35)';
      box.style.color = '#10b981';
      box.innerHTML = '<i class="fas fa-check-circle"></i>&nbsp; ' + text;
    } else {
      box.style.background = 'rgba(239,68,68,0.12)';
      box.style.border = '1px solid rgba(239,68,68,0.35)';
      box.style.color = '#ef4444';
      box.innerHTML = '<i class="fas fa-exclamation-triangle"></i>&nbsp; ' + text;
    }
  }
})();
