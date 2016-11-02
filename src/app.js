'use strict'

const pg = require('pg')
const express = require('express')
const app = express()
const conString = postgres://sabrina:postgres@localhost/bulletinboard


app.set('view engine', 'pug')
app.set('views', __dirname + '/../views')

app.get('/index', (req, res) => {
	console.log('index is running')
	res.render('index')
})

app.get('/guestbook', (req, res) => {
	console.log('guestbook is running')
	res.render('guestbook')
})


pg.connect(conString, (err, client, done) => {
	if (err) throw err
	client.query()
	done()
	pg.end()
})


app.listen(8000, () => {
	console.log('Server is running')
})