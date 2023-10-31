let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let quantity1 = document.querySelector('.quantity1');
let cartItemsEle = document.getElementById("cart-items");
let totalEle = document.getElementById("total");
let valueElement = document.getElementById("value");
let numberElement = document.getElementById("number");
let buttonelement = document.getElementById("button1");
let exp = document.getElementById("addhere");
let iconELement = document.getElementById("copyicon");
let copystatusEle = document.getElementById("copystatus");
let wholecart = document.getElementById("cart");
const orderNowButton = document.getElementById("order-now-button");

$ = function (id) {
    return document.getElementById(id);
}

var show = function (id) {
    $(id).style.display = 'block';
    document.body.style.overflow = "hidden";

}
var hide = function (id) {
    document.body.style.overflow = "visible";
    $(id).style.display = 'none';
}

function copyToClipboard(element) {
    /* Copy text into clipboard */
    navigator.clipboard.writeText
        ("FoodMunch25");
    iconELement.classList.remove("fa-bounce");
    copystatusEle.textContent = "copied";

}

let array = [
    {
        item: "Crispy Corn",
        imageUrl: "images/cripsy_corn.jpeg",
        cost: 10.00
    },
    {
        item: "Chicken Curry",
        imageUrl: "images/Chicken-Curry.webp",
        cost: 20.00
    },
    {
        item: "Chicken Biryani",
        imageUrl: "images/cb.jpeg",
        cost: 30.00
    },
    {
        item: "Chilli mushroom",
        imageUrl: "images/cm.jpeg",
        cost: 25.00
    },
    {
        item: "Chicken pakodi",
        imageUrl: "images/cp.jpeg",
        cost: 33.00
    },
    {
        item: "Chilli paneer",
        imageUrl: "images/cpaneer.jpeg",
        cost: 21.00
    },
    {
        item: "Ice-cream",
        imageUrl: "images/Vanilla-Ice-Cream.webp",
        cost: 26.00
    },

];

let cartItemsArray = [];

var orderNow = function (id) {
    const cartItemsJSON = JSON.stringify(cartItemsArray);
    localStorage.setItem("cartItems", cartItemsJSON);
    if(cartItemsArray.length>0)
    {
        window.location.href = "checkout.html";
    }
    else{
        $(id).style.display = 'block';
        document.body.style.overflow = "hidden";
    }
}

function addItemToCartArray(obj) {
    let cartItem = cartItemsArray.forEach(element => {
        if (element.item == obj.item) {
            element.count++;
            return element;
        }
    });

    if (!cartItem) {
        cartItem = { ...obj, count: 1 };
        cartItemsArray.push(cartItem);
    }
}

// function inCartBtnText(cartDetails) {
//     return ((cartDetails ? (cartDetails.count > 99 ? "99+" : cartDetails.count) : 0) + " in Cart");
// }

function getCartItem(itemName) {
    for (let item of cartItemsArray) {
        if (item.item == itemName) {
            return item;
        }
    }
}

