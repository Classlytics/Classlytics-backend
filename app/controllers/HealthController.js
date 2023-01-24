const { getQueryResult } = require('../helpers/mysql_helper');

exports.healthCheck = async (_, res) => {
    const status = {
        db_connection_status: true,
    };
    try {
        const testQuery = `SELECT 'Test' AS Test`;
        await getQueryResult(testQuery);
    } catch (err) {
        status.db_connection_status = false;
    }

    return res
        .status(Object.values(status).includes(false) ? 500 : 200)
        .json({ success: true, data: status });
};
