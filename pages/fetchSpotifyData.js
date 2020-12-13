import Spotify from 'spotify-web-api-js';

export default async function getData(accessToken) {
  const s = new Spotify();
  let playlists = [];
  let id;
  s.setAccessToken(localStorage.getItem('spotify'))
  s.getMe()
    .then(data => id = data.id)
    .then(() => s.getUserPlaylists(id))
    .then(async data => {
      playlists = data.items;
      while (playlists.length < data.total) {
        playlists = playlists.concat((await s.getUserPlaylists(id, { offset: playlists.length })).items)
      }
      return new Promise(r => r(playlists));
    })
    .then(p => console.log(p));
}
