import React from 'react'

export default class extends React.Component {
  generateLink = () => {
    let params = new URLSearchParams();
    params.set('client_id', process.env.NEXT_PUBLIC_CLIENT_ID)
    params.set('response_type', 'token')
    params.set('redirect_uri', window.location.protocol + '//' + window.location.host + '/')
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