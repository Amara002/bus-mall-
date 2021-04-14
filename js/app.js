'use strict';

let votedProduct = document.getElementById('voted product')
let leftElement = document.getElementById('left');
let middleElement = document.getElementById('middle');
let rightElement = document.getElementById('right');

let namesArr = [];
let votesArr = [];
let shownArr = [];


function Product(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    Product.allProducts.push(this);
    namesArr.push(this.name);

}

Product.allProducts = [];
Product.firstShown = [];


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

let maxAttempts = 10;
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

    while (leftElementIndex === rightElementIndex || leftElementIndex === middleElementIndex || middleElementIndex === rightElementIndex
        || Product.firstShown.includes(leftElementIndex)
        || Product.firstShown.includes(middleElementIndex)
        || Product.firstShown.includes(rightElementIndex)) {
        leftElementIndex = produceRandomIndex();
        rightElementIndex = produceRandomIndex();
        middleElementIndex = produceRandomIndex();

    }
    Product.firstShown[0] = leftElementIndex;
    Product.firstShown[1] = middleElementIndex;
    Product.firstShown[2] = rightElementIndex;

    leftElement.src = Product.allProducts[leftElementIndex].source;
    Product.allProducts[leftElementIndex].shown++;
    

    middleElement.src = Product.allProducts[middleElementIndex].source;
    Product.allProducts[middleElementIndex].shown++;

    rightElement.src = Product.allProducts[rightElementIndex].source;
    Product.allProducts[rightElementIndex].shown++;




    middleElement.src = Product.allProducts[middleElementIndex].source;
    Product.allProducts[middleElementIndex].shown++;

    rightElement.src = Product.allProducts[rightElementIndex].source;
    Product.allProducts[rightElementIndex].shown++;
    

}

renderThreeImages();

votedProduct.addEventListener('click', handleUserClick);

function handleUserClick(event) {
    // console.log(event.target.id);
    counter++;
    // counter1++;
    if (counter <= maxAttempts) {
        if (event.target.id === 'left') {
            Product.allProducts[leftElementIndex].votes++;

            console.log(event.target.id === 'left');

            // Product.allProducts[leftElementIndex]
        } else if (event.target.id === 'middle') {
            Product.allProducts[middleElementIndex].votes++;

        } else if (event.target.id === 'right') {
            Product.allProducts[rightElementIndex].votes++;

        } else {
            alert('please press on image');
            counter--;

        }
        renderThreeImages();


    } else {

        let button = document.getElementById('clickOn');
        button.addEventListener('click', showResult);
        button.hidden = false;
        for (let i = 0; i < Product.allProducts.length; i++) {
            votesArr.push(Product.allProducts[i].votes);
            shownArr.push(Product.allProducts[i].shown);

        }
        console.log(votesArr);

        // show the chart
        chart();

        votedProduct.removeEventListener('click', handleUserClick)


        function showResult() {

            let result = document.getElementById('results-list');
            let productResult;

            for (let i = 0; i < Product.allProducts.length; i++) {
                productResult = document.createElement('li');
                result.appendChild(productResult);

                productResult.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes}votes, and was seen ${Product.allProducts[i].shown} times `
                votedProduct.removeEventListener('click', handleUserClick)
            }
            button.removeEventListener('click', showResult);


            //             button.removeEventListener('click', showResult)
        }
    }


}

function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');

    let chart = new Chart(ctx, {
        // what type is the chart
        type: 'bar',

        //  the data for showing
        data: {
            //  for the names
            labels: namesArr,

            datasets: [
                {
                    label: 'product votes',
                    data: votesArr,
                    backgroundColor: [
                        'rgb(251, 93, 76)',
                    ],

                    borderWidth: 1
                },

                {
                    label: 'product shown',
                    data: shownArr,
                    backgroundColor: [
                        'black',
                    ],

                    borderWidth: 1
                }

            ]
        },
        options: {}
    });

}