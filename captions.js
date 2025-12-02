function showCaption(lang) {
  document.querySelectorAll('.caption-text').forEach(el => el.style.display = 'none');
  document.getElementById('caption-' + lang).style.display = 'block';
}