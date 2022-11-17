const axios = require("axios");

export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export async function GetMemes() {
  const response = await axios.get(`https://api.imgflip.com/get_memes`);

  const memes: Meme[] = response.data;
  return memes;
}

export async function getTwoRandomMemes() {

}
