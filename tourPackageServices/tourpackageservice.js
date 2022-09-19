const TourPackage = require('../models/TourPackage');

exports.getTourPackagesService = async () => {
    const packges = await TourPackage.find({});
    return packges;
};


exports.createTourPackageService = async (data) => {
    const result = await TourPackage.create(data);
    return result;
}