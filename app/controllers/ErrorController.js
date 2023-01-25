exports.notFound = (req, res, next) => {
    res.status(404).json({ success: false, message: 'Not Found' });
    next();
};

exports.errorHandler = (err, _, res, next) => {
    if (err) {
        res.status(400).json({ success: false, message: err.message });
    } else {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    next();
};
