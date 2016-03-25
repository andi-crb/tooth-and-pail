import React from 'react'
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyTheme from '../theme.js';
import Header from './Header'
import NavBar from './NavBar'
import SobStory from './SobStory'
import ProgressBar from './ProgressBar'
import DonateForm from './DonateForm'
import ProfileName from './ProfileName'
import Gallery from './Gallery'
import GalleryPhoto from './GalleryPhoto'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

export default React.createClass({

  childContextTypes : {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme),
    };
  },

    getInitialState: function () {
    return {
      amountDonated: 0,
      gallery: [
        { name : "cat",
          imgurl : 'https://40.media.tumblr.com/c10a90bda3576ab2e51f5d42ee3b0006/tumblr_n1sgn0Kc6s1shf8zxo6_1280.png',
          target : 1000,
          received : 0,
          recipientID : 1111
        },
        { name : "Sue",
          imgurl : 'https://40.media.tumblr.com/c10a90bda3576ab2e51f5d42ee3b0006/tumblr_n1sgn0Kc6s1shf8zxo6_1280.png',
          target :  3000,
          received : 0,
          recipientID : 2222
        },
        { name : "Anne",
          imgurl : 'https://40.media.tumblr.com/c10a90bda3576ab2e51f5d42ee3b0006/tumblr_n1sgn0Kc6s1shf8zxo6_1280.png',
          target : 4000,
          received : 100,
          recipientID : 3333
        },
        { name : "Anne",
          imgurl : 'https://40.media.tumblr.com/c10a90bda3576ab2e51f5d42ee3b0006/tumblr_n1sgn0Kc6s1shf8zxo6_1280.png',
          target : 4000,
          received : 100,
          recipientID : 4
        }
      ]
    }
  },

// the handle Donation function can be deleted once DonateForm is part of profile rather than app

  handleDonation: function (p) {
  console.log("hey look this is being passed up!", p, "type", typeof p)
  this.setState({amountDonated: p})
  },

  galleryClick: function (recipientID) {
    //  go to the profile page for this recipient
    console.log("gallery click in app.js for ",  recipientID)
  },

  render () {
    return (
      <div className='app'>
        <NavBar/>
        <Header header='TOOTH & PAIL'/>
        <Gallery gallery={this.state.gallery} galleryClick={this.galleryClick} />
      </div>
    )
  }
})
