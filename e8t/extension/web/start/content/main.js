console.log(window.location.href);

// var VALUE;

// function getCookies(domain, name) {
//     chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
//         VALUE = cookie.value;
//     });
// }

let name = "BDUSS";
// getCookies("https://pan.baidu.com", "BDUSS")

// console.log(name, VALUE)

const copy2Clipboard = (text) => {
  var id = "clipboard-textarea-hidden-id";
  var existsTextarea = document.getElementById(id);

  if (!existsTextarea) {
    console.log("Creating textarea");
    var textarea = document.createElement("textarea");
    textarea.id = id;
    // Place in top-left corner of screen regardless of scroll position.
    textarea.style.position = "fixed";
    textarea.style.top = 0;
    textarea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textarea.style.width = "1px";
    textarea.style.height = "1px";

    // We don't need padding, reducing the size if it does flash render.
    textarea.style.padding = 0;

    // Clean up any borders.
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.boxShadow = "none";

    // Avoid flash of white box if rendered for any reason.
    textarea.style.background = "transparent";
    document.querySelector("body").appendChild(textarea);
    console.log("The textarea now exists :)");
    existsTextarea = document.getElementById(id);
  } else {
    console.log("The textarea already exists :3");
  }

  existsTextarea.value = text;
  existsTextarea.select();

  try {
    var status = document.execCommand("copy");
    console.log(status);

    if (!status) {
      console.error("Cannot copy text");
    } else {
      console.log("The text is now on the clipboard");
      return "ok";
    }
  } catch (err) {
    console.log("Unable to copy.");
  }
};

// copy2Clipboard(window.location.href)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.type == "hello") sendResponse({ farewell: "goodbye" });
  else if (request.type == "copy" || request.type == "copyOne") {
    let code = copy2Clipboard(request.data);
    if (code == "ok")
      sendResponse({
        type: "copyOk",
      });
    else {
      sendResponse({
        type: "copyError",
      });
    }
  } else sendResponse({}); // snub them.
});
