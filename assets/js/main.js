fetchCategoryData()
fetchProductData()

function fetchProductData() {
    fetch('https://dummyjson.com/products')
        .then((result) => {

            return result.json();
        })
        .then((json) => {

            receivedProductData(json);

        });

}
function fetchCategoryData() {
    fetch('https://dummyjson.com/products/categories')
        .then((result) => {

            return result.json();
        })
        .then((json) => {

            receivedCategoryData(json);

        });

}

function receivedProductData(productData) {
    console.log(productData);

    let myProducts = productData.products;

    let myFeaturedProducts = [];

    myFeaturedProducts.push(myProducts[1], myProducts[10], myProducts[20])

    console.log(myFeaturedProducts);

}

function receivedCategoryData(categoryData) {
    let myCategory = categoryData.map(category => [category]);
    console.log(myCategory);
}





