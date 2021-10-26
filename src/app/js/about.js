let linkClose = document.querySelector('#link-close');
let linkGithub = document.querySelector('#link-github');

linkClose.addEventListener('click', function(){
  window.api.send('close-window-about');
});

linkGithub.addEventListener('click', function(){
  window.api.send('open-link-github-external');
});
