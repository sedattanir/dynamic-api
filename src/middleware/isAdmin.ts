module.exports = function(app) {
    //@ts-ignore
    app.use(function(req, res, next) {
        console.log('isAdmin middleware is working');
        next();
    })
}