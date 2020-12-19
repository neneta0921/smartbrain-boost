import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import './App.css';

import urlConfig from './urlConfig';
const API_URL = urlConfig().url.API_URL;
const IMAGE_URL = urlConfig().url.IMAGE_URL;

const particlesOptions={
  particles: {
    number:{
      value: 200,
      density:{
        enable: true,
        value_area:800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  boundingBox: [],
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const faceBox = regions.map((region) => {
      const detectedFace = region.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: detectedFace.left_col * width,
        topRow: detectedFace.top_row * height,
        rightCol: width - detectedFace.right_col * width,
        bottomRow: height - detectedFace.bottom_row * height,
      };
    });
    return faceBox;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  createBoundingBox = (boxArray) => {
    const boundingBox = boxArray.map((box, i) => {
      return (
        <div
          key={i}
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}></div>
      );
    });
    this.setState({ boundingBox: boundingBox }) ;
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(API_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then((response) => {
        if(response) {
          fetch(IMAGE_URL, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .then(() => this.createBoundingBox(this.state.box))
      .catch((err) => console.log(err))
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  };

  render() {
    const { isSignedIn, imageUrl, route, box, boundingBox, user } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? (
            <div>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
              />
              <FaceDetection box={box} imageUrl={imageUrl} boundingBox={boundingBox} />
            </div>
            )
          : ( route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
