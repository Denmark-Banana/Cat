const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

console.log(API_ENDPOINT);
const api = {
  fetchCats: keyword => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(res =>
      res.json()
    );
  },
  fetchCatDetail: id => {
    return fetch(`${API_ENDPOINT}/api/cats/${id}`).then(res => 
      res.json()  
    );
  },
  fetchRandomCat: () => {
    return fetch(`${API_ENDPOINT}/api/cats/random50`).then(res => 
      res.json()  
    );
  }

};