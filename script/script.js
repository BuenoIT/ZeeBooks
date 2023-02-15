/*
  Program id: script.js
  Program purpose: Dynamic website algorithm that allows users to add products and get results based on their inputs.

  Program revision:
      Guilherme Bueno, 2023-02-14: Created
      Guilherme Bueno, 2023-02-15: Review
*/

// Initialization of general variables

let articleList = document.querySelector('.article-list');
let myCartOverview = document.querySelector('.my-cart-overview');
let myErrors = document.querySelector('.error-message');
let successMessage = document.querySelector('.success-message');
let myPurchaseForm = document.querySelector('.my-purchase-form');
let myReceipt = document.querySelector('.my-receipt');
let myMessages = document.querySelector('.messages-checkout');
let aboutUs = document.querySelector('.about-us');
let errorsMessage;
let cart = [];
let quantity = 0;

// During the first load of the website, the following divs will not be visible
myErrors.style.display = 'none';
successMessage.style.display = 'none';
myPurchaseForm.style.display = 'none';
myReceipt.style.display = 'none';

// To display itens to the main area based on the itens registered in the article.js file
$('.article-list').addClass('container');

articlesJson.map((element, index) => {
  $('.article-list').addClass('row');
  $('.article-list').append(`
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 article-item mb-3" key="${element.id}" price="${element.price}" name="${element.name}" key-index="${index}"> 
        <div class="article-list--name h4 mb-2">${element.name} </div> 
        <div class="article-list--img"><img src="${element.img}" alt="${element.name} image"></div>
        <a href="#" class="article-list--description--onclick mt-2 mb-2">Show Details</a>
        <div class="article-list--description mt-2 mb-2">
          ${element.description}
        </div>
        <div class="article-list--price mt-2 mb-2 h5">$${element.price}</div>
        <a href="#" class="add-btn"><div class="article-list--add mt-2 mb-2" >+</div></a>
        <div class="article-list--add-cart input-group mt-2 mb-2">
          <input type="text" class="form-control" placeholder="Type Quantity" class="inputValue" name="value"></input> 
          <div class="input-group-append">
            <a class="btn btn-outline-secondary article-list--btn-add">Add</a>
          </div>
        </div>
    </div>`);
});

//Toggle Description - Hide and Appear on click
$('.article-list--description').hide();
$('.article-list--description--onclick').click(function (event) {
  event.preventDefault();
  $(this).next($('.article-list--description')).toggle();
});

//Toggle Button Add to Cart - Hide and Appear on click
$('.article-list--add-cart').hide();
$('.add-btn').click(function (event) {
  event.preventDefault();
  $(this).next($('.article-list--add-cart')).toggle();
});

//Add values to cart
$('.article-list--btn-add').click(function (event) {
  event.preventDefault();
  addValuesToCart(
    $(this).closest('.article-item').attr('key'),
    $(this).closest('.article-item').find("input[name='value']").val(),
    $(this).closest('.article-item').attr('name'),
    $(this).closest('.article-item').attr('price')
  );
});

// The number of products added to the cart will be displayed and updated in the header
function calculateQuantityOnCart() {
  if (cart.length == 0) {
    document.querySelector('.quantity-cart').innerHTML = `<p>0</p>`;
  } else {
    productsOnCart = cart.reduce(function (acc, obj) {
      return acc + obj.articleQuantity;
    }, 0);
    document.querySelector(
      '.quantity-cart'
    ).innerHTML = `<p>${productsOnCart}</p>`;
  }
}

// A call to the function to update the values in the shopping cart on the first load of the website
calculateQuantityOnCart();

// Verify that the add-to-cart field contains accurate information (just numbers)
function numberValidation(value) {
  numberPattern = /^[1-9]+[0-9]*$/;
  return numberPattern.test(value);
}

// Adding values to the cart after user input. This adds the properties to the cart array.
function addValuesToCart(index, quantity, name, price) {
  let errorsMessage = document.querySelector('.error-message');
  if (numberValidation(quantity) == true) {
    price;
    quantity = parseInt(quantity);
    cart.push({
      articleIndex: index,
      articleName: name,
      articleQuantity: quantity,
      articlePrice: price,
      articleTotal: quantity * price,
    });
    successMessage.innerHTML = `The cart was successfully filled with ${quantity} units of ${name} .`;
    successMessage.style.display = '';
    errorsMessage.style.display = 'none';
  } else {
    errorsMessage.innerHTML = `It appears that you entered the article ${name} incorrectly and it wasn't added to your cart.`;
    errorsMessage.style.display = '';
    successMessage.style.display = 'none';
  }
  calculateQuantityOnCart(); // Update the cart quantity on the header after user input.
  $('.article-list--add-cart').hide(); // Hide add input field.
}

