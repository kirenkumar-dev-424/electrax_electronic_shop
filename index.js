import products,{filter_products,products_six,filter_one_product,increase_product_stock,decrease_product_stock} from './product.js'
// Backup Old main
var old_main=document.querySelector('main')
var old_main_content=old_main.innerHTML

let user=false

// Register
document.getElementById('register-form').addEventListener('submit',register)
function register(event){
    event.preventDefault();
    const fullname=document.getElementById('register-fullname').value
    const username=document.getElementById('register-username').value
    const password=document.getElementById('register-password').value
    const cpassword=document.getElementById('register-cpassword').value
    if(fullname.length>=3 && username.length>=5 && password==cpassword && password.length>=8 && password.length<=15){
        alert("Registration successful!")
        window.localStorage.fullname=fullname
        window.localStorage.username=username
        window.localStorage.password=password
        closeSignup()
        login()
    }
    else{
        alert("Please enter correct information!")
        signup()
    }
}

// User authentication
document.getElementById('login-form').addEventListener('submit',authenticate)
function authenticate(event){
    event.preventDefault();
    const username=document.getElementById('login-username').value
    const password=document.getElementById('login-password').value
    console.log(username,password)
    if(username===window.localStorage.username && window.localStorage.password){
        alert("Login successful!")
        user=true
        closeLogin()
        document.getElementById('signup-list').style.display='none'
        document.getElementById('login-list').innerHTML=""
        document.getElementById('login-list').innerText=`Hello, ${window.localStorage.fullname}`
    }
    else{
        alert("User name or password is invalid!")
    }
}

// ------------------------
// Slider
// ------------------------
var slider_value=0
var slider_count=1
// This is for initial
if(slider_count==1 && slider_value==0){
  slide('0vw','button-1')  
}
else if(slider_count==2 && slider_value==100){
    slide('-100vw','button-2')  
}
else if(slider_count==3 && slider_value==200){
    slide('-200vw','button-3')  
}
else if(slider_count==4 && slider_value==300){
    slide('-300vw','button-4')  
}
// Auto slider
setInterval(() => {
    if(slider_count==1 && slider_value==0){
        slide('0vw','button-1')  
    }
    else if(slider_count==2 && slider_value==100){
        slide('-100vw','button-2')  
    }
    else if(slider_count==3 && slider_value==200){
        slide('-200vw','button-3')  
    }
    else if(slider_count==4 && slider_value==300){
        slide('-300vw','button-4')  
    }
    // increment
    slider_value+=100
    slider_count++
    if((slider_count>4 || slider_count<1) && (slider_value > 300 || slider_value<0)){
        slider_count=1
        slider_value=0
    }
}, 3000);

// Manual slider by slider button
document.getElementById('button-1').addEventListener('click',()=>{
    slide('0vw','button-1')
})
document.getElementById('button-2').addEventListener('click',()=>{
    slide('-100vw','button-2')
})
document.getElementById('button-3').addEventListener('click',()=>{
    slide('-200vw','button-3')
})
document.getElementById('button-4').addEventListener('click',()=>{
    slide('-300vw','button-4')
})

// Manual slider by arrow button
// Left arrow
document.getElementById('arrow-button-left').addEventListener('click',()=>{
    slider_count-=2
    slider_value-=200
    if(slider_count<1 && slider_value<0){
        slider_count=4
        slider_value=300
    }
    if((slider_count>4) && (slider_value > 300)){
        slider_count=1
        slider_value=0
    }
    if(slider_count==1 && slider_value==0){
        slide('0vw','button-1')  
    }
    else if(slider_count==2 && slider_value==100){
        slide('-100vw','button-2')  
    }
    else if(slider_count==3 && slider_value==200){
        slide('-200vw','button-3')  
    }
    else if(slider_count==4 && slider_value==300){
        slide('-300vw','button-4')  
    }
})

