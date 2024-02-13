fetchCategoryData()
fetchProductData()

function fetchCategoryData(){
    fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(json => console.log(json));

    //receivedCategoryData(json)

}

function fetchProductData(){
    fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(json => console.log(json));

    //receivedProductData(json)
}