class ImageInfo {
  $imageInfo = null;
  data = null;
  onDetail = null;

  constructor({ $target, onDetail, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.onDetail = onDetail;

    this.render();
  }

  setState(nextData) {
    console.log(nextData);
    if (nextData.visible) {
      this.getDetail(nextData.image.id);
    }

    this.data = nextData;
    this.render();
  }

  async getDetail(id) {
    const fetchData = await this.onDetail(id);
    /**
     * 1. 창이 떠 있는지 체크
     * 2. 비동기로 요청할때의 id가 현재 imageInfo의 id와 같은지 체크
     */
    if (
      fetchData &&
      this.$imageInfo.style.display === "block" &&
      this.data.image.id === id
    ) {
      if (fetchData === "error" || fetchData =="no data")
        this.data.error = fetchData;
      else        
        this.data.image = fetchData;
      this.render();
    }
  }

  addEvent() {
    //Button
    const $closeBtn = this.$imageInfo.querySelector(".close");
    $closeBtn.addEventListener("click", () => {
      this.$imageInfo.style.display = "none";
    });
    //ESC
    document.onkeyup = e => {
      if (e.key === "Escape") {
        this.$imageInfo.style.display = "none";
      }
    };
    //Modal 영역 밖
    window.onclick = e => {
      if (e.target == this.$imageInfo) this.$imageInfo.style.display = "none";
    };
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${
                temperament ? temperament : "Loading 중입니다..."
              }</div>
              <div>태생: ${origin ? origin : "Loading 중입니다..."}</div>
              <div>${this.data.error? this.data.error: ""}</div>
            </div>
          </div>`;
      this.$imageInfo.style.display = "block";
      this.addEvent();
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
