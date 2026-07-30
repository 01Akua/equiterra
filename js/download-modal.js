/**
 * Equiterra — Project brief download modal.
 * Opens a lead-capture modal from [data-open-modal], validates the form,
 * and stores the submission locally (eq_leads) as a placeholder until a
 * real form backend and per-project PDF are wired up.
 */
(function () {
  'use strict';

  function openModal(modal) {
    modal.classList.add('is-open');
    document.body.classList.add('nav-open');
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function saveLead(record) {
    try {
      const key = 'eq_leads';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(record);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) { /* localStorage unavailable — non-blocking */ }
  }

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-open-modal]');
    if (trigger) {
      const modal = document.getElementById(trigger.getAttribute('data-open-modal'));
      if (modal) openModal(modal);
    }
    if (e.target.matches('[data-close-modal]') || e.target.classList.contains('eq-modal-overlay')) {
      const overlay = e.target.closest('.eq-modal-overlay');
      if (overlay) closeModal(overlay);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.eq-modal-overlay.is-open').forEach(closeModal);
    }
  });

  document.querySelectorAll('.eq-modal-overlay form[data-brief-form]').forEach(function (form) {
    const errorEl = form.querySelector('.eq-modal__error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const org = form.querySelector('[name="org"]').value.trim();
      const interest = form.querySelector('[name="interest"]').value;

      if (!name || !email || !isValidEmail(email)) {
        if (errorEl) errorEl.classList.add('is-visible');
        return;
      }
      if (errorEl) errorEl.classList.remove('is-visible');

      saveLead({
        project: form.getAttribute('data-project') || 'unknown',
        name: name, email: email, org: org, interest: interest,
        at: new Date().toISOString(),
      });

      const modal = form.closest('.eq-modal');
      const nameEl = modal.querySelector('[data-success-name]');
      if (nameEl) nameEl.textContent = name.split(' ')[0];
      modal.classList.add('is-success');
    });
  });
})();
