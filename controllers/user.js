const User=require("../models/user.js");
const passport=require("passport");
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};
module.exports.signup = async (req, res) => {
    try{
      const { email, username, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err);
        } 
        req.flash("success", "Welcome to Wonderlust!");
        res.redirect("/listings");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  passport.authenticate("local", { failureRedirect: "/login", failureFlash: true })(req, res, () => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/listings");
  });
};
module.exports.logout = (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","You are logged out!!");
    res.redirect("/login");
  });   
};
