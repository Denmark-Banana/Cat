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

  addEvent() {
    //함수의 매개변수로 넘어온 값들을 array로 변환한다.
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(
        entries,
        observer
      ) {
        console.log("intersect New target");
        entries.forEach(function(entry) {
          //타겟 엘리먼트와 뷰포트가 교차한다면
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
    }
  }

  render() {
    if (typeof this.data === "string") {
      this.$searchResult.innerHTML = "";
      this.$loadingElement.innerHTML = `<div class="loading">${this.data}</div>`;
    } else {
      const placeholderImg = "/images/placeholder.jpg";
      this.$loadingElement.innerHTML = "";
      this.$searchResult.innerHTML = this.data
        .map(
          cat => `
              <div class="item">
                <img class='lazy' src=${placeholderImg} data-src=${cat.url} alt=${cat.name} />
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
    this.addEvent();
    localStorage.setItem("saveData", JSON.stringify(this.data));
  }
}
