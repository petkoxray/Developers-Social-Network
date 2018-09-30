# Simple social network for developers
***
##### Built with ExpressJS with MongoDB (backend REST API) and  ReactJS + Redux (for client side)

### Functionalities
- Authentication (register, login)
- Users can add profile
- Users can add job experience, education, social network links 
- Users can edit their profile info and use gravatar for avatar
- Users can add github profile and list their github repos and etc (using github api)

## Instalation

#### Prerequisites
  - NodeJS >= 9
  - MongoDB for database

#### Steps

```sh
git clone https://github.com/petkoxray/Developers-Social-Network
cd Developers-Social-Network
npm install
cd client
npm install
cd ..
Add database URI in config/keys_prod.js or in congig/keys_dev.js
npm run dev
```

#### Demo
Here you can see working demo deployed in Heroku (Can be slow, because its using free version of heroku):
https://dev-soc-net.herokuapp.com/profiles
###### Example login: test@test.com password: 123456
