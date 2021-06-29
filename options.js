// Cross browser faciltiy
window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

// save options given by user to chrome storage
function saveOption() {
  // fetch options entered by users
  let sound = document.getElementById("sound").value;
  let type = document.getElementById("type").value;

  // save all options to chrome storage
  // display save to users
  // retrive back the displayed text from user
  browser.storage.sync.set(
    {
      sound: sound,
      type: type,
    },
    function () {
      let status = document.getElementById("status");
      status.textContent = "Options are saved :)";
      setTimeout(function () {
        status.textContent = " ";
      }, 750);
    }
  );
}

// restore options saved by user from chrome storage
function restoreOption() {
  browser.storage.sync.get(
    {
      sound: "tts",
      type: "detail_result",
    },
    function (items) {
      document.getElementById("sound").value = items.sound;
      document.getElementById("type").value = items.type;
    }
  );
}

//as dom is loaded called restore function to display previous store options
document.addEventListener("DOMContentLoaded", restoreOption);

//When user clicked on save buttion , sabe options to chrome storgage
document.getElementById("save_input").addEventListener("click", saveOption);

function linkedIn(){
  browser.tabs.create({url: 'https://www.linkedin.com/in/atharva-kothawade-6a00a6190/'});
}

document.getElementById('linkedIn').addEventListener('click', linkedIn);
