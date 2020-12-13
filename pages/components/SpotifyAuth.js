import React from 'react'
import { redirect_uri, client_id } from '../../settings.json';

export default class extends React.Component {
  generateLink = () => {
    let params = new URLSearchParams();
    params.set('client_id', client_id)
    params.set('response_type', 'token')
    params.set('redirect_uri', redirect_uri)
    params.set('scope', '')
    return `https://accounts.spotify.com/authorize?${params.toString()}`
  }
  
  render() {
    return (
      <a href={this.generateLink()} className={this.props.style}>
        Login with Spotify
      </a>
    )
  }
}