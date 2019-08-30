var express=require('express')
var router=express.Router()
var DB=require('./../../modules/db')
router.get('/',function (req,res) {
    res.render('login')
})
router.post('/dologin',function (req,res) {
    DB.find('user', req.body, function (err, data) {
        if(data.length>0){
            res.redirect('/product')
        }else{
            res.send("<script>alert('登录失败');location.href='/login'</script>");
        }
    })
})
module.exports=router