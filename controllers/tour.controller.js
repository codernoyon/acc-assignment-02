const { getTourPackagesService, createTourPackageService } = require("../tourPackageServices/tourpackageservice");

exports.getTourPackages = async (req, res) => {
    try {
        

        let filters = { ...req.query };
        // console.log(filters);


        //sort , page , limit -> exclude
        const excludeFields = ['sort', 'page', 'limit', ];
        excludeFields.forEach(field => delete filters[field]);

        const queries = {}

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        const packages = await getTourPackagesService(filters, queries);

        res.status(200).json({
            status: 'success',
            data: packages
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message,
        });
    }
};


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