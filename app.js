const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// const productRoutes = require('./routes/products');
// use is a middleware incpming request should get passed through this middleware
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'It worked'
//     });
// });

// app.use('/products',productRoutes);

app.get('/api', (req, res, next) => {
    res.json({
        message: 'welcome to api'
    });
});

app.post('/api/post', verifyToken, (req, res, next) => {

    jwt.verify(req.token, 'secretKey', (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: 'post created',
                AuthData
            });
        }
    });


});

app.post('/api/login', (req, res, next) => {
    // mock user 
    const user = {
        id: 1,
        username: 'sumanta',
        email: 'sumanta@gmail.com'
    };

    jwt.sign({ user }, 'secretKey', (err, token) => {
        res.json({
            token
        });
    });
});

// Format of token 
// Authorization : Bearer <access Token>

// verifyToken
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization']
    // check if undefinded
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // get the second index
        const bearerToken = bearer[1];
        req.token = bearerToken;
        // call next middleware
        next();

    } else {
        // forbidden
        res.status(403).json({
            message: 'No verified token present'
        });
    }
}
module.exports = app;

