const fromText = document.querySelector(".from"),
  toText = document.querySelector(".to"),
  icons = document.querySelectorAll(".icons i"),
  selectTag = document.querySelectorAll("select"),
  exchangeIcon = document.querySelector(".exchange i"),
  btnTranslate = document.querySelector(".btn_translate");

selectTag.forEach((select, index) => {
  for (const countryCode in countries) {
    let selected;
    if (index == 0 && countryCode == "en-EG") {
      selected = "selected";
    } else if (index == 1 && countryCode == "ar-SA") {
      selected = "selected";
    }
    let optionTag = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`;
    select.insertAdjacentHTML("beforeend", optionTag);
  }
});

btnTranslate.addEventListener("click", () => {
  let textFrom = fromText.value;
  let selectFrom = selectTag[0].value;
  let selectTo = selectTag[1].value;
  if (!textFrom) return;
  toText.setAttribute("placeholder", "translating...");
  let apiTranslate = `https://api.mymemory.translated.net/get?q=${textFrom}!&langpair=${selectFrom}|${selectTo}`;
  fetch(apiTranslate)
    .then((res) => res.json())
    .then((data) => {
      toText.innerText = data.responseData.translatedText;
      toText.setAttribute("placeholder", "translation");
    });
});

exchangeIcon.addEventListener("click", () => {
  [fromText.value, toText.value] = [toText.value, fromText.value];
  [selectTag[0].value, selectTag[1].value] = [
    selectTag[1].value,
    selectTag[0].value,
  ];
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        //   target.className = "fa-solid fa-check";
        navigator.clipboard.writeText(fromText.value);
        //   setTimeout(() => (target.className = "fa-solid fa-copy"), 1000);
        setClassName(target);
      } else {
        navigator.clipboard.writeText(toText.value);
        setClassName(target);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }

      speechSynthesis.speak(utterance);
      console.log(utterance);
    }
  });
});

function setClassName(target) {
  target.className = "fa-solid fa-check";
  setTimeout(() => (target.className = "fa-solid fa-copy"), 1000);
}
