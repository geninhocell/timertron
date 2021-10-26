let linkAbout = document.querySelector('#link-about');

linkAbout.addEventListener('click', function(){
    window.api.send("open-window-about", "some data");
});

// window.api.receive("fromMain", (data) => {
//   console.log(`Received ${JSON.stringify(data)} from main process`);
// });

// window.api.send("toMain", "some data");

