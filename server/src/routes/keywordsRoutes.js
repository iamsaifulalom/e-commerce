const { Router } = require('express');
const { checkAuth, checkRole } = require('../middleware/checkAuth');
const SearchHistoryModel = require('../models/SearchHistoryModel');
const handleError = require('../helper/common/handleError');

const router = Router()

router.get("/", checkAuth, checkRole(["admin", "seller"]), async (req, res) => {

    try {

        const limit = 50;
        const page = parseInt(req.query.page) || 1;
        const filter = req.query?.filter;

        const filterObj = {};
        const sortObj = {}

        if (filter === "heigh-volume") {
            sortObj.resultCount = -1;
        } else if (filter === "zero-volume") {
            filterObj.resultCount = 0;
        }
        sortObj.createdAt = -1;

        const keywords = await SearchHistoryModel.find(filterObj)
            .sort(sortObj)
            .limit(limit)
            .select("resultCount term")
            .skip((page - 1) * limit);

        res.status(200).json({
            hasMore: limit === keywords.length,
            keywords
        });
    } catch (error) {
        handleError(error, res);
    }
});

module.exports = router