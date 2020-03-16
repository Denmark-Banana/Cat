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
      if(nextData.visible) {
        this.getDetail(nextData.image.id);
      }
  
      this.data = nextData;
      this.render();
    }
  
    async getDetail(id) {
      const data = await this.onDetail(id);
      this.data.image = data;
      this.render();
      console.log(this.data.image);
    }
  
    close() {
      const $closeBtn = this.$imageInfo.querySelector(".close");
      $closeBtn.addEventListener("click", () => {
        this.$imageInfo.style.display = "none";
      });
    }
  
    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
        console.log( this.data.image);
        if(matchMedia("screen and (min-width: 768px)").matches) {
          console.log('768이상');
        } else{
          console.log('768이하');
        }
  
        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament ? temperament : "Loading 중입니다..." }</div>
              <div>태생: ${origin ? origin : "Loading 중입니다..." }</div>
            </div>
          </div>`;
        this.$imageInfo.style.display = "block";
        this.close();
      } else {
        this.$imageInfo.style.display = "none";
      }
    }
  }