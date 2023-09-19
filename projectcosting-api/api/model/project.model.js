const mongoose = require("mongoose");
const constants = require("../constants");
const { Schema, model } = mongoose;

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, constants.MONGODB_VALIDATION.PORJECT.TITLE_REQUIRED]
        },
        description: String,
        budget: {
            type: Number,
            required: [true, constants.MONGODB_VALIDATION.PORJECT.BUDGET_REQUIRED]
        },
        userId: {
            type: String,
            required: [true, constants.MONGODB_VALIDATION.PORJECT.USER_REQUIRED],
        },
    },
    { timestamps: true }
);

const Project = model('Project', projectSchema, constants.MONGODB_MODEL.PROJECTS);
module.exports = Project;