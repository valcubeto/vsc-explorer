let ctx = {};
(async function init() {
  let response = await fetch('http://localhost:2222/init');
  let data = await response.json();
  ctx = data;
})();
a