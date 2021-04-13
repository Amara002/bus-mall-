'use strict';

let leftElement = document.getElementById('left');
let middleElement = document.getElementById('middle');
let rightElement = document.getElementById('right');
let votedProduct = document.getElementById('voted product')


function Product(name, source, times) {
    this.name = name;
    this.source = source;
    this.times = times;
    this.votes = 0;
    this.shown = 0;
    Product.allProducts.push(this);

}

Product.allProducts = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

console.log(Product.allProducts);

let maxAttempts = 5;
let counter = 0;
// let counter1 = 0;

let leftElementIndex;
let middleElementIndex;
let rightElementIndex;

function produceRandomIndex() {
    return Math.floor(Math.random() * Product.allProducts.length)
}

function renderThreeImages() {
    leftElementIndex = produceRandomIndex();
    middleElementIndex = produceRandomIndex();
    rightElementIndex = produceRandomIndex();

    while (leftElementIndex === rightElementIndex || leftElementIndex === middleElementIndex || middleElementIndex === rightElementIndex) {
        rightElementIndex = produceRandomIndex();
        middleElementIndex = produceRandomIndex();

    }

    leftElement.src = Product.allProducts[leftElementIndex].source;
    middleElement.src = Product.allProducts[middleElementIndex].source;
    rightElement.src = Product.allProducts[rightElementIndex].source;

}

renderThreeImages();

votedProduct.addEventListener('click', handleUserClick);
function handleUserClick(event) {
    console.log(event.target.id);
    counter++;
    // counter1++;
    if (counter <= maxAttempts ) {
        if (event.target.id === 'left') {
            Product.allProducts[leftElementIndex].votes++;
            Product.allProducts[leftElementIndex].shown++;
            // Product.allProducts[leftElementIndex]
        } else if (event.target.id === 'middle') {
            Product.allProducts[middleElementIndex].votes++;
            Product.allProducts[middleElementIndex].shown++;

        } else {
            Product.allProducts[rightElementIndex].votes++;
            Product.allProducts[rightElementIndex].shown++;

        }
        console.log(Product.allProducts);
        renderThreeImages();

    } else {

        let button = document.getElementById('clickOn');
        button.addEventListener('click', showResult);
        function showResult() {

            let result = document.getElementById('results-list');
            let productResult;
            for (let i = 0; i < Product.allProducts.length; i++) {
                productResult = document.createElement('li');
                result.appendChild(productResult);
               
                productResult.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes}votes, and was seen ${Product.allProducts[i].shown} times `
            }

            button.removeEventListener('click', showResult)
            votedProduct.removeEventListener('click', handleUserClick)
        }
    }

}
