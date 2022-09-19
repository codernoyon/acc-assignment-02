const { getTourPackagesService, createTourPackageService } = require("../tourPackageServices/tourpackageservice");

exports.getTourPackages = async (req, res) => {
    try {
        const packages = await getTourPackagesService();
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
}