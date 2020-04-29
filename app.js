const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movie.json')
const port = 3000
const app = express()


//app.engine設定我們要用的template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

//app.set 告訴express 我們要用的view engine 是handlebars
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/movies/:id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.id)
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { movies: movies, keyword: keyword })
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})