// Right arrow
document.getElementById('arrow-button-right').addEventListener('click',()=>{
    slider_count+=1
    slider_value+=100
    if((slider_count>4 || slider_count<1) && (slider_value > 300 || slider_value<0)){
        slider_count=1
        slider_value=0
    }
    if(slider_count==1 && slider_value==0){
        slide('0vw','button-1')  
    }
    else if(slider_count==2 && slider_value==100){
        slide('-100vw','button-2')  
    }
    else if(slider_count==3 && slider_value==200){
        slide('-200vw','button-3')  
    }
    else if(slider_count==4 && slider_value==300){
        slide('-300vw','button-4')  
    }
})
// Manual slide function
function slide(margin_val,button){
    document.getElementById(`button-1`).style.backgroundColor='#fafafa'
    document.getElementById(`button-2`).style.backgroundColor='#fafafa'
    document.getElementById(`button-3`).style.backgroundColor='#fafafa'
    document.getElementById(`button-4`).style.backgroundColor='#fafafa'

    document.getElementById(button).style.backgroundColor='#0788BD'
    document.getElementById('carousel-slider').style.transition='200ms'
    document.getElementById('carousel-slider').style.marginLeft=margin_val
}
// ------------------------------------------------------------------------
// Index page
var categories_list=[
  "Mobile Phones",
  "Smartwatches",
  "Laptops",
  "SSDs",
  "Pen Drives",
  "Tablets",
  "Headphones",
  "Bluetooth Speakers"
]
// Time
var days=5
var hrs=11
var minutes=12
var seconds=59

setInterval(()=>{
    seconds--
    if(seconds<=0){
        seconds='00'
    }
    document.getElementById('seconds').innerText=seconds
    if(seconds=='00'){
        seconds=60
        minutes--
    }
    document.getElementById('minutes').innerText=minutes
    if(minutes<=0){
        minutes=59
        hrs--
    }
    document.getElementById('hours').innerText=hrs
    if(hours<=0){
        hrs=24
        days--
    }
    document.getElementById('days').innerText=days
},1000)
// Order list
var orders_list=[]
// Final checkout
var final_checkout_product;

// Add to wishlist
var wishlist_count=0
document.getElementById('wishlist-count').innerText= wishlist_count
var wishlist={}
var wishlist_list=[]
var final_wishlist_products=[]
async function addToWishlist(id){
    let heart=document.getElementById(id).innerHTML
    let product=await filter_one_product(id)
    if(!user){
        login()
    }
    else if(!wishlist[id] && heart != `<i class="bi bi-heart-fill"></i>`){
        // add to wishlist
        wishlist[id]=await product[0];
        wishlist_list.unshift(id)
        document.getElementById(id).innerHTML=`<i class="bi bi-heart-fill"></i>`
    }
    else{
        // remove from wishlist
        let index=wishlist_list.indexOf(id)
        wishlist_list.splice(index,1)
        delete wishlist[id]
        document.getElementById(id).innerHTML=`<i class="bi bi-heart"></i>`
    }
    wishlistProducts()
    wishlist_count=wishlist_list.length
    document.getElementById('wishlist-count').innerText=wishlist_count
}
function wishlistProducts(){
    final_wishlist_products=[]
    wishlist_list.forEach((key)=>{
        final_wishlist_products.push(wishlist[key])
    })
    wishlistFunc()
    console.log(final_wishlist_products)
}

// Add to cart
var quantity_count=1
var cart_product_count=0
document.getElementById('cart-count').innerText=cart_product_count
var cart={}
var cart_product_list=[]
var final_cart_products=[]
async function addToCart(id,quantity){
    let product=await filter_one_product(id)
    if(!user){
        login()
    }
    else if(cart[id]){
        cart[id]['quantity']=cart[id]['quantity']+quantity
    }
    else{
        cart[id]=await product[0];
        cart[id]['quantity']=quantity;
        cart_product_list.unshift(id)
        cart_product_count=cart_product_list.length
    }
    cartProducts()
    document.getElementById('cart-count').innerText=cart_product_count
}
function cartProducts(){
    final_cart_products=[]
    cart_product_list.forEach((key)=>{
        final_cart_products.push(cart[key])
    })
    cartFunc()
    let not_available=document.getElementById('not-available')
    not_available.style.display='none'
    console.log(final_cart_products)
}

