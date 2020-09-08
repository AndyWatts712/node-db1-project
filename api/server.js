const express = require("express");

const db = require("../data/dbConfig.js");
const { json } = require("express");

const server = express();

server.use(express.json());

server.get('/api/accounts/', (req, res) => {
    db('Accounts')
        .then(accts => {
            res.status(200).json({data: accts})
        })
        .catch(err => {
            res.status(404).json({error: error.message})
        })
})

server.get('/api/accounts/:id', (req, res) => {
    const acctId = req.params.id
    db('Accounts')
        .where({id: acctId})
        .then(acct => {
            res.status(200).json({data: acct})
        })
        .catch(err => {
            res.status(404).json({error: error.message})
        })
})

server.post('/api/accounts', (req, res) => {
    db('Accounts')
        .insert(req.body)
        .then(acct => {
            if (acct) {
            res.status(201).json({message: 'Record created'})
            } else {
                res.status(500).json.apply({error: error.message})
            }
        })
        .catch(err => {
            res.status(404).json({error: error.message})
        })
})

server.put('/api/accounts/:id', (req, res) => {
    db('Accounts')
        .where({id: req.params.id})
        .update(req.body)
        .then(acct => {
            if (acct) {
                res.status(201).json({message: 'Record updated.'})
            } else {
                res.status(500).json({error: error.message})
            }
        })
})

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .del()
        .then(acct => {
            if (acct) {
                res.status(200).json({message: 'Record deleted'})
            } else {
                res.status(500).json({error: error.message})
            }
        })
})

module.exports = server;
