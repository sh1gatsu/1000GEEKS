import axios from "axios";

export const client = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w'
});

export const getWiki = (title: string) => {
  return client.get(`api.php?action=parse&section=0&prop=text&format=json&page=${title}`)
};
