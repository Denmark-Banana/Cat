function Header({ $target }) {
  const $header = document.createElement("header");
  $header.className = "Header";

  const $checkThemeform = document.createElement("form");
  $checkThemeform.className = "checkThemeform";

  const $checkThemeInput = document.createElement("input");
  $checkThemeInput.className = "checkThemeInput";
  $checkThemeInput.type = "checkbox";
  $checkThemeInput.onclick = toggle;
  $checkThemeform.appendChild($checkThemeInput);

  $header.appendChild($checkThemeform);
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
