'use strict'

const pg = require('pg')
const express = require('express')
const app = express()
const conString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard'
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/../static'))

app.set('view engine', 'pug')
app.set('views', __dirname + '/../views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	console.log('index is running')
	res.render('index')
})

app.get('/guestbook', (req, res) => {
	console.log('guestbook is running')
	pg.connect(conString, (err, client, done) => {
		if (err) throw err
		client.query(`SELECT * FROM	messages`,

		function (err, result) {
			console.log(result)
			done()
			pg.end()
			res.render('guestbook', {data: result.rows})
			console.log(result)
		})
	})
})

app.post('/createPost', (req, res) => {
	console.log('sending a post request to add entry to database')

	let titleU = req.body.inputTitle
	let messageU = req.body.inputMessage
	console.log(titleU)
	console.log(messageU)

	pg.connect(conString, (err, client, done) => {
		if (err) throw err
		client.query(`insert into messages
			(title, body)
			values
			($1, $2)`, [titleU, messageU] , 
			function(err, result) {
				console.log(result)			
				done()
				pg.end()
				res.redirect('/guestbook')
		})
	})
})

app.listen(8000, () => {
	console.log('Server is running')
})