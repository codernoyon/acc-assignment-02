const TourPackage = require('../models/TourPackage');

exports.getTourPackagesService = async (filters, queries) => {
    console.log(queries);
    const packges = await TourPackage
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const total = await TourPackage.countDocuments(filters);
    const pageCount =  Math.ceil(total / queries.limit)
    return { total, pageCount, packges };
};


exports.createTourPackageService = async (data) => {
    const result = await TourPackage.create(data);
    return result;
};