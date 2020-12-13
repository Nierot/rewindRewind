import Head from 'next/head'
import { Component } from 'react'
import styles from '../styles/Home.module.scss'
import SpotifyAuth from './components/SpotifyAuth'

export default class Home extends Component {
  
  state = {
    loggedIn: false
  }

  componentDidMount() {
    const { hash } = window.location;
    if (hash) {
      localStorage.setItem('spotify', hash.split(/#|&|=|access_token/gm).filter(x => x !== '')[0])
      localStorage.setItem('spotifySet', new Date())
      window.location.replace(window.location.href.split('#')[0])
    } else if ((new Date() - new Date(localStorage.getItem('spotifySet'))) > 60 * 60 * 1000) {
      localStorage.clear();
    }
    this.setState({
      loggedIn: localStorage.getItem('spotify') !== null
    })
  }

  render() {
    return (
      <div>
        <Head>
          <title>Rewind rewind</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          {this.state.loggedIn ?
          <>oof</>
          :
          <>
            <h1 className="title">
              Spotify Rewind Rewind
            </h1>
            <SpotifyAuth style={styles.SpotifyAuth}/>
          </>
          }
        </main>
      </div>
    )
  }
}
