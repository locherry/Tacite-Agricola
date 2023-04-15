let chatBubble = document.querySelector(".chat-bubble");

let chatTexts = document.querySelectorAll(".chat-bubble p-data");

function textToArray(text) {
  array = text.split("").map((e, i) => {
    if (e != "<" && text[i + 1] != ">" && text[i + 2] != ">" && e != ">") {
      return e;
    } else if (
      e == "<" &&
      text[i + 1] == "b" &&
      text[i + 2] == "r" &&
      text[i + 3] == ">"
    ) {
      return "<br>";
    }
    return "";
  });
  let filteredArray = array.filter(
    (letter, i) =>
      (letter !== " " || array[i + 1] !== " ") && letter != "\n" && letter != ""
  );
  return filteredArray;
}

let typeSpeed = 20;
let isTyping = false;
function type(chatNumber) {
  isTyping = true;

  if (document.querySelector(".chat-bubble p")) {
    document.querySelector(".chat-bubble p").remove();
  }

  newP = document.createElement("p");
  chatBubble.insertBefore(newP, chatBubble.firstChild);

  letters = textToArray(chatTexts[chatNumber].innerHTML);
  letters.forEach((letter, i) => {
    setTimeout(function () {
      newP.innerHTML = newP.innerHTML + letter;
      if (i == letters.length - 1) {isTyping = false};
    }, typeSpeed * i);
  });
}
type(0);

let chatNumber = 0;

function changeText(number) {
  chatNumber += number;
  type(chatNumber);
}

nextBtn = document.querySelector("button.next");
prevBtn = document.querySelector("button.previous");
nextBtn.addEventListener("click", (e) => {
  if (!isTyping) {
    chatNumber += 1;
    type(chatNumber);
    if (chatNumber == chatTexts.length - 1) {
      nextBtn.setAttribute("disabled", "");
    }
    if (prevBtn.hasAttribute("disabled")) {
      prevBtn.removeAttribute("disabled");
    }
  }
});

prevBtn.addEventListener("click", (e) => {
  if (!isTyping) {
    chatNumber -= 1;
    type(chatNumber);
    if (chatNumber == 0) {
      prevBtn.setAttribute("disabled", "");
    }
    if (nextBtn.hasAttribute("disabled")) {
      nextBtn.removeAttribute("disabled");
    }
  }
});
// document.querySelector('button.previous').addEventListener('click', changeText(-1))
