class SearchResult {
    $searchResult = null;
    $loadingElement = null;
    data = null;
    onClick = null;
  
    constructor({ $target, initialData, onClick }) {
      this.data = initialData;
      this.onClick = onClick;

      this.$loadingElement = document.createElement("div");
      this.$loadingElement.className = "loading";
      $target.appendChild(this.$loadingElement);

      this.$searchResult = document.createElement("div");
      this.$searchResult.className = "SearchResult";
      $target.appendChild(this.$searchResult);
      
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      if(typeof(this.data) === "string") {
        this.$searchResult.innerHTML = "";
        this.$loadingElement.innerHTML = `<div class="loading">${this.data}</div>`;
      }
      else {
        this.$loadingElement.innerHTML = "";
        this.$searchResult.innerHTML = this.data
          .map(
            cat => `
              <div class="item">
                <img src=${cat.url} alt=${cat.name} />
              </div>
            `
          )
          .join("");
  
        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
          $item.addEventListener("click", () => {
            this.onClick(this.data[index]);
          });
        });
      }
      localStorage.setItem("saveData", JSON.stringify(this.data));
    }
  }