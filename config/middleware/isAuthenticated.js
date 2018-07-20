module.exports = function(req, res, next){
    if(req.body.userName){
        return next();
    }

    return res.redirect("/");
}