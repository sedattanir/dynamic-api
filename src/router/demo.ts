module.exports = function(router) {
    router.get('/', (req, res) => {
        res.send('Merhaba Dünya');
    });
    return router;
}