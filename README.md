# Welcome to my Secure API project

## About the project

This is the 6th project I made for my [Web Developer program at OpenClassrooms](https://openclassrooms.com/fr/paths/185-developpeur-web). :mortar_board:

The goal was to develop the backend for a sauces review App called So Pekocko, with the frontend already being developed and made available.


I used / developed : 
* A [Node.js](https://nodejs.org/en/) server
* The Model-View-Controller framework [Express](https://expressjs.com/)
* A MongoDB database
    * Hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
    * Database operations are performed with [mongoose](https://www.npmjs.com/package/mongoose)
* A REST API
* Security measures in compliance with [GDPR](https://www.cnil.fr/en/gdpr-developers-guide) / [OWASP](https://owasp.org/www-project-top-ten/) guidelines : 
    * Passwords hashed thanks to [bcrypt](https://www.npmjs.com/package/bcrypt)
    * Token-base authentication thanks to [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    * Various secured HTTP headers set thanks to [helmet](https://www.npmjs.com/package/helmet)
    * Only strong password validation at signup thanks to [password-validator](https://www.npmjs.com/package/password-validator)
    * Email syntax and uniqueness validation at signup thanks to [mongoose](https://www.npmjs.com/package/mongoose) & [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)       
    * Different request number limitations for logging in, signing up and all other actions thanks to [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)      
    * User-supplied data sanitization thanks to [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)      
    * Separated sensitive environment variables thanks to [dotenv](https://www.npmjs.com/package/dotenv)      


## How to test the app

### Prerequesites 
*  [Node.js](https://nodejs.org/en/)
*  Angular CLI -> run _npm install -g @angular/cli_  in the terminal in your dev projects directory
*  node-sass -> run _npm install -g node-sass_  in the terminal in your dev projects directory
*  Nodemon ->  run _npm install -g nodemon_  in the terminal in your dev projects directory


### To enjoy the app 
1. Clone [the repo containing the frontend](https://github.com/OpenClassrooms-Student-Center/dwj-projet6) and open it. In the **frontend directory** :
    * Install dependencies : _npm install_ (on the terminal)
    * Builds and serves the app : _npm start_ (on the terminal)

2. Clone [this repo containing the backend I developed](https://github.com/cdesurmo64/projet6-so-pekocko-backend) 

3. Add a config file named '.env' to the root of **the backend directory**. In this file, define 2 secret environment variables :
    * MONGODB_URI = '[path_to_your_MongoDB_database]'
    * TOKEN_KEY = '[a_random_string_to_encode_tokens]'

4. In the **backend directory** : 
    * Install dependencies : _npm install_ (on the terminal)
    * Start the node server : _nodemon server_ (on the terminal)
    
5. You can enjoy the app at the following address : http://localhost:4200 


## About me 

I am a 26 years old who decided to turn over a new leaf after several years spent in the world of marine biology research. :octopus: :microscope:

I am currently working as a Junior Web Developer at [Superprof](https://www.superprof.fr/). :heart:


[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cdesurmo.svg?style=social&label=Follow%20%40cdesurmo)](https://twitter.com/cdesurmo)

