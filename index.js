const cart = document.querySelector('#dish');
const cartCountElement = document.querySelector('#cart-count');
let cartCount = 0;
const svg3 = document.querySelector('#svg3');
const add = document.querySelector('#add');
const dvg = document.querySelector('#dvg')
const allTotal = document.querySelector('.num')
const itemTotal = document.createElement('p')

const but1 = document.querySelector('#but1');
const but2  = document.querySelector('#but2')
const svg1 = document.querySelector('#svg1');
const svg2 = document.querySelector('#svg2');
const add2  = document.querySelector('#add2')
const i1  = document.querySelector("#i1")
const d1= document.querySelector('#d1')
let foundItem;
const productDiv = document.createElement('div');
let foundItem2;
let total = 6.50;
const productDiv2 = document.createElement('div');
const priceElement2 = document.createElement('p');
const nameElement2 = document.createElement('p');

let isProductAdded = false;
 const priceTotal = document.createElement('p');
let a;
let b;





function sum(num1){
 total = total+num1
 return  total;
}

function sub(num2){
  total= total-num2
   return total ;
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
function tot(){
   itemTotal.textContent =`Total: ${total.toFixed(2)}`
   allTotal.innerHTML = "";
 
   allTotal.appendChild(itemTotal)
   allTotal.style.color = 'red'
 

}


but1.addEventListener('click', function () {
    if (isProductAdded) return; // Exit early if product is already added
    
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((product) => {
                
                if (product.name === 'Waffle with Berries' && product.price ===6.50) {
                    // const productDiv = document.createElement('div');
                 let value = 1;
                    foundItem2 = parseFloat(product.price.toFixed(2));
                  tot()

                    const nameElement = document.createElement('p');
                    nameElement.textContent = `${value} ${product.name}`;

                    const priceElement = document.createElement('p');
                  priceElement.textContent = `price @ ${foundItem2}  $  `
                    productDiv.appendChild(nameElement);
                    productDiv.appendChild(priceElement);

                    addPrices().then((pricess) => {
                        pricess.some((item) => {
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
                        tot()
                     a = sum(foundItem2)

                      priceElement.textContent = `price: @  ${foundItem2} AT $ ${a}USD `
                      console.log(a)
                      console.log('total is ' ,total)

                


                        value++;
                        nameElement.textContent = `${value} ${product.name}`;


                    });


                    // function resetCartState() {
                    //     isProductAdded = false;  // Allow adding items again
                    //     cartCount = 0;           // Reset cart count
                    //     cartCountElement.textContent = `Your cart (${cartCount})`; // Update cart count display
                        
                    //     // Reset visibility of add button and icons
                    //     svg3.style.display = 'block';
                    //     add.style.display = 'block';
                    //     svg1.style.display = 'none';
                    //     svg2.style.display = 'none';
                    // }






                    svg1.addEventListener('click', function () {
                        console.log('clickerd 22')

                      b = sub(foundItem2)
                       priceElement.textContent = `price: @  ${foundItem2} AT $ ${b}USD `
                      console.log(b)
                    
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

let value2 = 1;
but2.addEventListener('click',function(){
    
    fetch('./data.json')
    .then((response)=>{
    return response.json()
   
    })
    .then((data)=>{
      data.some((shay)=>{
        if(shay.name ==="Vanilla Bean Crème Brûlée" && shay.price ===7.00){
        
            // console.log(shay.name)
            // console.log(shay.price)
            priceElement2.textContent =  `price @ ${shay.price} USD`
           nameElement2.textContent = `${value2} ${shay.name}`;
           
        
           
           productDiv2.appendChild(nameElement2)
           productDiv2.appendChild(priceElement2)
           console.log(productDiv2)
           cart.appendChild(productDiv2)
          
          dvg.style.display = 'none'
          add2 .style.display = 'none'
          d1.style.display = 'block'
           i1 .style.display = 'block'

          
           i1.addEventListener('click',function(){
 
            value2++
            nameElement2.textContent = `${value2} ${shay.name}`
             
              console.log(value2)
              
            })
           
        }
      })
    })
 

})