// Products
async function get_products(element,product_category){
    try{
        var response_data=await filter_products(product_category)
        var products_element=document.getElementById(element)
        products_element.innerHTML=""
        response_data.forEach(e => {
            if(true){
                let card=document.createElement('div')
                card.className='product-card'
                card.innerHTML=`
                <div class="product-img">
                                <img src="${e.thumbnail}" alt="">
                            </div>
                            <div class="product-details">
                                <p><a id="product-name" onclick="window.buyProduct('${e.id}')">${e.name}</a></p>
                                <p id="price"><b>${e.price}</b> <span id="old-price"> <del>${e.originalPrice}</del></span></p>
                                <div class="stock">
                                    <p>Stock left</p>
                                    <p>${e.stock} <span style="color: rgb(48, 47, 47);">Pcs</span></p>
                                </div>
                            </div>
                            <!-- <div class="save">Save - ₹3599</div> -->
                            <button id="add-to-cart" onclick="window.addToCart('${e.id}',1)"><i class="bi bi-cart-plus"></i></button>
                            <div id="offer"><span>${e.discount}</span></div>
                            <div id="wishlist">
                                <span onclick="window.addToWishlist('${e.id}')">
                                    <button id="${e.id}"><i class="bi bi-heart"></i></button>
                                    <!-- <i class="bi bi-heart-fill"></i> -->
                                </span>
                            </div>
                `
                products_element.appendChild(card)

            }
        });
    }
    catch(error){
        console.error(error);
        
    }
}
get_products('smartphones','Smartphones')
get_products('laptops','Laptops')
get_products('tablets','Tablets')
get_products('smartwatch','Smartwatches')

// categories
let categories=document.getElementById('categories')
categories.innerHTML=""
categories_list.forEach((e)=>{
    let card=document.createElement('button')
    card.className='category-card'
    card.innerHTML=`<p>${e}</p>`
    card.style.color='white'
    categories.appendChild(card)
})


// products()
// products_six()
// filter_products('smartphones')
// filter_one_product('itm2447619e17d87')
// increase_product_stock('itm2447619e17d87',5)
// decrease_product_stock('itm2447619e17d87',10)

//Return Home page
document.getElementById('home-button').addEventListener('click',home)
document.getElementById('logo').addEventListener('click',home)
function home(){
    let new_main=document.querySelector('main')
    new_main.innerHTML=old_main_content
    get_products('smartphones','Smartphones')
    get_products('laptops','Laptops')
    get_products('tablets','Tablets')
    get_products('smartwatch','Smartwatches')
}

// Login
let login_button=document.getElementById('login-button')
login_button.addEventListener('click',()=>login())
function login(){
    let saved_user=window.localStorage.username
    let saved_pass=window.localStorage.password
    console.log(saved_pass)
    console.log(saved_user)
    if(saved_user && saved_pass){
        document.getElementById('login-username').value=saved_user
        document.getElementById('login-password').value=saved_pass
    }
    else{
        document.getElementById('login-username').value=""
        document.getElementById('login-password').value=""
    }
    document.querySelector('main').innerHTML=""
    let login_section=document.getElementById('login-section')
    login_section.style.display='block'
    closeSignup()
}
let close_login=document.getElementById('close-login')
close_login.addEventListener('click',closeLogin)
function closeLogin(){
    let login_section=document.getElementById('login-section')
    login_section.style.display='none'
    home()
}

// Signup
let signup_button=document.getElementById('signup-button')
signup_button.addEventListener('click',signup)
function signup(){
    document.querySelector('main').innerHTML=""
    let signup_section=document.getElementById('signup-section')
    signup_section.style.display='block'
}
let close_signup=document.getElementById('close-signup')
close_signup.addEventListener('click',closeSignup)
function closeSignup(){
    let login_section=document.getElementById('signup-section')
    login_section.style.display='none'
    home()
}

// Cart
let cart_button=document.getElementById('cart-button')
cart_button.addEventListener('click',openCart)
let cart_button_2=document.getElementById('cart-button-2')
cart_button_2.addEventListener('click',openCart)
function openCart(){
    let cart_section=document.getElementById('cart-section')
    cart_section.style.display='block'
}

