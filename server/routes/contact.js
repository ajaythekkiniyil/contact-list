const express = require('express')
const router = express.Router()
const contact = require('../model/contact')

// route for create new contact
router.post('/create',(req,res)=>{
    const {name, email, phone} = req.body
    const newContact = new contact({
        name,
        email,
        phone,
    })
    newContact.save()
    .then(contact=>res.status(200).json('New contact saved'))
    .catch(err=> res.status(400).json({'error': true, 'msg': err.message}))
})

// route for read all contacts
router.get('/contacts', (req,res)=>{
    contact.find()
    .then(contacts=> res.status(200).json(contacts))
    .catch(err=> res.status(400).json({'error': true, 'msg': err.message}))
})

// route for get contact by id
router.get('/contact/:id', (req,res)=>{
    const id = req.params.id
    contact.findById({_id: id})
    .then(contact=> res.status(200).json(contact))
    .catch(err=> res.status(400).json({'error': true, 'msg': err.message}))
})

// route for delete contact by id
router.delete('/contact/:id', (req,res)=>{
    const id = req.params.id
    contact.findByIdAndDelete({_id: id})
    .then(contact=> res.status(200).json(contact))
    .catch(err=> res.status(400).json({'error': true, 'msg': err.message}))
})

// route for edit or update contact by id
router.put('/contact/:id', (req,res)=>{
    const id = req.params.id
    const {name,email, phone} = req.body
    const updatedContact = {
        name,
        email,
        phone
    }
    contact.findByIdAndUpdate({_id: id},updatedContact)
    .then(contact=> res.status(200).json(contact))
    .catch(err=> res.status(400).json({'error': true, 'msg': err.message}))
})

module.exports = router