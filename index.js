const app = require('express')()
const jimp = require('jimp')
const fs = require('fs')

app.get('/', (req, res) => {
  res.send('Online')
})


app.get('/:resolution', (req, res) => {
  const {resolution} = req.params
  modifyImage(parseInt(resolution)).then(() => {
    res.sendFile(`${__dirname}/image_${resolution}.jpg`, fs.unlinkSync.bind(this, `./image_${resolution}.jpg`))
  }).catch(error => {
    res.send('Error processing request')
    console.log(error)
  })
})

const modifyImage = async (resolution) => {
  const img = await jimp.read('./image.jpg')
  await img.resize(resolution, resolution)
  await img.writeAsync(`./image_${resolution}.jpg`)
}

app.listen(3000, () => console.log("server started on port 3000"))