let close_cart=document.getElementById('close-cart')
close_cart.addEventListener('click',closeCart)
function closeCart(){
    let cart_section=document.getElementById('cart-section')
    cart_section.style.display='none'
}

// Wishlist

let wishlist_button=document.getElementById('wishlist-button')
wishlist_button.addEventListener('click',openWishlist)
function openWishlist(){
    let wishlist_section=document.getElementById('wishlist-section')
    wishlist_section.style.display='block'
}

let close_wishlist=document.getElementById('close-wishlist')
close_wishlist.addEventListener('click',closeWishlist)
function closeWishlist(){
    let wishlist_section=document.getElementById('wishlist-section')
    wishlist_section.style.display='none'
}

// search button
let search_button=document.getElementById('search-button-2')
search_button.addEventListener('click',openSearch)
var count=0
function openSearch(){
    count++
    let search_form=document.getElementById('search-form')
    search_form.style.visibility='visible'
    search_form.style.zIndex='900'
    search_form.style.top='0px'
    search_form.style.position='fixed'
    search_form.style.padding='20px 10px'
    if(search_form.style.visibility=='visible' && count%2==0)
        search_form.style.visibility='hidden'
}

// Search products
let search_form=document.getElementById('search-form')
search_form.addEventListener('submit',()=>filterProducts(event))
async function filterProducts(event){
    event.preventDefault()
    try{
        let main=document.querySelector('main')
        // main.innerHTML=""
        let element=document.createElement('div')
        element.className='products'
        element.style.overflowX='unset'
        // element.style.justifyContent='left'
        element.style.gap="35px"
        element.style.flexWrap='wrap'
        let search_value=document.getElementById('search').value
        var response_data=await filter_products(search_value)
        element.innerHTML=""
        response_data.forEach(e => {
            if(true){
                let card=document.createElement('div')
                card.className='product-card'
                card.innerHTML=`
                <div class="product-img">
                                <img src="${e.thumbnail}" alt="">
                            </div>
                            <div class="product-details">
                                <p><a style="cursor:pointer;" onclick="window.buyProduct('${e.id}')">${e.name}</a></p>
                                <p id="price"><b>${e.price}</b> <span id="old-price"> <del>${e.originalPrice}</del></span></p>
                                <div class="stock">
                                    <p>Stock left</p>
                                    <p>${e.stock} <span style="color: rgb(48, 47, 47);">Pcs</span></p>
                                </div>
                            </div>
                            <!-- <div class="save">Save - ₹3599</div> -->
                            <button id="add-to-cart" onclick="window.addToCart('${e.id}',1)"><i class="bi bi-cart-plus"></i></button>
                            <div id="offer"><span>${e.discount}</span></div>
                            <div id="wishlist">
                                <span onclick="window.addToWishlist('${e.id}')">
                                    <button id="${e.id}"><i class="bi bi-heart"></i></button>
                                    <!-- <i class="bi bi-heart-fill"></i> -->
                                </span>
                            </div>
                `
                element.appendChild(card)

            }
        });
        main.innerHTML=""
        if(response_data.length=0){
            let h=document.createElement('h1')
            h.innerText='No Product Available'
            h.style.textAlign='center'
            h.style.color='grey'
            main.appendChild(h)
        }
        else{ 
            main.appendChild(element)
        }
    }
    catch(error){
        let main=document.querySelector('main')
        main.innerHTML=""
        console.error(error);
        let h=document.createElement('h1')
        h.innerText='No Product Available'
        h.style.textAlign='center'
        h.style.color='grey'
        main.appendChild(h)
    }
}

