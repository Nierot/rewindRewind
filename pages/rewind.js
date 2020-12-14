import React from 'react';
import getData from './fetchSpotifyData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.scss';
import Stage2 from './components/Stage2';

export default class extends React.Component {

  state = {
    playlists: undefined,
    topSongPlaylists: undefined,
    stage: 1
  }

  async componentDidMount() {
    await this.fetchPlaylists();
  }

  fetchPlaylists = async () => {
    this.setState({ playlists: await getData() })
  }

  playlistDivs = () => {
    return this.filterPlaylists().map(x => 
      <div key={x.name} className={styles.playlist}>
        <img src={x.images[0].url} alt="img" className={styles.img}/>
        <span className={styles.playlistTitle}>{x.name}</span>
      </div>
    )
  }

  filterPlaylists = () => {
    return this.state.playlists
      .filter(x => x.name.includes('Your Top Songs'))
      .sort((a, b) => parseInt(a.name.split('Your Top Songs ')[1]) - parseInt(b.name.split('Your Top Songs ')[1]))
  }

  selectStage = () => {
    switch (this.state.stage) {
      case 1:
        return (
          <div>
            <h3 className={styles.margin}>
              Check if every year is here, else go to Spotify and follow the missing playlists.
            </h3>
            <div className={styles.center}>
              <a className={styles.button} onClick={() => this.setState({ stage: 2 })}>
                Everythings here
              </a>
            </div>
            <div className={styles.playlists}>
              {this.playlistDivs()}
            </div>
          </div>
        )
      case 2:
        return <Stage2 playlists={this.filterPlaylists()}/>
      default:
        return <h1>Something went wrong, please reload.</h1>
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.playlists ?
          (this.filterPlaylists().length === 0 ?
          <h2 className={styles.testBlock}>
            Please go to Spotify and follow every playlist named Your Top Songs under Made for You and then reload this page
          </h2>
          :
          this.selectStage()
          ):  
          <div className={styles.spinner}>
            <FontAwesomeIcon icon={faSpinner} />
          </div>
          }
        </div>
      </div>
    )
  }
}