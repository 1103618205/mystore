var express = require('express')
var router = express.Router()
var multiparty = require('multiparty');
var DB = require('./../../modules/db')
var fs = require('fs')
router.get('/', function (req, res) {
    DB.find('product', {}, function (err, data) {
        res.render('product', {
            list: data
        })

    })

})
router.get('/productadd', function (req, res) {
    res.render('productadd')
})
router.get('/productedit', function (req, res) {
    var id = req.query.id
    console.log(id)
    DB.find('product', {_id: new DB.ObjectId(id)}, function (err, data) {

        res.render('productedit', {
            list: data[0]
        })
    })

})
router.post('/productedit', function (req, res) {
    var form = new multiparty.Form();
    form.uploadDir = 'upload'   //上传图片保存的地址     目录必须存在
    form.parse(req, function (err, fields, files) {
        var _id = fields._id[0]
        var originalFilename = files.pic[0].originalFilename;
        var json2 = {}
        if (originalFilename) {
            json2 = {
                title: fields.title[0],
                price: fields.price[0],
                fee: fields.fee[0],
                description: fields.description[0],
                pic: files.pic[0].path
            }
        } else {
            json2 = {
                title: fields.title[0],
                price: fields.price[0],
                fee: fields.fee[0],
                description: fields.description[0],
            }
            fs.unlink(files.pic[0].path)
        }
        DB.update('product', {_id: new DB.ObjectId(_id)}, json2, function (err, data) {
            if (err) {
                throw err
            }
            res.redirect('/product')
        })

    });
})
router.get('/productdelete', function (req, res) {
    var id=req.query.id
    DB.remove('product',{_id:new DB.ObjectId(id)},function (err,data) {
        res.redirect('/product')
    })
})
router.post('/doAdd', function (req, res) {
    var form = new multiparty.Form();
    form.uploadDir = 'upload'   //上传图片保存的地址     目录必须存在
    form.parse(req, function (err, fields, files) {
        var json1 = {
            title: fields.title[0],
            price: fields.price[0],
            fee: fields.fee[0],
            description: fields.description[0],
            pic: files.pic[0].path
        }
        DB.insert('product', json1, function (err, data) {
            res.redirect('/product')
        })

    });
})
module.exports = router