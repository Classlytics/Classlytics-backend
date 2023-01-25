const { executeMultiQuery } = require('../helpers/mysql_helper');
const { createStudentQueryList } = require('../models/Student');

exports.createStudent = async (req, res) => {
    try {
        const queryList = await createStudentQueryList(req);
        await executeMultiQuery(queryList);
        return res.status(200).json({ success: true, message: 'Student Register Successful' });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
