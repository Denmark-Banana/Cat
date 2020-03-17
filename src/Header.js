function Header({ $target }) {
  const $header = document.createElement("header");
  $header.className = "Header";

  const $checkThemelabel = document.createElement("label");

  const $checkThemeInput = document.createElement("input");
  $checkThemeInput.type = "checkbox";
  $checkThemeInput.onclick = toggle;

  const $checkThemeSpan = document.createElement("span");
  $checkThemeSpan.classList.add("Slider");
  $checkThemeSpan.classList.add("Round");

  $checkThemelabel.appendChild($checkThemeInput);
  $checkThemelabel.appendChild($checkThemeSpan);
  $header.appendChild($checkThemelabel);
  $target.appendChild($header);

  checkTheme($checkThemeInput);
}

function checkTheme(chboxElement) {
  const isDarkTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: Dark)").matches;

  if (isDarkTheme) console.log("this is DarkTheme");
  chboxElement.checked = isDarkTheme ? true : false;
}

function toggle() {
  if (this.checked) {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "#FFF";
    document.body.style.color = "black";
  }
}
