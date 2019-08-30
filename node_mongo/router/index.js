var express=require('express')
var router=express.Router()
var login=require('./login/login')
var product=require('./product/product')
router.use('/login',login)
router.use('/product',product)
module.exports=router