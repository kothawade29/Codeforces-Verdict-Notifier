// this recieve message and display the notification
"use strict";
var listening = [];
// For cross-browser compatibility
window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

// For cross-browser Text to Speech
var speak = function (text) {
  if (browser.tts) {
    browser.tts.speak(text);
  } else {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
};

/**
 * Handles messages sent from content-scripts running on Codeforces and AtCoder
 * @param {Object} request Contains verdict, time taken, memory consumed by the submission
 * @param {*} sender
 * @param {*} sendResponse
 */

// function called when message is sent from codeforces.js
function handleMessage(request, sender, sendResponse) {
  let verdict = request.verdict;
  let time = request.time;
  let mem = request.mem;
  let id = request.id;
  let score = request.score;
  notify(verdict, time, mem, id, score);
}

/**
 * Notifies about the result of the submission
 * @param {string} verdict The result of the submission.
 * @param {*} score The score obtained through the submission (optional)
 * @param {*} time The time taken in code execution (optional)
 * @param {*} mem The memory required in code execution (optional)
 * @param {string} id The id of the submission (optional)
 */

// this will display the message on user screen
function notify(verdict, time, mem, id, score) {
  let details = [];
  if (score != null && typeof score != "undefined") {
    details.push("Solution Score " + score);
  }
  if (time != null && typeof time != "undefined") {
    details.push("Time required" + time);
  }
  if (mem != null && typeof mem != "undefined") {
    details.push("Memory required" + mem);
  }
  details = details.join("\n");
  browser.storage.sync.get(
    {
      sound: "tts",
      type: "all",
    },
    function (items) {
      let sound = items.sound;
      let type = items.type;
      if (sound === "tts") {
        let message = verdict;
        if (type === "all") {
          message += "\n" + details;
        }
        speak(message);
      } else {
        if (typeof id == "undefined") {
          id = Math.random().toString(36);
        }
        browser.notifications.create(id, {
          type: "basic",
          iconUrl: "vnn_icon.png",
          title: verdict,
          message: details,
        });
      }
    }
  );
}
browser.runtime.onMessage.addListener(handleMessage);