function addtomenu(obj) {
    let costvalue = totalEle.textContent;
    let count;
    let { item, imageUrl, cost } = obj;
    let divelement1 = document.createElement("div");
    let divelement2 = document.createElement("div");
    divelement2.classList.add("h-100");
    let imageEle = document.createElement("img");

    let headerEle = document.createElement("h1");
    headerEle.textContent = item;
    headerEle.classList.add("explore-menu-tittle");
    let buttonEle = document.createElement("button");
    buttonEle.textContent = "Add to Cart";
    buttonEle.value = obj.item
    buttonEle.classList.add("btn", "btn-primary");

    let cartDetails = null;

    let cartText = document.createElement("span");
    cartText.classList.add("btn", "ml-2", "bg-transprent");
    cartDetails = getCartItem(obj.item);
    cartText.textContent = inCartBtnText(cartDetails);

    buttonEle.addEventListener("click", function (event) {
        let parsednumber = parseInt(numberElement.textContent);
        let parsedvalue = parseInt(totalEle.textContent);
        let numberpara = document.getElementById(obj.item);

        let cartDetails = getCartItem(event.target.value);
        
        
        if(numberpara)
        {
        parsednumber++;
        numberElement.textContent = parsednumber;
        parsedvalue = parsedvalue + cost;
        totalEle.textContent = parsedvalue;
        let count = parseInt(numberpara.textContent);
        count++;
            numberpara.textContent = count;
            cartDetails.count = count;
            cartDetails = getCartItem(obj.item);
            if (cartDetails) {
                cartText.textContent = inCartBtnText(cartDetails);
            }
        }
        else{
        parsednumber++;
        numberElement.textContent = parsednumber;
        parsedvalue = parsedvalue + cost;
        totalEle.textContent = parsedvalue;
        let liElement = document.createElement("li");
        let imageELement = document.createElement("img");
        imageELement.src = imageUrl;
        imageELement.style.width = 60 + "px";
        imageELement.classList.add("round-image");
        let h5Element = document.createElement("h5");
        h5Element.textContent = item;
        h5Element.classList.add("h5-element" , "h5width" );
        let paraElement = document.createElement("p");
        paraElement.textContent = cost;
        paraElement.classList.add("h5-element");
        
        //count in cart
        let numberpara = document.createElement("p");
        let spanElement = document.createElement("span");
        spanElement.textContent = "$";
        numberpara.textContent = "1";
        numberpara.id = obj.item
        numberpara.classList.add("numberpara");
        spanElement.classList.add("spanele");

        addItemToCartArray(obj);
        
        //(-)Element
        let minusElement = document.createElement("button");
        minusElement.textContent = "-";
        minusElement.classList.add("signbutton" , "minus")
        minusElement.addEventListener("click", function () {
            count = parseInt(numberpara.textContent);
            count--;
            numberpara.textContent = count;
            if (count <= 0) {
                numberpara.textContent = "0";
            }
            let parsednumber = parseInt(numberElement.textContent);
            if (parsednumber > 0) {
                parsednumber--;
                numberElement.textContent = parsednumber;
            }
            if (count >= 0) {
                let y = parseInt(totalEle.textContent);
                y = y - cost;
                totalEle.textContent = y;
                cartText.textContent = inCartBtnText(getCartItem(item));
            }
        
        let cartDetails = getCartItem(item);

        if (cartDetails && cartDetails.count > 0) {
            
            --cartDetails.count; // Decrease the count in the cart
            cartText.textContent = inCartBtnText(getCartItem(item));
        }

        })
        //(+)Element
        let plusElement = document.createElement("button");
        plusElement.textContent = "+";
        plusElement.classList.add("signbutton");
        plusElement.addEventListener("click", function () {
            count = parseInt(numberpara.textContent);
            count++;
            numberpara.textContent = count;
            let x = parseInt(totalEle.textContent);
            x = x + cost;
            totalEle.textContent = x;

            let parsednumber = parseInt(numberElement.textContent);
            parsednumber++;
            numberElement.textContent = parsednumber;
            cartText.textContent = inCartBtnText(getCartItem(item));
            let cartDetails = getCartItem(item);
            if (cartDetails && cartDetails.count >= 0) {
            
                cartDetails.count++; // Increase the count in the cart
                cartText.textContent = inCartBtnText(getCartItem(item));
            }

        })
        liElement.appendChild(imageELement);
        liElement.appendChild(h5Element);
        liElement.appendChild(spanElement);
        liElement.appendChild(paraElement);
        liElement.appendChild(minusElement);

        liElement.appendChild(numberpara);
        liElement.appendChild(plusElement);
        liElement.classList.add("d-flex", "flex-row", "mb-3", "list");
        cartItemsEle.appendChild(liElement);

        cartDetails = getCartItem(obj.item);
        cartText.textContent = inCartBtnText(cartDetails);

        }
    })
    imageEle.src = imageUrl;

    divelement1.classList.add("col-12", "col-md-6", "col-lg-3", "mb-3");
    divelement2.classList.add("explore-menu-card", "shadow", "mb-3");
    imageEle.classList.add("w-100", "image-border",);
    divelement2.appendChild(imageEle);
    divelement2.appendChild(headerEle);
    divelement2.appendChild(buttonEle);
    divelement2.appendChild(cartText);
    divelement1.appendChild(divelement2);
    exp.appendChild(divelement1);
    function inCartBtnText(cartDetails) {
        return ((cartDetails ? (cartDetails.count > 99 ? "99+" : cartDetails.count) : 0) + " in Cart");
    }

}

for (let each of array) {
    addtomenu(each);
}

wholecart.addEventListener('click', () => {
    body.classList.add('active');
    openShopping.classList.add("none");
    quantity.classList.add("none");
    quantity1.classList.add("none");
})

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
    openShopping.classList.remove("none");
    quantity.classList.remove("none");
    quantity1.classList.remove("none");
})


