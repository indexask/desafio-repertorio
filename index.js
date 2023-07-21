const fs = require('fs')
const express = require('express')
const app = express()

app.listen(3000, console.log('Servidor inicado en el puerto 3000 :)'))

app.use(express.json())

app.post('/canciones', (req,res)=>{
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf8'))
    canciones.push(cancion)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('inscrito correctamente')
})

app.get('/canciones',(req,res) =>{
    const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf8'))
    res.json(canciones);
})

app.delete('/canciones/:id', (req,res)=>{
    const {id} = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf8'))
    const index = canciones.findIndex(i =>i.id == id)
    canciones.splice(index,1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('cancion borrada correctamente')
})

app.put('/canciones/:id',(req,res)=>{
    const cancion = req.body
    const {id} = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf8'))
    const index = canciones.findIndex(i =>i.id == id)
    canciones[index] = cancion;
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Cancion actualizada correctamente')
})
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})