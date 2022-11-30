const userRouter = require('./users.route');
const productRouter = require('./products.route');

function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    
}
module.exports = route;