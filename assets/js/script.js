//ChatBubble Animation

setTimeout(() => {
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
        (letter !== " " || array[i + 1] !== " ") &&
        letter != "\n" &&
        letter != ""
    );
    return filteredArray;
  }

  let typeSpeed = 30;
  let isTyping = false;
  function type(chatNumber) {
    isTyping = true;

    if (document.querySelector(".chat-bubble p")) {
      document.querySelector(".chat-bubble p").remove();
    }

    newP = document.createElement("p");
    chatBubble.insertBefore(newP, chatBubble.firstChild);

    letters = textToArray(chatTexts[chatNumber].innerHTML);

    let i = 0;
    letterAdder = setInterval(() => {
      letter = letters[i];
      newP.innerHTML = newP.innerHTML + letter;
      i++;
      document.querySelector(".chat-bubble").click()
      if (i == letters.length - 1) {
        clearInterval(letterAdder);
        isTyping = false;
      }
    }, typeSpeed);

    // setTimeout(() => {
    //   clearInterval(letterAdder);
    //   isTyping = false;
    // }, typeSpeed * letters.length);
    // letters.forEach((letter, i) => {
    //   setTimeout(function () {
    //     newP.innerHTML = newP.innerHTML + letter;
    //     if (i == letters.length - 1) {
    //       isTyping = false;
    //     }
    //   }, typeSpeed * i);
    // });
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
}, 3000);

// Review caroussel

// vars
("use strict");
var testim = document.getElementById("testim"),
  testimDots = Array.prototype.slice.call(
    document.getElementById("testim-dots").children
  ),
  testimContent = Array.prototype.slice.call(
    document.getElementById("testim-content").children
  ),
  testimLeftArrow = document.getElementById("left-arrow"),
  testimRightArrow = document.getElementById("right-arrow"),
  testimSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, testimSpeed);
  }

  testimLeftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });

  testimRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide((currentSlide = testimDots.indexOf(this)));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  });

  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);

    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {
      return;
    }
  });
};

// Activate mobile menu
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-list");

const menuActivate = function () {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
};

hamburger.addEventListener("click", menuActivate);
menu.addEventListener("click", menuActivate);

// Auto highlight active section

// newSpan = document.createElement("span");
// newSpan.style.position = "fixed";
// newSpan.style.backgroundColor = "red";
// newSpan.style.height = "2px";
// newSpan.style.width = "100%";
// newSpan.style.top = "50%";
// newSpan.style.left = "0";
// document.querySelector("body").appendChild(newSpan);

const options = {
  // root: document.querySelector("#scrollArea"),
  rootMargin: "-50% 0px",
  // threshold: 1.0,
};

const observer = new IntersectionObserver((entries) => {
  const sectionList = [...sections];
  const linkList = [...document.querySelectorAll(".nav-link")];
  for (const entry of entries) {
    if (entry.isIntersecting) {
      linkList.forEach((link) => {
        link.classList.remove("active");
      });
      linkList[sectionList.indexOf(entry.target)].classList.add("active");
    }
  }
  if (!document.querySelector(".nav-link").classList.contains("active")) {
    document.querySelector(".scroll-top").classList.add("visible");
  } else if (
    document.querySelector(".scroll-top").classList.contains("visible")
  ) {
    document.querySelector(".scroll-top").classList.remove("visible");
  }
}, options);

const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.style.overflow = "hidden";
  setTimeout(() => {
    document.documentElement.style.overflow = "visible";

    document.querySelector(".loading-screen").classList.add("invisible");
    window.scrollTo(0, 0);
  }, 3000);
});
