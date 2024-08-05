import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController{
    getRegister(req,res){
        res.render("register");
    }
    getLogin(req,res){
        res.render("login",{errorMessage:null});
    }

    postRegister(req,res){
        const {name,email,password} = req.body;
        UserModel.add(name,email,password);
        res.render("login",{errorMessage:null});
    }
    postLogin(req,res){
        const {email,password} = req.body;
        const user=UserModel.isValidUser(email,password);
        if(!user){
            return res.render("login",{
                errorMessage:"Invalid Credentials",
            });
        }
        req.session.user=user;
        var products = ProductModel.getAll();
        res.render('index', { products, user: req.session.user });
    }
    
    // on logout destroy the session
    logout(req,res){
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/login");
        }

    });
    res.clearCookie('lastVisit');
}
}