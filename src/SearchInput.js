const TEMPLATE = '<input type="text">';

class SearchInput {
  $target = null;
  $searchInput = null;
  $randomButton = null;
  onSearch = null;
  onRandom = null;

  constructor({ $target, onSearch, onRandom }) {
    const $searchInput = document.createElement("input");
    
    this.$target = $target;
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    const $randomButton = document.createElement("button");
    $randomButton.className = "RandomButton";
    this.$randomButton = $randomButton;
    this.$randomButton.innerHTML = "RANDOM";
    $target.appendChild($randomButton);

    this.addEvent();
    this.SearchKey();

    console.log("SearchInput created.", this);
    this.render();
  }
  addEvent() {
    this.$searchInput.focus();
    this.$searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        localStorage.setItem("key", this.$searchInput.value);
        this.onSearch(e.target.value);
      }
    });

    this.$searchInput.addEventListener("click", () => {
      console.log('click');
      this.$searchInput.value = "";
    });


    this.$randomButton.addEventListener("click", () => {
      console.log('click');
      this.onRandom();
    });
  }

  SearchKey() {
    if(localStorage.getItem('key')) {
      const $searchValue = document.createElement("span");
      $searchValue.innerHTML = localStorage.getItem('key');
      // console.log(localStorage.getItem('key'));
      // console.log($searchValue.text);
      this.$target.appendChild($searchValue);
    }
  }

  render() {
    
  }
}