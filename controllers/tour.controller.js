const {
    getTourPackagesService,
    createTourPackageService,
    getSinglePackageTourService,
    getTrendingTourPackageService,
    getCheapestTourPackesService,
    updateTourPackageService
} = require("../tourPackageServices/tourpackageservice");

// get all package
exports.getTourPackages = async (req, res) => {
    try {


        let filters = { ...req.query };


        //sort , page , limit -> exclude
        const excludeFields = ['sort', 'page', 'limit',];
        excludeFields.forEach(field => delete filters[field]);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if (req.query.page || req.query.limit || !req.query.limit) {
            const { page = 1, limit = 10 } = req.query;

            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        let filterdString = JSON.stringify(filters);
        filterdString = filterdString.replace(/\b(gt|gte|lt|lte|all|eq|in)\b/g, (match) => `$${match}`);

        filters = JSON.parse(filterdString);

        const result = await getTourPackagesService(filters, queries);

        res.status(200).json({
            status: 'success',
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message,
        });
    }
};

//  create a package
exports.createTourPackage = async (req, res) => {
    try {
        const result = await createTourPackageService(req.body);
        result.logger();
        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't inserted the data",
            error: error.message,
        });
    }
};

// get single package
exports.getTourPackage = async (req, res) => {
    try {
        const result = await getSinglePackageTourService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message,
        });
    }
};


// get trending packages
exports.getTrendingTourPackages = async (req, res) => {
    try {
        const result = await getTrendingTourPackageService();
        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message,
        });
    }
};


// get cheapest packages
exports.getCheapestTourPackages = async (req, res) => {
    try {
        const result = await getCheapestTourPackesService();
        res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message,
        });
    }
}

// update sing package 
exports.updateTourPackage = async (req, res) => {
    try {
        const result = await updateTourPackageService(req.params.id, req.body)
        res.status(200).json({
            status: 'success',
            message: 'Successfully updated the package',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message,
        });
    }
}