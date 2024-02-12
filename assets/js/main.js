fetchCategoryData()

function fetchCategoryData(){
    fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(json => console.log(json));

    //receivedCategoryData(json)

}