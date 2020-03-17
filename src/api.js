const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

console.log(API_ENDPOINT);
const api = {
  fetchCats: async keyword => {
    const result = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
    return result.json();
  },
  fetchCatDetail: async id => {
    const result = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    return result.json();
  },
  fetchRandomCat: async () => {
    const result = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    return result.json();
  }
};