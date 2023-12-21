const express = require('express');
const chirpStore = require('../chirpstore');
let router = express.Router();


router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        res.json(chirpStore.GetChirp(id));
    } else {
        res.send(chirpStore.GetChirps());
    }


});

router.post('/:id?', (req, res) => {
    let id = req.params.id;
    if (!id) {
        chirpStore.CreateChirp(req.body);
    }
});

router.put('/:id?', (req, res) => {
    let id = req.params.id;
    chirpStore.UpdateChirp(id, req.body);
    res.sendStatus(200);
});

router.delete('/:id?', (req, res) => {
    let id = req.params.id;
    chirpStore.DeleteChirp(id, req.body);
    res.sendStatus(200);
})


module.exports = router;