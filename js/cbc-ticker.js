(function () {
  var priceEl = document.getElementById('cbcPrice');
  if (!priceEl) return;
  var deltaEl = document.getElementById('cbcDelta');
  var updatedEl = document.getElementById('cbcUpdated');
  var base = 75.36;

  function fmtTime(d) {
    return d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function tick() {
    var change = (Math.random() - 0.5) * 0.6;
    base = Math.max(40, base + change);
    priceEl.textContent = '€' + base.toFixed(2);
    if (deltaEl) {
      deltaEl.textContent = (change >= 0 ? '▲ ' : '▼ ') + Math.abs(change).toFixed(2);
      deltaEl.className = 'eq-ticker__delta ' + (change >= 0 ? 'up' : 'down');
    }
    if (updatedEl) updatedEl.textContent = fmtTime(new Date());
  }

  tick();
  setInterval(tick, 4000);
})();
