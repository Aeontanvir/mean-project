const mongoose = require("mongoose");
const constants = require("../constants");
const { Schema, model } = mongoose;

const costSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, constants.MONGODB_VALIDATION.COST.TITLE_REQUIRED],
        },
        description: String,
        projectId: {
            type: String,
            required: [true, constants.MONGODB_VALIDATION.COST.PROJECT_REQUIRED],
        },
        amount: {
            type: Number,
            required: [true, constants.MONGODB_VALIDATION.COST.Amount_REQUIRED],
        },
    },
    { timestamps: true }
);

const Cost = model('Cost', costSchema, constants.MONGODB_MODEL.COSTS);
module.exports = Cost;