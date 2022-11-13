import express from 'express';

const app = express()
app.use(express.json())

app.get('/' , (req , res) => {
  res.end('hello from backend to frontend!')
})

app.post('/weather' , (req , res) => {
  const city = req.body.cityName
  res.json(city)
})

const PORT = process.env.PORT || 3000
app.listen(PORT , () => console.log(`Server is running on ${PORT}`))