// Changing the state and appearance of specific classes by storing them in variables
let myCart = document.getElementById('my-cart');

// It changes the informations displayed in the main area. It will display just informations related to the shopping cart.
function displayCart() {
  myCartOverview.innerHTML = '';
  articleList.style.display = 'none';
  myCartOverview.style.display = '';
  myErrors.style.display = 'none';
  myPurchaseForm.style.display = 'none';
  myReceipt.style.display = 'none';
  successMessage.style.display = 'none';
  aboutUs.style.display = 'none';
  printCartProducts();
}

// It changes the informations displayed in the main area. It will display just informations related to the shopping cart.
function printCartProducts() {
  if (cart.length == 0) {
    myCartOverview.innerHTML =
      '<div class="d-flex align-items-center"><p class="h3" id="no-items">It appears that there are no items currently in your cart.</p><img id="sad-image" src="feeling-sad.png" alt="sad image"></div><br /> <br /><br /><br /> ';
  } else {
    var tableCart =
      "<div class='w-75 mx-auto'><p class='h3 mb-1'> Take a look at the items in your cart below. </p><br/><br/><table class='table table-hover' border='1|1'>"; //To create a table by interact through cart array.
    tableCart += '<thead>';
    tableCart += '<tr>';
    tableCart += '<th scope="col">' + '#' + '</th>';
    tableCart += '<th scope="col">' + 'Article Name' + '</th>';
    tableCart += '<th scope="col">' + 'Quantity' + '</th>';
    tableCart += '<th scope="col">' + 'Price' + '</th>';
    tableCart += '<th scope="col">' + 'Total' + '</th>';
    tableCart += '</tr>';
    tableCart += '</thead>';
    tableCart += '<tbody>';
    for (var i = 0; i < cart.length; i++) {
      tableCart += '<tr>';
      tableCart += '<th scope="row">' + i + '</th>';
      tableCart += '<td>' + cart[i].articleName + '</td>';
      tableCart += '<td>' + cart[i].articleQuantity + '</td>';
      tableCart += '<td>' + '$' + cart[i].articlePrice + '</td>';
      tableCart += '<td>' + '$' + cart[i].articleTotal.toFixed(2) + '</td>';
      tableCart += '</tr>';
    }
    tableCart += '</tbody>';
    tableCart += '</table></div> <br/><br/>';
    myCartOverview.innerHTML += tableCart;

    // to calculate the total amount stored in the cart array.
    totalAmount = cart.reduce(function (acc, obj) {
      return acc + obj.articleTotal;
    }, 0);

    // to calculate the total amount plus donation stored in the cart array (10% donation)
    totalAmountPlusDonationVariable = cart.reduce(function (acc, obj) {
      return acc + obj.articleTotal * 1.1;
    }, 0);

    // to calculate the total amount plus donation stored in the cart array ($10 donation)
    totalAmountPlusDonationFixed = totalAmount + 10;

    //If total donation by percentual is higher than $10 flat, user will pay 10% over the total. If not, user will pay $10 flat.
    if (totalAmountPlusDonationFixed > totalAmountPlusDonationVariable) {
      myCartOverview.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h4 mx-auto">Your amount is ${totalAmount} </p></div>`;
      myCartOverview.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h4 mx-auto">Your total amount with $10 donation is $${totalAmountPlusDonationFixed.toFixed(
        2
      )}</p></div><br/>`;
    } else {
      myCartOverview.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h5">Your amount is $${totalAmount.toFixed(
        2
      )}</p></div>`;
      myCartOverview.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h4">Your total amount with 10% donation is $${totalAmountPlusDonationVariable.toFixed(
        2
      )}</p></div><br/>`;
    }

    // Create a button to proceed to next step of shopping in the ecommerce (payment)
    myCartOverview.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><button class="btn btn-primary" onclick="proceedToPayment()" id="proceed">Proceed to Payment</button> </div><br/><br/>`;
  }
}

