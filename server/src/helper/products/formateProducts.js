async function formateProducts(rawProducts) {

    const products = rawProducts.map(p => ({
        _id: p?._id,
        image: p?.images[0]?.url,
        title: p?.title,
        regularPrice: p?.variants[0]?.regularPrice,
        salePrice: p?.variants[0]?.salePrice,
        stock: p?.variants?.reduce((acc, item) => acc + item.stock, 0),
    }))
    return products
}

module.exports = formateProducts;