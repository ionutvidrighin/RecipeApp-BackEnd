var mongoose = require('mongoose');


var RecipeSchema = mongoose.Schema({
    category: string,
    brand: string,
    persons: number,
    air: boolean,
    transmission: string,
    topOffer: boolean,
    deal: boolean,
    price: string
});

module.exports = mongoose.model('recipes', RecipeSchema);
