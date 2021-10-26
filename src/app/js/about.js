var linkClose = document.querySelector('#link-close');

linkClose.addEventListener('click', function(){
  window.api.send('close-window-about');
});
