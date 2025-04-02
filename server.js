const express = require('express')
const app = express()
const prisma = require('./prisma')

const PORT = 3000

app.use(express.json())
app.use(require('morgan')('dev'))

app.get('/api/players', async (req, res, next) => {
    try {
        const players = await prisma.players.findMany();
        res.json(players);
    } catch (error) {
        next(error)
    }
});

app.get('/api/players/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const player = await prisma.players.findUnique({ where: { id }});
        res.json(player);
    } catch (error) {
        next(error)
    }
});

app.post('/api/players', async (req, res, next) => {
    try {
        const { name, breed, status} = req.body;
        const player = await prisma.players.create({
            data: { name, breed, status }
        });
        res.json(player);
    } catch (error) {
        next(error)
    }
});

app.put('/api/players/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const { status } = req.body;
        const player = await prisma.players.update({
            where: { id },
            data: { status }
        });
        res.json(player)
    } catch (error) {
        next(error)
    }
});

app.delete('/api/players/:id', async (req, res, next) => {
    try {
        const id = +req.params.id
        await prisma.players.delete({ where: { id } })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})