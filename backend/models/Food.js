const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        ingredients: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true
                },

                allergen: {
                    type: String,
                    default: null,
                    trim: true
                },

                certainty: {
                    type: String,
                    enum: ["confirmed", "likely", "possible"],
                    default: "likely"
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;