// Buy product
async function buyProduct(id){
    let filter_one=await filter_one_product(id)
    // Main
    let main=document.querySelector('main')
    main.innerHTML=""

    // Section
    let section=document.createElement('section')
    section.id="buy-product-section"

    // Back button
    let button=document.createElement('button')
    button.id="back"
    button.addEventListener('click',home)
    button.innerHTML=`<i class="bi bi-arrow-left"></i>`
    section.appendChild(button)

    // Big image
    var big_img_url=filter_one[0].images[0]
    // small images
    var img_whole_div=document.createElement('div')
    filter_one[0].images.forEach((val)=>{
        var img_div=document.createElement('div')
        img_div.id='img-div'
        var img=document.createElement('img')
        img.src=val
        img.alt="Products"
        img_div.appendChild(img)
        img_whole_div.appendChild(img_div)
    })

    //Highlights 
    var ul=document.createElement('ul')
    ul.id="highlights"
    filter_one[0].details.highlights.forEach((val)=>{
        let li=document.createElement('li')
        li.innerText=val
        ul.appendChild(li)
    })
    // Reset quantity count
    quantity_count=1
    // product details
    let div=document.createElement('div')
    div.id="product-images"
    div.innerHTML=`
    <div id="image-box">
                <div class="big-image" id="big-img">
                    <img src="${big_img_url}" alt="">
                </div>
                <div class="small-image">
                    <div><i class="bi bi-caret-up"></i></div>
                    ${img_whole_div.outerHTML}
                    <div><i class="bi bi-caret-down"></i></div>
                </div>
            </div>
            <div id="content-box">
                <h3>${filter_one[0].name}</h3>
                <p id="review-box">
                    <span id="review">${filter_one[0].rating}</span> 
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <span>(${filter_one[0].reviewCount})</span>
                </p>
                <p id="product_price"><span>${filter_one[0].price}</span> <del>${filter_one[0].originalPrice}</del> <span id="offer_value">${filter_one[0].discount}</span></p>
                <p id="product-description">${filter_one[0].details.description}</p>
                ${ul.outerHTML}
                <div id="button-box">
                    <div class="buttons">
                        <div>
                            <button onclick="window.decreaseQuantity('${filter_one[0].id}')"><i class="bi bi-dash-lg"></i></button>
                            <p id="quantity_count">${quantity_count}</p>
                            <button onclick="window.increaseQuantity('${filter_one[0].id}')"><i class="bi bi-plus-lg"></i></button>     
                        </div>
                    </div>
                    <div class="buttons">
                        <button onclick="finalCheckout('${filter_one[0].id}')">BUY</button>
                    </div>
                    <div class="buttons">
                        <button id="add-to-cart-button" onclick="window.addToCartButton('${filter_one[0].id}')">ADD TO CART</button>
                    </div>
                </div>

            </div>
    `
    filter_one[0].images.forEach(()=>{
        
    })
    main.innerHTML=""
    section.appendChild(div)
    main.appendChild(section)
}
// addToCartButton

async function increaseQuantity(id){
    let product=await filter_one_product(id)
    if(quantity_count<product[0]['stock'] && document.getElementById("quantity_count")){
        let q=document.getElementById("quantity_count")
        quantity_count++
        q.innerText=quantity_count
        priceCal(product[0]['price'])
    }
}
async function decreaseQuantity(id){
    let product=await filter_one_product(id)
    if(quantity_count>1 && document.getElementById("quantity_count")){
        let q=document.getElementById("quantity_count")
        quantity_count--
        q.innerText=quantity_count
        priceCal(product[0]['price'])
    }
}
function addToCartButton(id){
    document.getElementById('add-to-cart-button').innerText="Added to cart"
    addToCart(id,quantity_count)
    setTimeout(()=>{
        document.getElementById('add-to-cart-button').innerText="Add to cart"
    },2000)
    console.log(cart)
}

var total_price;
// Final to buy
async function finalCheckout(id){
    let main=document.querySelector('main')
    main.innerHTML=""
    let product=await filter_one_product(id)
    total_price=priceCal(product[0].price)
    let section=document.createElement('section')
    let div=document.createElement('div')
    div.id='product_info'
    div.innerHTML=`
    <div id="product_box">
            <div>
                <img src="${product[0].thumbnail}" alt="">
            </div>
            <div>
                <h3>${product[0].name}</h3>
                <div class="buttons">
                    <div>
                        <p id="quantity_count">${product[0].price} X${quantity_count}</p>    
                    </div>                 
                </div>
            </div>
    </div>
    <div id="amount">
    <p>Tax: <span>₹0<span></p>
    <br>
    <p>Total: <span>₹${total_price}<span></p>
    </div>
    <div><button id="checkout" onclick="addToOrder('${product[0].id}', ${quantity_count}, ${total_price})">CHECKOUT</button></div>
    `
    section.appendChild(div)
    main.appendChild(section)

}
function priceCal(price){
    total_price=strToNumber(price)*quantity_count
    return total_price
}
function strToNumber(price){
    let new_price=''
    for(let i of price){
        if(i=='₹' || i==',' || i==' '){
            continue;
        }
        new_price+=i
    }
    Number(new_price)
    return new_price
}

