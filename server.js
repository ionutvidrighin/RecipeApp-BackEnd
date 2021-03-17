const express = require('express');
const mongoose = require('mongoose');
const RecipeModel = require('./RecipeModel.js');
require('dotenv/config');


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    next()
})


//Get all data
app.get('/', async (req, res) => {
    try {
        const data = await RecipeModel.find();
        res.send(data);
    } catch(err) {
        res.send(err);
    }
})


//Get specific element
app.get('/:id', async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.id);
        res.send(recipe)
    } catch(err) {
        res.send(err)
    }
})


//Delete
app.delete('/:id', async (req, res) => {
    try {
        const recipe = await RecipeModel.remove({_id: req.params.id});
        res.send("Recipe deleted!");
    } catch(err) {
        res.send(err)
    }
})


//Update
app.patch('/:id', async (req, res) => {
    try {
        const updateRecipe = await RecipeModel.updateOne(
            {_id: req.params.id},
            {$set: 
                { 
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    description: req.body.description
                }
            }
        );
        res.send("Recipe has been updated");
    } catch(err) {
        res.send(err)
    }
})


//Post
app.post('/recipes', (req, res) => {
    const dbData = req.body;
    RecipeModel.create(dbData, (error, data) => {
        if (error){
            res.status(500).send(error)
        } else {
            res.status(201).send("Recipe created!")
        }
    })
});


//Server running on PORT
app.listen(port, () => console.log('Server Up'));


//Connection to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('connected to Mongo!')
);