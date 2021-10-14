const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const session = require('express-session')
const express = require("express");
let dotenv = require("dotenv");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config({ path: "./config.env" });
const LINKEDIN_KEY = process.env.CLIENT_ID_IN;
const LINKEDIN_SECRET = process.env.CLIENT_SECERT_IN;

const port = process.env.PORT || 2000;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({ secret: process.env.SESSION_SECERT_IN}));
app.use(passport.initialize());
app.use(passport.session());


// GET from config.env file
passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_KEY,
      clientSecret: LINKEDIN_SECRET,
      callbackURL: "http://localhost:2000/auth/linkedin/techkey/login",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      process.nextTick(() => {
        return done(null, profile);
      });
    }
  )
);


// The route for the button of linkedIn 
app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { state: "SOME STATE" })
);


app.get(
  "/auth/linkedin/techkey/login",
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);


//Redirect the user to the route you want after successfull authentication
// If you change this say /home also change line 59
app.get("/", (req, res) => {
  if (req.user) {
      console.log(req.user);
    const name = req.user.name.givenName;
    const family = req.user.name.familyName;
    const photo = req.user.photos[0].value;
    const email = req.user.emails[0].value;
    res.send(
      `<center style="font-size:140%"> <p>User is Logged In </p>
      <p>Name: ${name} ${family} </p>
      <p> Linkedn Email: ${email}</p>
      <img src="${photo}"/>
      </center>`
      
    )
  } else {
    res.send(`<center style="font-size:160%"> <p>This is Home Page </p>
    <p>User is not Logged In</p>
    <a href='/auth/linkedIn'>Login</a>
    <img style="cursor:pointer;"  onclick="window.location='/auth/linkedIn'" src="https://www.google.com/search?q=LinkedIN+button+picture+for+login&tbm=isch&chips=q:linkedin+button+picture+for+login,online_chips:linked:F_dpx8hzR9M%3D&bih=695&biw=1366&rlz=1C1CHBF_enKE874KE875&hl=en&sa=X&ved=2ahUKEwjerPXArsrzAhVQ_IUKHWzjBP0Q4lYoAnoECAEQFQ"/>
    </center>
    `);
  }
});


app.listen(port, function() {
    console.log(`server started on port ${port}`);
    console.log(`http://localhost:${port}/`);
});