//Display About Us Page
function displayAboutUs() {
  //reset view to standard
  articleList.style.display = 'none';
  myCartOverview.style.display = 'none';
  myErrors.style.display = 'none';
  myErrors.style.display = 'none';
  myPurchaseForm.style.display = 'none';
  myReceipt.style.display = 'none';
  successMessage.style.display = 'none';
  aboutUs.style.display = '';

  aboutUs.innerHTML = `<div class="w-75 mx-auto d-flex flex-column"><div class="p-2"> <img src="writer.png" alt"Writer Image"></div> <div class="p-2"><p  class="lead">
  Introducing our revolutionary company, dedicated to selling books not by their cover, but by their content. We firmly believe that knowledge should be accessible to everyone, regardless of their financial status or geographic location.

We are proud to offer a vast selection of books from a wide range of genres, including history, philosophy, science, literature, and many more. Each book has been carefully selected for its quality and depth of information, ensuring that our customers receive the best possible value for their money.

Our mission is to disseminate knowledge around the world, and we do so by making our books available at a fair price. We believe that education should not come at an exorbitant cost, which is why we have implemented a pricing strategy that makes our books affordable for everyone.

In addition to our affordable pricing, we have also made it easy for our customers to access our books, regardless of their location. We offer a convenient online store, which allows customers to purchase and download digital versions of our books from anywhere in the world.

We understand that not everyone has access to the latest technology, which is why we also offer traditional print copies of our books. These can be shipped anywhere in the world, ensuring that our customers have access to our knowledge, no matter where they live.

At our company, we are passionate about making knowledge accessible to everyone, and we believe that our unique approach to book sales is the perfect way to achieve this goal. 
  </p> <p> <strong> Join us on our mission to disseminate knowledge and improve the world, one book at a time.</strong></p></div></div>`;
}

// To display product list when user clicks to return to the main page.
function displayProductList() {
  articleList.style.display = '';
  myCartOverview.style.display = 'none';
  myCartOverview.innerHTML = '';
  myErrors.style.display = '';
  myErrors.innerHTML = '';
  myReceipt.innerHTML = '';
  myErrors.style.display = 'none';
  myPurchaseForm.style.display = 'none';
  myMessages.innerHTML = '';
  myReceipt.style.display = 'none';
  aboutUs.style.display = 'none';
}

// Function to validate name input
function nameValidation(value) {
  namePattern = /[^0-9]/;
  return namePattern.test(value);
}

// Function to validate email input
function emailValidation(value) {
  emailPattern = /\S+@\S+\.\S+/;
  return emailPattern.test(value);
}

// Function to validate credit card number input
function creditCardValidation(value) {
  creditCardPattern = /\d{4}-\d{4}-\d{4}-\d{4}/;
  return creditCardPattern.test(value);
}

// Function to validate credit card month name input
function creditCardMonthValidation(value) {
  creditCardMonthPattern = /[A-Z][A-Z][A-Z]/;
  return creditCardMonthPattern.test(value);
}

// Function to validate credit card year number input
function creditCardYearValidation(value) {
  creditCardYearPattern = /\d{4}/;
  return creditCardYearPattern.test(value);
}

