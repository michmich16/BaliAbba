//global
const productSection = document.getElementById('featuredProducts');
const navElement = document.getElementById('navigation')
const basketIcon = document.getElementById('basketIcon')

let myProducts = null

// page load
fetchCategoryData()
fetchProductData()
InitializeBasket()

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

function SaveBasketData(basketData) {
    //create code to save data object to local storage
    let mySerializedData = JSON.stringify(basketData)

    localStorage.setItem('myBasket', mySerializedData)

}


function ReadLocalStorageData() {

    // write code to read data object and return it
    let mybasketstring = localStorage.getItem('myBasket')
    let myBasket = JSON.parse(mybasketstring)

    return myBasket
}

// controller code

function recivedProductsByCategory(productsByC) {

    let myProductArray = productsByC.products

    CreateProductView(myProductArray)

}



function CategoryRecived(CategoryData) {
    // hoved kategori arrays
    let myElectronics = []
    let myCosmetics = []
    let myVehicles = []
    let womensFashion = []
    let mensFashion = []
    let myMisc = []

    CategoryData.forEach(category => {

        switch (category) {

            case 'laptops':
            case 'lighting':
            case 'smartphones':

                myElectronics.push(category)
                break;

            case 'fragrances':
            case 'skincare':
                myCosmetics.push(category)

                break;

            case 'automotive':
            case 'motorcycle':
                myVehicles.push(category)

                break;

            case 'tops':
            case 'womens-dresses':
            case 'womens-shoes':
            case 'womens-watches':
            case 'womens-bags':
            case 'womens-jewellery':

                womensFashion.push(category)

                break;

            case 'tops':
            case 'mens-shirts':
            case 'mens-shoes':
            case 'mens-watches':
                mensFashion.push(category)

                break;

            default:

                myMisc.push(category)
                break;
        }

    });

    // add all to misc
    myMisc.push('All')

    // build datastructure to view code
    let myNavigationData = [
        {
            superCategoryname: 'Electronics',
            subCategories: myElectronics
        },
        {
            superCategoryname: 'Cosmetics',
            subCategories: myCosmetics
        },
        {
            superCategoryname: 'Vehicles',
            subCategories: myVehicles
        },
        {
            superCategoryname: 'mens fashion',
            subCategories: mensFashion
        },
        {
            superCategoryname: 'womans fashion',
            subCategories: womensFashion
        },
        {
            superCategoryname: 'misc',
            subCategories: myMisc
        }

    ]



    CreateNavBar(myNavigationData)
}



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

function BuildBasket(products) {
    clearApp()

    let myBasketHTML = '<section id="basketWiev">'
    if (products.length > 0) {
        products.forEach(product => {
            // console.log(product);

            let myHTML = `<figure><img src="${product.thumbnail}"><h2>${product.title}</h2><p>PRIS: ${product.price}</p><button onclick="BasketRemove(${product.id})">remove</button></figure>`


            myBasketHTML += myHTML
        })
        myBasketHTML += `<section id="basketTools"><button onclick="paymentCallBack()">Go to payment</button><button onclick="BasketClear()">clear basket</button></section>`
    } else {
        myBasketHTML += `<h1>basket empty go buy stuff</h1><button onclick="GetProductData()">OK</button>`

    }

    myBasketHTML += '</section>'

    productSection.innerHTML = myBasketHTML
}


function UpdateBasketIcon(items) {

    let myUpdateElement = document.getElementById('basketProductText')
    myUpdateElement.innerHTML = items

}

function createNavBar(mycategories) {
    //navElement
    let myHTML = `<button class="all-button" onclick = "navCallBack('All')">All</button>`

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


        let myHTML = `<div class="product-cards"><figure onclick="productCallback(${product.id})" >
        <h2>${product.title}</h2><img src="${product.thumbnail}">
        <h3>PRIS: ${product.price} rabat: ${product.discountPercentage}</h3></figure></div>`


        productSection.innerHTML += myHTML
    })
}

//----------------------------------------------------------------------
function buildProduct(product) {

    let myHTML = `<div class="productinfo"><figure class="productDetails">
    <img src="${product.images[0]}">
    <img src="${product.images[1]}">
    <img src="${product.images[2]}">
    </figure>
    
    <section id="selected-product-details">
    <h2>${product.title} </h2>
    <h3>Rating: <span style="color:#EBFF00">${product.rating}</span></h3>
    <h3>PRICE: ${product.price} rabat: <span style="color:red">${product.discountPercentage}</span></h3>
    <p> About This Product: ${product.description}</p>
    <button class="add-to-cart">Add to Cart</button>
    </section></div>`



    productSection.innerHTML = myHTML
}

//----------------------------------------------------------------------
function clearApp() {
    productSection.innerHTML = ""
}