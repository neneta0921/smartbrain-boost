import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

// HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
// A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
// for the Face Detect Mode: https://www.clarifai.com/models/face-detection
// If that isn't working, then that means you will have to wait until their servers are back up. Another solution
// is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
// so you would change from:
// .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
// to:
// .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
const app = new Clarifai.App({
  apikey: 'c2965edda9cd42cba2fd0383dda649ae',
});

const particlesOptions = {
  polygon: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        {/* <FaceRecognition />} */}
      </div>
    );
  }
}

export default App;
