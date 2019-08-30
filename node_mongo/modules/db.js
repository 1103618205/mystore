const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const DbUrl = 'mongodb://localhost:27017';
var ObjectId=require('mongodb').ObjectID
var _content = function (cellback) {
    MongoClient.connect(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
        if (err) {
            console.log(err)
            return
        }
        cellback(client)
    })
}
exports.ObjectId=ObjectId
exports.find = function (collectionName, json, cellback) {
    _content(function (client) {
        var db = client.db('product');
        db.collection(collectionName).find(json).toArray(function (error, data) {
            cellback(error, data)
            client.close()
        })

    })
}
exports.insert = function (collectionName, json, cellback) {
    _content(function (client) {
        var db = client.db('product')
        db.collection(collectionName).insertOne(json, function (err, data) {
            cellback(err, data)
        })
    })
}
exports.update = function (collectionName, json1, json2, cellback) {
    _content(function (client) {
        var db = client.db('product')
        db.collection(collectionName).updateOne(json1, {$set:json2}, function (err, data) {
            cellback(err, data)
        })
    })
}
exports.remove = function (collectionName, where, cellback) {
    _content(function (client) {
        var db = client.db('product')
        db.collection(collectionName).deleteOne(where, function (err, data) {
            cellback(err, data)
        })
    })
}