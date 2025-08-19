const { Category } = require("../../models/categoryModel")

exports.getCategoryWithChildrenIds = async (categoryId) => {
    const isParent = await Category.find({ parent: categoryId });
    if (isParent.length > 0 ) {
        const childIds = isParent.map(c => c._id.toString());
        return [categoryId, ...childIds];
    }
    return [categoryId];
};
