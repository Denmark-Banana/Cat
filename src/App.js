console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    const saveData = localStorage.getItem("saveData");
    if(saveData) {
      this.data = JSON.parse(saveData);
    }

    this.header = new Header({
      $target
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        try {
          this.setState("Loading...⏰");
          const { data } = await api.fetchCats(keyword);

          if(data && data.length > 0)
            this.setState(data);
          else 
            this.setState("No Data. T^T");
        } catch(e) {
          console.error(e);
          this.setState("API 서버 Error. 잠시 후 다시 시도해주세요. |")
        }
      },
      onRandom: async ()=> {
        try{
          this.setState("Loading...⏰");
          const { data } = await api.fetchRandomCat();

          if(data && data.length > 0)
            this.setState(data);
          else 
            this.setState("No Data. T^T")
        } catch(e) {
          console.error(e);
          this.setState("API 서버 Error. 잠시 후 다시 시도해주세요. |")
        }
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      onDetail: async id => {
        try{ 
          const { data } = await api.fetchCatDetail(id);
          if(data)
            return data;
          else
            return "no data";
        } catch(e) {
          console.error(e);
          return "error";
        }
      },
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}