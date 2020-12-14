import Spotify from 'spotify-web-api-js';

export default async function getData() {
  const s = new Spotify();
  let id;
  s.setAccessToken(localStorage.getItem('spotify'))
  const playlists = await s.getMe()
    .then(data => id = data.id)
    .then(() => s.getUserPlaylists(id))
    .then(async data => {
      let playlists = data.items;
      while (playlists.length < data.total) {
        playlists = playlists.concat((await s.getUserPlaylists(id, { offset: playlists.length })).items)
      }
      return new Promise(r => r(playlists));
    })
  return playlists;
  // laat user alle wrapped playlists aanklikken
}
