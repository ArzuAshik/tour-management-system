const mongoose = require("mongoose");

// schema design
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a name for this tour."],
        trim: true,
        unique: [true, "{VALUE} is already exist. Please try with a new name."],
        minLength: [3, "Too short name."],
        maxLength: [50, "Name is too large."]
    },
    spots: {
        type: [String],
        required: [true, "Please Provide the spots for this tour."]
    },
    image: {
        type: String,
        required: [true, "Please Provide a image for this tour."]
    },
    description: {
        type: String,
        required: [true, "Please Provide a tour description."]
    },
    fare: {
        type: Number,
        required: [true, "Please Provide the fare of this tour."],
        min: [0, "Fare can't be a negative value."],
        validate: {
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: "Must be an integer Value."
        }
    },
    guestCapacity: {
        type: Number,
        required: [true, "Please Provide the guest capacity of this tour."],
        min: [1, "Tour should have at least one Guest Capacity."],
        validate: {
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: "Must be an integer Value."
        }
    },
    date: {
        type: String,
        required: [true, "Please Provide the date of the tour."]
    },
    viewCount: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

// Model
exports.Tour = mongoose.model("Tour", tourSchema);