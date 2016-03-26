import React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import Gallery from './Gallery'
import GalleryPhoto from './GalleryPhoto'
import Sort from './Sort'

// database functions
import getRequest from '../getRequest.js'
import postRequest from '../postRequest.js'

// material-ui helpers
import GetMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import MyTheme from '../theme.js'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

export default React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: GetMuiTheme(MyTheme),
    };
  },

    getInitialState: function () {
    return {
      amountDonated: 0,
      gallery: []
    }
  },

  componentDidMount: function() {
    // get all the recipients from the database
    getRequest('http://localhost:3000/recipients', this.dbSetState)
    },

  dbSetState: function (data) {
    this.setState({gallery: data})
  },

  galleryClick: function (recipientID) {
    //  go to the profile page for this recipient
    console.log("gallery click in app.js for ",  recipientID)
  },



sortHandleChange: function(event, index, value) {
  this.setState({valueSort:sortName})
},

  render () {
    return (
      <div className='app'>
        <NavBar/>
        <Header header='TOOTH & PAIL'/>
        <Sort/>
        <Gallery gallery={this.state.gallery} galleryClick={this.galleryClick} />
      </div>
    )
  }
})
