const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const Adress = require('../models/Adress');

router.get('/', async (req,res) => {
    try{
        const persons = await Person.find();
        res.json(persons);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:email', async (req,res) => {
    const person = await Person.findOne({ email: req.params.email });
        try{
            res.json(person);
        }catch(err){
            res.json({message:err});
        }
    });

router.delete('/:email', async (req,res) => {
        try{
            const person = await Person.deleteOne({ email: req.params.email });
            res.json(person);
        }catch(err){
            res.json({message:err});
        }
    });

router.patch('/:email', async (req,res) => {
    try{
        const person = await Person.updateOne({ email: req.params.email },
        { $set: { name: req.body.name, email: req.body.email } });
        res.json(person);
    }catch(err){
        res.json({message:err});
    }
});

router.post('/newperson', (req,res) => {
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

router.post('/newadress/:email', (req,res) => {

    const query = Person.findOne({ email: req.params.email });
    if(query !== null){
    const adress = new Adress({
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        street_number: req.body.street_number
    });

    adress.save()
    .then(data => {


        query.exec(function (err, person) {
            if (err) {
                return;
            }
            if (person.adresses==undefined){
                person.adresses = [data._id];
            }else{
                person.adresses.push(data._id);
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
        res.send('email adress not found');
    };
    
});

function idmegtalal(email){
    var adressIdArray=[];
    Person.findOne({ email: email },function (err, person){
            adressIdArray=person.adresses;
            console.log(adressIdArray);
    });
    return adressIdArray;
}

router.get('/adresses/:email', (req,res) => {
    var adressIdArray=idmegtalal(req.params.email);// idáig eljut
    console.log("ideeljut"); //ide nem jut el
    console.log(adressIdArray);
    var adressArray=[];
    adressIdArray.forEach(function(value,index){
        Adress.findById(value).exec(function (err, adress){
            adressArray.push(adress);
        });
        });    
    res.json(adressArray);
});


module.exports = router;