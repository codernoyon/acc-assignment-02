const mongoose = require('mongoose');

const tourPackageSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tour name is required"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: [true, "Please provide details about the tour package."]
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negetive"]
    }, 
    destinations: {
        type: Array,
        required: [true, "Privide tour destinations"]
    },
    transPortation: {
        type: String,
        required: true,
        enum: {
            values: ['bus', 'airbus', 'train'],
            message: "transPortation can't be {VALUE}"
        }
    },
    tourPackageType:{
        type: String,
        required: true
    },
    meals:{
        type: Array,
        required: [true, 'Provie the what are the meals added for this tour package']
    },
    availableSeat: {
        type: Number,
        required: true, 
        min: [0, "Seat can't be negetive"]
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['available', 'unavailable'],
            message: "Status can't be {VALUE}"
        }
    },
}, {
    timestamps: true,
});

tourPackageSchema.pre('save', function (next) {

    if (this.availableSeat === 0) {
        this.status = 'unavailable';
    }
    else if (this.availableSeat >= 1) {
        this.status = 'available';
    }
    next();
});


tourPackageSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
};


const TourPackage = mongoose.model('tourPackage', tourPackageSchema);

module.exports =  TourPackage