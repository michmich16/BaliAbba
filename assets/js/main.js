//global
const productSection = document.getElementById('featuredProducts');
const navElement = document.getElementById('navigation')

let myProducts = null

// page load
fetchCategoryData()
fetchProductData()

// model code

// henter product
function fetchProductData() {
    fetch('https://dummyjson.com/products?limit=100')

        .then((result) => {

            return result.json();
        })
        .then((json) => {

            receivedProductData(json);

        });

}

// henter categories
function fetchCategoryData() {
    fetch('https://dummyjson.com/products/categories')

        .then((result) => {

            return result.json();
        })
        .then((json) => {

            receivedCategoryData(json);

        });

}

// controller code


//Get random number from 0-29
const randomNumber1 = Math.floor(Math.random() * 29) + 0;
console.log(randomNumber1);

const randomNumber2 = Math.floor(Math.random() * 29) + 0;
console.log(randomNumber2);

const randomNumber3 = Math.floor(Math.random() * 29) + 0;
console.log(randomNumber3);



function receivedProductData(productData) {
    //console.log(productData);

    myProducts = productData.products

    let myFeaturedProducts = [];

    myFeaturedProducts.push(myProducts[randomNumber1], myProducts[randomNumber2], myProducts[randomNumber3])

    createProductView(myFeaturedProducts)
    // CreateProductView(myProducts)

}

function receivedCategoryData(categoryData) {
    //let myCategory = categoryData.map(category => [category]);
    //console.log(myCategory);
    createNavBar(categoryData)
}

function navCallBack(myCategory) {
    console.log(myCategory)

    if (myCategory == "All") {
        createProductView(myProducts)

    } else {
        console.log(myCategory);

        let mySelectedProducts = []

        myProducts.forEach(product => {

            if (myCategory == product.category) {

                console.log(product);
                mySelectedProducts.push(product)
            }

        });
        //console.log(mySelectedProducts)
        createProductView(mySelectedProducts)

    }
}

function productCallback(myId) {



    console.log(myId);
    let myClickedProduct = null


    myProducts.forEach(product => {

        if (product.id == myId) {
            myClickedProduct = product
        }
    }
    )

    if (myClickedProduct == null) {
        // ingen produkt
        alert('no product')
    }
    else {
        // produkt
        console.log(myClickedProduct)
        clearApp();
        buildProduct(myClickedProduct)

    }

}


// view code

function createNavBar(mycategories) {
    //navElement
    let myHTML = `<button onclick = "navCallBack('All')">All</button>`

    mycategories.forEach(element => {
        console.log(element);
        myHTML += `<button onclick = "navCallBack('${element}')">${element}</button>`

    });

    navElement.innerHTML = myHTML
}




// view code
function createProductView(myCards) {
    //console.log(myCards);
    clearApp()

    myCards.forEach(product => {
        // console.log(product);


        let myHTML = `<figure onclick="productCallback(${product.id})" >
        <h2>${product.title}</h2><img src="${product.thumbnail}">
        <h3>PRIS: ${product.price} rabat: ${product.discountPercentage}</h3></figure>`


        productSection.innerHTML += myHTML
    })
}

//----------------------------------------------------------------------
function buildProduct(product) {

    let myHTML = `<figure class="productDetails">
    <h2>${product.title} ${product.rating}</h2>
    <img src="${product.images[0]}">
    <img src="${product.images[1]}">
    <img src="${product.images[2]}">
    <img src="${product.images[3]}">
    <h3>PRICE: ${product.price} rabat: ${product.discountPercentage}</h3>
    <p> About This Product: ${product.description}</p>
    </figure>
    `


    productSection.innerHTML = myHTML
}

//----------------------------------------------------------------------
function clearApp() {
    productSection.innerHTML = ""
}