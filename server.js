//Db setup
let dotenv = require("dotenv");
let express = require("express");
dotenv.config({ path: "./config.env" });
let mongoose = require("mongoose");
let DB = process.env.DBSTRING.replace("<PASSWORD>", process.env.DBPASSWORD);
let port = process.env.PORT || 3000;
let errorResponder = express();
let path = require("path");
// let app = require("./app");
const pug = require("pug");
let serverActive = false;
let cors = require("cors");
const passport=require('passport')
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");

//FACEBOOK AUTH
const FacebookStrategy=require('passport-facebook').Strategy;

//GOOGLE AUTHS
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID1 = '543377298856-sjbd65257ijigj015um41otaldtpotgd.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID1);

//Loading JQUERY
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const document = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

let app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(cors());
app.options("*", cors());

//website rendering with PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());

//HOME ROUTE
app.get('/', function(req, res) {
    res.render('_login.pug', { client_id: clientID });
});




//----------------------------------------------------------------------------------------------------------------------------------
//GOOGLE AUTHENTICATION


app.post('/login',(req,res)=>{
    let token=req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID1,  // Specify the CLIENT_ID of the app that accesses the backend, IF MULTIPLE [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload)
      }
      verify()
      .then(()=>{
          res.cookie('session-token',token);
          res.send("success");
      })
      .catch(console.error);

    console.log(token);
})


app.get('/google/home',isAuth,(req,res)=>{
    let user=req.user;
    res.render('_home',{user,flag:'google_auth'});

})

function isAuth(req,res,next){
    let token= req.cookies['session-token'];
    let user={};
    async function verify(){
        const ticket=await client.verifyIdToken({
            idToken:token,
            audience:CLIENT_ID1
        });
        const payload = ticket.getPayload();
        user.name=payload.name;
        user.email=payload.email;
        user.picture=payload.picture;
      // console.log(payload)
      }
      verify()
      .then(()=>{
          req.user=user;
          next();
      })
      .catch(err=>{
          res.redirect('/');
      });
    }


app.get('/logout',(req,res)=>{
    res.clearCookie('session-token');
    res.redirect('/');
})

//----------------------------------------------------------------------------------------------------------------------











// mongoose
//     .connect(DB, {
//         useNewUrlParser: true,
//     })
//     .then(function(con) {
//         if (con.connections) {
//             console.log("Connection to database : success");
//             let app = require("./app");
//             serverActive = true;
//             StartApplicaton(app);
//         }
//     })
//     .catch(function(error) {
//         serverActive = false;
//         console.log(error);
//         console.log("Error message from Server", error.message);
//         errorResponder.listen(port, function() {
//             console.log(`Backup Port activated`);
//         });
//     });

//creating a server using express object
// let server = app.listen(port, function () {
//   console.log(`server started on port ${port}`);
//   console.log(`http://localhost:${port}/`);
// });

// process.on("unhandledRejection", function (err) {
//   console.log("unhandledRejection", err.name, err.message);
//   server.close(function () {
//     process.exit(1);
//   });
// });

// process.on("uncaughtException", function (err) {
//   console.log("uncaughtException", err.name, err.message);
//   server.close(function () {
//     process.exit(1);
//   });
// });

// process.on("SIGNTERM", () => {
//   server.close(() => {
//     console.log("SHUT DOWN DUE TO SIGTERM");
//   });
// });









// GITHUB AUTH
//--------------------------------------------------------------------------------------------------------------------------

var access_token = "";



// Import the axios library, to make HTTP requests
const axios = require('axios')
    // This is the client ID and client secret that you obtained
    // while registering on github app
const clientID = 'a9b336f69a0d840f559b'
const clientSecret = 'c5b5287bdd8d98fd23144af4ea208d22680073dd'

// Declare the callback route
app.get('/protected', (req, res) => {

    // The req.query object has the query params that were sent to this route.
    const requestToken = req.query.code

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSON
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        access_token = response.data.access_token
        res.redirect('/git/home');
    })
})

app.get('/git/home', function(req, res) {

    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
            Authorization: 'token ' + access_token
        }
    }).then((response) => {
        console.log(response)
        res.render('_home', { userGit: response.data,flag:'git_auth' });
    }).catch(err => {
        res.redirect('/');
    })
});

//END OF GITHUB AUTH
//-------------------------------------------------------------------------------------------------------------------------












// FACEBOOK AUTH
//------------------------------------------------------------------------------------------------------------------------------------



passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    return done(null,user)
});


var prof={}
var prof={};
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost:3000/auth/facebook/secretes"
},
function(accessToken, refreshToken, profile, done) {
     prof.name=profile.displayName;
     prof.pic=profile.picture;
     prof.email=profile.emails;
    console.log(profile);

    return done(null,profile)
  
}
));
    
    
    
// },(accessToken,refreshToken,profile,done)=>{
//     console.log("profile");
// }));


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/secretes',passport.authenticate('facebook', {
    successRedirect : '/fb/home',
    failureRedirect : '/'
}));


app.get('/fb/home',(req,res)=>{
    const name=prof.name;
    const picture=prof.pic;
    const email=prof.email;
    res.render('_home',{flag:'fb_auth',name,picture,email});
})

//END OF FACEBOOK AUTH
//------------------------------------------------------------------------------------------------------------------------------------






app.listen(port, function() {
    console.log(`server started on port ${port}`);
    console.log(`http://localhost:${port}/`);
});

// function StartApplicaton(app) {
//     let server = app.listen(port, function() {
//         console.log(`server started on port ${port}`);
//         console.log(`http://localhost:${port}/`);
//     });

//     process.on("unhandledRejection", function(err) {
//         console.log("unhandledRejection", err.name, err.message);
//         server.close(function() {
//             process.exit(1);
//         });
//     });

//     process.on("uncaughtException", function(err) {
//         console.log("uncaughtException", err.name, err.message);
//         server.close(function() {
//             process.exit(1);
//         });
//     });

//     process.on("SIGNTERM", () => {
//         server.close(() => {
//             console.log("SHUT DOWN DUE TO SIGTERM");
//         });
//     });
// }

// if (!serverActive) {
//     errorResponder.set("view engine", "pug");
//     errorResponder.set("views", path.join(__dirname, "views"));
//     errorResponder.use(express.static(`${__dirname}/public`));

//     errorResponder.use(function(req, res, next) {
//         res.render("_serverError");
//         // res.json({
//         //   status: "failed",
//         //   message: "Please reload the page",
//         // });
//     });
// }