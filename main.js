// fun js

document.getElementById("copyButton").addEventListener("click", copier);

function copier() {
    var txt = document.getElementById("textBox");
    txt.select();
    txt.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(txt.value);

    document.getElementById("response").innerHTML = "Text copied to clipboard!";
}

document.getElementById("clear").addEventListener("click", clearFunc);

function clearFunc() {
    document.getElementById("textBox").value = '';
    document.getElementById("response").textContent = '';
    chrome.storage.local.clear();
}

document.getElementById("tts").addEventListener("click", ttss);

function ttss() {
    var help = document.getElementById("textBox").value;
    if (!"speechSynthesis" in window) {
        alert("Your system does not support Text To Speech");
      }
      var msg = new SpeechSynthesisUtterance();
      msg.rate = 1.0;
      msg.pitch = 0;
      msg.text = help;
      msg.lang = 'en';
      window.speechSynthesis.speak(msg);
}

document.getElementById("search").addEventListener("click", goog);

function goog() {
    alert("Have a Nice Day!");
    window.close();
}

function saver() {
    const text = document.getElementById("textBox").value;
    chrome.storage.local.set({ "savedText": text }, function() {
        console.log('Text saved to local storage: ' + text);
    });
}

// to display saved text when the extension loads

function startUp() {
    chrome.storage.local.get("savedText", function(data) {
        if (data.savedText) {
            document.getElementById("textBox").value = data.savedText;
            console.log('Retrieved saved text from local storage: ' + data.savedText);
        } else {
            console.log('No saved text found in local storage');
        }
    });
    
}

document.getElementById("saveButton").addEventListener("click", saver);

document.addEventListener('DOMContentLoaded', startUp);


