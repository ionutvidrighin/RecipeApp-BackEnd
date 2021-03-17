var mongoose = require('mongoose');


var RecipeSchema = mongoose.Schema({
    name: String,
    ingredients: String,
    description: String
});

module.exports = mongoose.model('recipes', RecipeSchema);
