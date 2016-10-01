var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    User = require('./models/user')

mongoose.connect('mongodb://localhost/ardu')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

var port = process.env.PORT || 3000

var router = express.Router()

router.route('/User')
    .post(function(req, res) {
        var user = new User()
        user.name = req.body.name
        user.save(function(err) {
            res.json({
                message: err ? err : 'User Created'
            })
        })
    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err)
            }
            res.json(users)
        })
    })

router.route('/User/:id')
    .get(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.send(err)
            }
            res.json(user)
        })
    })

app.use('/api', router)

app.listen(port, function() {
    console.log('Magic happens on port ' + port);
})
