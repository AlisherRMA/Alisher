var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
    nameOfProduct: String,
    priceOfProduct: Number,
    quentity: Number,
    overAllCost: Number
});

module.exports = mongoose.model("Item", itemSchema);
