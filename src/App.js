import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
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
  apiKey: 'c2965edda9cd42cba2fd0383dda649ae',
});

const particlesOptions = {
  particles: {
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      boundingBox: [],
    };
  }

//  componentDidMount() {
//    fetch('http://localhost:3000')
//      .then(response => response.json())
//      .then(console.log)
//  }

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

    // const detectedFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // const image = document.getElementById('inputimage');
    // const width = Number(image.width);
    // const height = Number(image.height);
    // return {
    //   leftCol: detectedFace.left_col * width,
    //   topRow: detectedFace.top_row * height,
    //   rightCol: width - detectedFace.right_col * width,
    //   bottomRow: height - detectedFace.bottom_row * height,
    // };
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

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
      // this.state.imageUrl だとPOST:400エラーが起こるので注意
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .then(() => this.createBoundingBox(this.state.box))
      .catch((err) => console.log(err))
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  };

  render() {
    const { isSignedIn, imageUrl, route, box, boundingBox } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? (
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceDetection box={box} imageUrl={imageUrl} boundingBox={boundingBox} />
            </div>
            )
          : ( route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
