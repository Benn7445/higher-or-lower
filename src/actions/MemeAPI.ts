import axios, * as others from 'axios';

export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export async function GetMemes() {
  const response: any = await axios.get(`https://api.imgflip.com/get_memes`);

  const memes: Meme[] = response.data.data.memes;
  return memes;
}

export async function getTwoRandomMemes() {
    const memes = await GetMemes();
    const retMemes = [];
    retMemes.push(memes[Math.floor(Math.random() * memes.length)]);
    retMemes.push(memes[Math.floor(Math.random() * memes.length)]);
    return retMemes;
}
