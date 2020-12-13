import React from 'react';
import getData from './fetchSpotifyData';

export default class extends React.Component {
  render() {
    return (
      <div>
        <button onClick={getData}>Oof</button>
      </div>
    )
  }
}