# Here2There - Auth Microservice
[![Build Status](https://travis-ci.org/here2there-sf/auth.svg?branch=cit)](https://travis-ci.org/here2there-sf/auth)

## Getting Started
First, ensure you have node and mongo installed on your system.

```sh
# Clone repo
git clone https://github.com/here2there-sf/auth.git

# Install dependencies
npm install

# Run it
npm start

# Try it!
curl -H "Content-Type: application/json" -X POST -d '{"username":"user1", "email": "example@gmail.com", "password":"password1"}' http://localhost:8080/user
```

## NPM Scripts

- **`npm start`** - Start live-reloading development server
- **`npm test`** - Run test suite
- **`npm run test:watch`** - Run test suite with auto-reloading
- **`npm run coverage`** - Generate test coverage
- **`npm run build`** - Generate production ready application in `./build`
