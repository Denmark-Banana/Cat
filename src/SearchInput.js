const TEMPLATE = '<input type="text">';

class SearchInput {
  $target = null;
  $searchInput = null;
  $randomButton = null;
  onSearch = null;
  onRandom = null;
  recentSearchArr = [];

  constructor({ $target, onSearch, onRandom }) {
    this.$target = $target;
    this.onSearch = onSearch;
    this.onRandom = onRandom;

    const $search = document.createElement("div");
    $search.className = "Search";

    const $randomButton = document.createElement("button");
    $randomButton.innerHTML = "|";
    this.$randomButton = $randomButton;
    $search.appendChild($randomButton);

    const $searchInput = document.createElement("input");
    // $searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.placeholder = "Search";
    this.$searchInput = $searchInput;
    $search.appendChild($searchInput);

    this.getAllCookie();
    const $recentSearch = document.createElement("ul");
    this.recentSearchArr.forEach(keyword => {
      const element = document.createElement("li");
      element.innerHTML = keyword;
      $recentSearch.appendChild(element);
    })
    $search.appendChild($recentSearch);


    $target.appendChild($search);

    this.addEvent();

    const allValue = this.getAllCookie();

    console.log("SearchInput created.", this);
    this.render();
  }

  setCookie(name, value, exp) {
    const date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
    console.log(document.cookie);
  }

  deleteCookie = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  }
  
  getCookie(name) {
    const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  }

  getAllCookie() {
    const allCookie = document.cookie;
    const keywordArr = allCookie?.split('; ');
    for(let idx = 1; idx < keywordArr.length; idx++) {
      if(idx > 5)
        return;
      const valueArr = keywordArr[idx]?.split('=');
      this.recentSearchArr.push(valueArr[0]);
    }
  }

  addEvent() {
    this.$searchInput.focus();

    this.$searchInput.addEventListener("click", () => {
      this.$searchInput.value = "";
    });

    this.$searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        //localStorage.setItem("key", this.$searchInput.value);
        this.setCookie(this.$searchInput.value, this.$searchInput.value, 1);
        this.onSearch(e.target.value);
      }
    });

    this.$randomButton.addEventListener("click", () => {
      this.onRandom();
    });
  }

  render() {}
}
