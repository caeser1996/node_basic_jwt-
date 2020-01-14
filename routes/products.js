const express = require('express');

const router  =  express.Router();

// here we can use router with our need

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling get product request '
    })
});