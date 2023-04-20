import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/*

name: String                // name of the donut
description: String         // general description of donut
nutrition_facts: [Object]   // List of objects denoting (nutrition, data)
ingredients: [String]       // list of ingredients
allergen_info: [String]     // list of common allergens for this donut
price: Number               // float - price of the donut
stock: Number               // int - availability of the donut
time: Date                  // time donut was baked

*/

const TaskSchema = new Schema({
    // TODO
});

export var Task = model('Task', TaskSchema)
