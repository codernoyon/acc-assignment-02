const TourPackage = require('../models/TourPackage');
// get all package
exports.getTourPackagesService = async (filters, queries) => {
    // console.log(queries, filters);
    const packges = await TourPackage
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const total = await TourPackage.countDocuments(filters);
    const pageCount = Math.ceil(total / queries.limit);
    return { total, pageCount, packges };
};

// create new package
exports.createTourPackageService = async (data) => {
    const result = await TourPackage.create(data);
    return result;
};

// get single package by Id
exports.getSinglePackageTourService = async (tourPackageId) => {
    await TourPackage.findByIdAndUpdate({ _id: tourPackageId }, { $inc: { __v: 1 } });
    const result = await TourPackage.findById({ _id: tourPackageId });
    return result;
};


// get top 3 treding package (based on views : {__v: max})
exports.getTrendingTourPackageService = async () => {
    const result = await TourPackage.find({}).sort('-__v').limit(3);
    return result;
};

// get top 3 cheapest package (based on price)
exports.getCheapestTourPackesService = async () => {
    const result = await TourPackage.find({}).sort('price').limit(3);
    return result;
};


// update single package by Id
exports.updateTourPackageService = async (tourPackageId, data) => {
    const package = await TourPackage.findById(tourPackageId);
    const result = await package.set(data).save();
    return result;
}