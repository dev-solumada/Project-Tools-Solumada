const mongoose = require('mongoose')

const Inventaire = mongoose.Schema({
    actif: Boolean,
    name: String,
    type: String,
    localisation: String,
    departement: String,
    equipement: String,
    numSerie: String,
    marque: String,
    processeur: String,
    ram: String,
    diskDur: String,
    capacite: String,
    cleWin: String,
    resolution: String,
    portHdmi: Boolean,
    portVga: Boolean,
    portUsb: Boolean,
    portPci: Boolean,
    imei1: String,
    imei2: String,
    chargeur: Boolean,
    cable: Boolean,
    housse: Boolean,
})

module.exports = mongoose.model('Inventaire', Inventaire)