// Function to print the receipt for the user based on the information from cart array.
function printReceipt() {
  myPurchaseForm.style.display = '';
  articleList.style.display = 'none';
  myCartOverview.style.display = 'none';
  myPurchaseForm.style.display = '';
  myReceipt.innerHTML = '';
  myMessages.innerHTML = '';
  myErrors.style.display = 'none';
  successMessage.style.display = 'none';

  document.getElementById('email').style.backgroundColor = 'white';
  document.getElementById('name').style.backgroundColor = 'white';
  document.getElementById('creditCard').style.backgroundColor = 'white';
  document.getElementById('creditCardExpireMonth').style.backgroundColor =
    'white';
  document.getElementById('creditCardExpireYear').style.backgroundColor =
    'white';

  myErrors.innerHTML = '';
  let fullName = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let creditCardNumber = document.getElementById('creditCard').value;
  let creditCardExpireMonth = document.getElementById(
    'creditCardExpireMonth'
  ).value;
  let creditCardExpireYear = document.getElementById(
    'creditCardExpireYear'
  ).value;

  if (nameValidation(fullName)) {
    myReceipt.innerHTML += `<div class="w-75 mx-auto"><p class="h3 mb-1">Dear ${fullName}, here is your receipt: </p><br>`;
  } else {
    myMessages.innerHTML += `<p class="alert alert-danger">The full name field is mandatory, please type valid information.</p>`;
    document.getElementById('name').style.backgroundColor = 'red';
  }
  if (emailValidation(email)) {
    myReceipt.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h5 mb-1">Email: ${email}</p></div>`;
  } else {
    myMessages.innerHTML += `<p class="alert alert-danger">The email field is mandatory, please type valid information.</p>`;
    document.getElementById('email').style.backgroundColor = 'red';
  }
  if (creditCardValidation(creditCardNumber)) {
    myReceipt.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h5 mb-1">Credit Card Number: ${creditCardNumber.replace(
      /.(?=.{4})/g,
      '*'
    )}</p></div>`;
  } else {
    myMessages.innerHTML += `<p class="alert alert-danger">Please input a valid credit card number.</p>`;
    document.getElementById('creditCard').style.backgroundColor = 'red';
  }
  if (creditCardMonthValidation(creditCardExpireMonth)) {
    myReceipt.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h5 mb-1">Credit Expire Month: ${creditCardExpireMonth}</p></div>`;
  } else {
    myMessages.innerHTML += `<p class="alert alert-danger">Please input a valid credit card month.</p>`;
    document.getElementById('creditCardExpireMonth').style.backgroundColor =
      'red';
  }
  if (creditCardYearValidation(creditCardExpireYear)) {
    myReceipt.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h5 mb-1">Credit Expire Year: ${creditCardExpireYear}</p></div><br/><br/>`;
  } else {
    myMessages.innerHTML += `<p class="alert alert-danger">Please input a valid credit card expire year.</p>`;
    document.getElementById('creditCardExpireYear').style.backgroundColor =
      'red';
  }

  if (myMessages.innerHTML == '') {
    myReceipt.style.display = '';
    myPurchaseForm.style.display = 'none';

    var tableCart =
      "<div class='w-75 mx-auto'><table class='table'border='1|1'>";
    tableCart += '<thead>';
    tableCart += '<tr>';
    tableCart += '<th scope="col">' + '#' + '</th>';
    tableCart += '<th scope="col">' + 'Article Name' + '</th>';
    tableCart += '<th scope="col">' + 'Quantity' + '</th>';
    tableCart += '<th scope="col">' + 'Price' + '</th>';
    tableCart += '<th scope="col">' + 'Total' + '</th>';
    tableCart += '</tr>';
    tableCart += '</thead>';
    tableCart += '<tbody>';
    for (var i = 0; i < cart.length; i++) {
      tableCart += '<tr>';
      tableCart += '<th scope="row">' + i + '</th>';
      tableCart += '<td>' + cart[i].articleName + '</td>';
      tableCart += '<td>' + cart[i].articleQuantity + '</td>';
      tableCart += '<td>' + '$' + cart[i].articlePrice + '</td>';
      tableCart += '<td>' + '$' + cart[i].articleTotal.toFixed(2) + '</td>';
      tableCart += '</tr>';
    }
    tableCart += '</tbody>';
    tableCart += '</table></div><br/><br/>';
    myReceipt.innerHTML += tableCart;

    totalAmount = cart.reduce(function (acc, obj) {
      return acc + obj.articleTotal;
    }, 0);
    totalAmountPlusDonationVariable = cart.reduce(function (acc, obj) {
      return acc + obj.articleTotal * 1.1;
    }, 0);
    totalAmountPlusDonationFixed = totalAmount + 10;

    if (totalAmountPlusDonationFixed > totalAmountPlusDonationVariable) {
      myReceipt.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h4 mx-auto">Your amount is ${totalAmount}</div><br />`;
      myReceipt.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h4 mx-auto">Your total amount with $10 donation is $${totalAmountPlusDonationFixed.toFixed(
        2
      )}</div><br />`;
    } else {
      myReceipt.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h4 mx-auto">Your total amount were $${totalAmount.toFixed(
        2
      )}</div><br>`;
      myReceipt.innerHTML += `<div class="w-75 mx-auto mb-2 mt-2"><p class="h4 mx-auto">Your total amount with 10% donation were $${totalAmountPlusDonationVariable.toFixed(
        2
      )}</div></div><br />`;
    }
  } else {
    return;
  }
}

// On the next screen, the payment form is displayed to the user.
function proceedToPayment() {
  myPurchaseForm.style.display = '';
  articleList.style.display = 'none';
  myCartOverview.style.display = 'none';
  myErrors.style.display = 'none';
  myReceipt.innerHTML = '';

  myPurchaseForm.innerHTML = `<div class="w-50 mx-auto">
    <h2>Payment Information:</h2>
    <br>
      <form onsubmit="return false">
        <div class="form-group">
          <label for="name">Full Name:</label>
          <input type="text" class="form-control" name="name" id="name">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" class="form-control" name="email" id="email"  placeholder="email@domain.com">
        </div>
        <p id="credit-card-title">Credit Card:</p>
        <div class="form-group">
          <label for="creditCard">Number:</label>
          <input type="text" class="form-control" name="creditCard" id="creditCard"  placeholder="XXXX-XXXX-XXXX-XXXX">
        </div>
        <div class="form-group">
          <label for="creditCardExpireMonth">Expire Month:</label>
          <input type="text" class="form-control" name="creditCardExpireMonth" id="creditCardExpireMonth" placeholder="MMM">
        </div>
        <div class="form-group">
          <label for="creditCardExpireYear">Expire Year:</label>
        <input type="text" class="form-control" name="creditCardExpireYear" id="creditCardExpireYear" placeholder="YYYY">
        </div>
          <button type="submit" class="btn btn-primary" onclick="printReceipt()" id="printReceipt2">Print Your Receipt</button>
      </form>
  </div>
  <br/>
  <br/>
  `;
}
