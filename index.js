const cart = document.querySelector('#dish');
const cartCountElement = document.querySelector('#cart-count');
let cartCount = 0;
const svg3 = document.querySelector('#svg3');
const add = document.querySelector('#add');

const but1 = document.querySelector('#but1');
const svg1 = document.querySelector('#svg1');
const svg2 = document.querySelector('#svg2');
let foundItem;
let foundItem2;
let total = 0;
const priceElement = document.createElement('p');

let isProductAdded = false;
 const priceTotal = document.createElement('p');
let a;


function sum(num1){
 total = total+num1
 return  total;
}


function addPrices() {
    return new Promise((resolve, reject) => {
        fetch('./data.json')
            .then((response) => response.json())
            .then((price1) => {
            //    let foundItem;
               price1.some((lacag)=>{
                if(lacag.price===6.50){
                    foundItem = lacag.price
                    
                    return true;
                }
               }); 

               if(foundItem!== undefined){
               
                priceTotal.textContent = foundItem.toFixed(2);
                resolve([priceTotal]);
               } else{
                reject('price not found')
               }

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                reject(error);
            });
    });
}

but1.addEventListener('click', function () {
    if (isProductAdded) return; // Exit early if product is already added
    
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
            data.some((product) => {
                
                if (product.name === 'Waffle with Berries' && product.price ===6.50) {
                    const productDiv = document.createElement('div');
                    let value = 1;
                    foundItem2 = parseFloat(product.price.toFixed(2));

                    const nameElement = document.createElement('p');
                    nameElement.textContent = `${value} ${product.name}`;

                    // const priceElement = document.createElement('p');
                  priceElement.textContent = `price @ ${foundItem2}  $  `
                    productDiv.appendChild(nameElement);
                    productDiv.appendChild(priceElement);

                    addPrices().then((pricess) => {
                        pricess.forEach((item) => {
                            priceElement.textContent += `  ${item.textContent}`;
                        });
                    });
                  a = sum(foundItem2)
                    cart.appendChild(productDiv);
                    isProductAdded = true;
                    cartCount++;
                    cartCountElement.textContent = `Your cart (${cartCount})`;

                    svg2.style.display = 'flex';
                    svg2.style.flexDirection = 'row';
                    svg2.style.justifyContent = 'flex-start';
                    svg2.style.color = 'red';

                    svg1.style.display = 'flex';
                    svg1.style.flexDirection = 'row';
                    svg1.style.justifyContent = 'flex-end';
                    svg1.style.width = '100%';
                    productDiv.style.display = 'inline-block';
                    productDiv.style.verticalAlign = 'top';
                   
                    add.style.display = 'none';
                    svg3.style.display = 'none';
                    svg2.addEventListener('click', function () {
                        console.log('clicked')
                     a = sum(foundItem2)
                      priceElement.textContent = `price: @  ${foundItem2} AT $ ${a}USD `
                      console.log(a)

                


                        value++;
                        nameElement.textContent = `${value} ${product.name}`;


                    });


                    function resetCartState() {
                        isProductAdded = false;  // Allow adding items again
                        cartCount = 0;           // Reset cart count
                        cartCountElement.textContent = `Your cart (${cartCount})`; // Update cart count display
                        
                        // Reset visibility of add button and icons
                        svg3.style.display = 'block';
                        add.style.display = 'block';
                        svg1.style.display = 'none';
                        svg2.style.display = 'none';
                    }






                    svg1.addEventListener('click', function () {
                        console.log('clickerd 22')
                    
                        // svg1.style.display = 'none';
                        if (value > 1) {
                            value--;
                            nameElement.textContent = `${value} ${product.name}`;
                        } else if (value === 1) {
                            value--;
                            cart.removeChild(productDiv);
                            svg3.style.display = 'block';
                            svg1.style.display = 'none'
                            svg2.style.display = 'none'
                            
                            add.style.display = 'block'
                            cartCount--;
                            cartCountElement.textContent = `Your cart (${cartCount})`;
                            // isProductAdded = false;
                        
                        }
                    });
                }
            });
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
});
