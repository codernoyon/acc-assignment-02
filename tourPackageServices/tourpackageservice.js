const TourPackage = require('../models/TourPackage');

exports.getTourPackagesService = async (filters, queries) => {
    console.log(queries);
    const packges = await TourPackage.find({})
        .select(queries.fields)
        .sort(queries.sortBy);

    const total = await TourPackage.countDocuments();
    return { total, packges };
};


exports.createTourPackageService = async (data) => {
    const result = await TourPackage.create(data);
    return result;
};