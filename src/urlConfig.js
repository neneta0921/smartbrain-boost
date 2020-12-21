const urlConfig = (env) => {
  if (env === 'test') {
    // test
    return {
      url: {
        SIGNIN_URL: 'http://localhost:3000/signin',
        REGISTER_URL: 'http://localhost:3000/register',
        IMAGE_URL : 'http://localhost:3000/image',
        API_URL: 'http://localhost:3000/imageurl'
      }
    }
  } else if (env === 'production') {
    // production
    return {
      url: {
        SIGNIN_URL: 'https://aqueous-inlet-35144.herokuapp.com/signin',
        REGISTER_URL: 'https://aqueous-inlet-35144.herokuapp.com/register',
        IMAGE_URL : 'https://aqueous-inlet-35144.herokuapp.com/image',
        API_URL: 'https://aqueous-inlet-35144.herokuapp.com/imageurl'
      }
    }
  }
  // development
  return {
    url: {
      SIGNIN_URL: 'http://localhost:3000/signin',
      REGISTER_URL: 'http://localhost:3000/register',
      IMAGE_URL : 'http://localhost:3000/image',
      API_URL: 'http://localhost:3000/imageurl'
    }
  }
}

export default urlConfig;