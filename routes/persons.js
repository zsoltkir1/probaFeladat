const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const Address = require('../models/Address');

router.get('/', async (req,res) => {
    try{
        const persons = await Person.find();
        res.json(persons);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:id', async (req,res) => {
    const person = await Person.findById(req.params.id);
        try{
            res.json(person);
        }catch(err){
            res.json({message:err});
        }
    });

router.delete('/:id', async (req,res) => {
        try{
            const person = await Person.deleteOne({ _id: req.params.id });
            res.json(person);
        }catch(err){
            res.json({message:err});
        }
    });

router.patch('/:id', async (req,res) => {
    try{
        const person = await Person.updateOne({ _id: req.params.id },
        { $set: { name: req.body.name, email: req.body.email } });
        res.json(person);
    }catch(err){
        res.json({message:err});
    }
});

router.put('/', (req,res) => {
    const person = new Person({
        name: req.body.name,
        email: req.body.email
    });

    person.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message : err});
    });
});

router.put('/:id/newaddress', (req,res) => {
    console.log("start adding new address");
    const query = Person.findById(req.params.id);
    if(query !== null){
    const address = new Address({
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        street_number: req.body.street_number
    });

    address.save()
    .then(data => {

        query.exec(function (err, person) {
            if (err) {
                return;
            }
            if (person.addresses==undefined){
                person.addresses = [data._id];
            }else{
                person.addresses.push(data._id);
            }
            person.save().then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({ message : err});
            });
        });


    })
    .catch(err => {
        res.json({ message : err});
    });
    }
    else{
        res.send('email address not found');
    };
    
});

router.get('/:id/addresses', async (req,res) => {
    var addressIdArray=[];
    const person = await Person.findById(req.params.id);
    console.log(person);
    const addresses = person.addresses.forEach(async function (value){
        addressIdArray.push(await Address.findById(value));
    })
    setTimeout( () => {
        res.json(addressIdArray);
    }, 500);
    
});

router.get('/:id/addresses/:addressId', async (req,res) => {
    var addressIdArray=[];
    const person = await Person.findById(req.params.id);
    console.log(person);
    const addresses = person.addresses.forEach(async function (value){
        addressIdArray.push(await Address.findById(value));
    })
    setTimeout( async () => {
        const address = await Address.findById(req.params.addressId);
        res.json(address);
    }, 500);
    
});

module.exports = router;