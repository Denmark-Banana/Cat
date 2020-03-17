const TEMPLATE = '<input type="text">';

class SearchInput {
  $target = null;
  $searchInput = null;
  $randomButton = null;
  onSearch = null;
  onRandom = null;

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
    $target.appendChild($search);

    this.addEvent();
    this.recentSearch();

    console.log("SearchInput created.", this);
    this.render();
  }

  addEvent() {
    this.$searchInput.focus();

    this.$searchInput.addEventListener("click", () => {
      this.$searchInput.value = "";
    });

    this.$searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        localStorage.setItem("key", this.$searchInput.value);
        this.onSearch(e.target.value);
      }
    });

    this.$randomButton.addEventListener("click", () => {
      this.onRandom();
    });
  }

  recentSearch() {
    if(localStorage.getItem('key')) {
      const $searchValue = document.createElement("span");
      // $searchValue.innerHTML = localStorage.getItem('key');
      // this.$target.appendChild($searchValue);
      // TODO
    }
  }

  render() {
    
  }
}