async function addToOrder(id,quantity,total){
    alert("Order placed successfully!")
    let product=await filter_one_product(id)
    product[0]["quantity"]=quantity
    product[0]["total"]=total
    orders_list.push(product[0])
    console.log('Orders:',orders_list)
    home()
    
}
var cart_list=[]
function cartFunc(){
    let total_amount=0
    let cart_section=document.getElementById('cart-section')
    let div=document.createElement('div')
    div.id='cart-items'

    let div1=document.createElement('div')
    div1.id="cart-products"
    console.log("cart:",final_cart_products)
    final_cart_products.forEach((val)=>{
        val['total']=strToNumber(val.price)
        total_amount+=Number(val['total'])
        cart_list.push(val)
        let div2=document.createElement('div')
        div2.className="cart_product_card"
        div2.innerHTML=`
        <div><img src="${val.thumbnail}" alt=""></div>
                        <div>
                            <p>${val.name}</p>
                            <div class="bottom">
                                <div>
                                    <p style='text-align:right' id="quantity_count">${val.price} X${val.quantity}</p>    
                                </div> 
                            </div>
                        </div>
        `
        div1.appendChild(div2)
    })

    div.appendChild(div1)
    let button_div=document.createElement('div')
    button_div.innerHTML=`
    <p style='text-align:right;'>Total: ₹ ${total_amount}</p>
    <button id="checkout" onclick="placeOrder()">CHECKOUT</button>
    `
    div.appendChild(button_div)
    let cart_container=document.getElementById('cart-container')
    cart_container.innerHTML=`${div.outerHTML}`
    cart_section.appendChild(cart_container)
}

function wishlistFunc(){
    let total_amount=0
    let cart_section=document.getElementById('wishlist-section')
    let div=document.createElement('div')
    div.id='wishlist-items'

    let div1=document.createElement('div')
    div1.id="wishlist-products"
    console.log("cart:",final_cart_products)
    final_wishlist_products.forEach((val)=>{
        val['total']=strToNumber(val.price)
        total_amount+=Number(val['total'])
        cart_list.push(val)
        let div2=document.createElement('div')
        div2.className="cart_product_card"
        div2.innerHTML=`
        <div><img src="${val.thumbnail}" alt=""></div>
                        <div>
                            <p>${val.name}</p>
                            <br>
                            <a id="buy-button" style="cursor:pointer;" onclick="window.buyProduct('${val.id}')">Buy Product</a>
                        </div>
        `
        div1.appendChild(div2)
    })

    div.appendChild(div1)
    let cart_container=document.getElementById('cart-container')
    cart_container.innerHTML=`${div.outerHTML}`
    cart_section.appendChild(cart_container)
}

if(!user){
    let cart_section=document.getElementById('cart-section')
    let div=document.createElement('div')
    div.id="not-available"
    div.innerText="No cart products"
    div.style.padding="20px 0px"
    div.style.textAlign='center'
    cart_section.appendChild(div)
}

function placeOrder(){
    final_cart_products.forEach((val)=>{
        orders_list.push(val)
    })
    // orders_list=[...orders_list,cart_list]
    alert("Order placed successfully!")
    console.log(orders_list)
}
// Add function to window global object
window.login=login
window.signup=signup
window.buyProduct=buyProduct;
window.home=home;
window.addToWishlist=addToWishlist;
window.addToCart=addToCart;
window.increaseQuantity=increaseQuantity;
window.decreaseQuantity= decreaseQuantity;
window.addToCartButton=addToCartButton;
window.authenticate=authenticate;
window.finalCheckout=finalCheckout;
window.priceCal=priceCal;
window.addToOrder=addToOrder;
window.placeOrder=placeOrder;