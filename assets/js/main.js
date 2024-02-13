//fetchCategoryData()
fetchProductData()
receivedProductData()

 function fetchProductData() {
         fetch('https://dummyjson.com/products')
         .then((result) => {

            return result.json();
        })
        .then((json) => {

            receivedProductData(json);

        });

    }

function receivedProductData(ProductData) {
    //console.log(ProductData);

    let myProducts = ProductData.products

    let myFeaturedProducts = [];

    myFeaturedProducts.push(myProducts[6], myProducts[9], myProducts[23])

    console.log(myFeaturedProducts);

}








    // function fetchCategoryData() {
    //     fetch('https://dummyjson.com/products/categories')
    //     .then((result) => {
    
    //         return result.json();
    //     })
    //     .then((json) => {
    
    //         receivedCategoryData(json);
    
    //     });
    
    // }