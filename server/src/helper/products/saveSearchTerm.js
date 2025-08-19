const { Product } = require("../../models/productModle");
const SearchHistoryModel = require("../../models/SearchHistoryModel");

exports.saveSearchTerm = async function (q) {
    const regex = new RegExp(q, 'i');

    const resultCount = await Product.find({
        $or: [
            { title: regex },
            { description: regex },
            { keywords: regex },
        ]
    }).countDocuments();

    const hasAlready = await SearchHistoryModel.findOne({ term: q });

    if (hasAlready) {
        hasAlready.times += 1;
        hasAlready.resultCount = resultCount;
        await hasAlready.save();
    } else {
        const newTerm = new SearchHistoryModel({ term: q, resultCount, times: 1 });
        await newTerm.save();
    }
};

