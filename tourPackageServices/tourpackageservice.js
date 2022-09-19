const TourPackage = require('../models/TourPackage');

exports.getTourPackagesService = async () => {
    const packges = await TourPackage.find({});
    const total = await TourPackage.countDocuments()
    return {total, packges};
};


exports.createTourPackageService = async (data) => {
    const result = await TourPackage.create(data)
    return result;
}