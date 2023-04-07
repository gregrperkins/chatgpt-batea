document
  .querySelectorAll('.overflow-hidden')
  .forEach((el) => {
    el.className = el.className.replace(/\boverflow-hidden\b/g, '');
  });

document
  .querySelectorAll('.absolute')
  .forEach((el) => {
    el.className = el.className.replace(/\babsolute\b/g, '');
  });

document.querySelectorAll('nav').forEach((el) => {
  el.closest('.bg-gray-900').remove();
});

document.querySelectorAll('form').forEach((el) => {
  el.remove();
});
