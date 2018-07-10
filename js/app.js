// Set focus on first text field on page load
const focusInput = document.querySelectorAll(`input[type=text]`);
focusInput[0].focus();

const jobItem = document.querySelector('#title');
const fieldset = document.querySelector('fieldset');
// Display other text field if Javascript is disabled
const other = document.getElementById('other');
other.style.display = "none";

// Listen to changed item on Job Role dropdown
jobItem.addEventListener("change", () => {
    const textArea = document.createElement('input');
    const otherInput = document.querySelector('#other-title');
    // Add text field if 'Other' is selected from Job Role dropdown menu and focus cursor on new Other field
    if(jobItem.options[jobItem.selectedIndex].value == "other") {
        if (otherInput) {
            otherInput.remove();
        }
        textArea.setAttribute('id', 'other-title');
        textArea.style.display = 'block';
        textArea.style.width = "100%";
        textArea.placeholder = 'Your Job Role';
        fieldset.appendChild(textArea);
        textArea.focus();
    }
    // if 'Other' isn't selected, remove 'Other' input field if it exists
    else if (jobItem.options[jobItem.selectedIndex].value !== "other") {
        if (otherInput) {
            otherInput.remove();
        }
    }
});


// ”T-Shirt Info” section of the form:
// For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');
const colorPuns = document.querySelector(`optgroup[label=color-puns]`);
const colorHeart = document.querySelector(`optgroup[label=color-heart]`);

// Hide shirt color label until t-shirt design theme is selected
const shirtColorDiv = document.getElementById('colors-js-puns');
shirtColorDiv.style.display = "none";

shirtDesign.addEventListener('change', () => {
    // If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    if(shirtDesign.options[shirtDesign.selectedIndex].value === "Select Theme") {
        console.log('Started puns');
        shirtColor.appendChild(colorPuns);
        shirtColor.appendChild(colorHeart);
    } 
    else if(shirtDesign.options[shirtDesign.selectedIndex].value === "js puns") {
        console.log('Started puns');
        shirtColor.appendChild(colorPuns);
        shirtColor.removeChild(colorHeart);
        shirtColorDiv.style.display = "block";
    } 
    // If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
    else if (shirtDesign.options[shirtDesign.selectedIndex].value === "heart js") {
        console.log('Started heart');
        shirtColor.appendChild(colorHeart);
        shirtColor.removeChild(colorPuns);
        shirtColorDiv.style.display = "block";
    }
})

/* ========================
Activities Registration
======================== */
// Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
// When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
const activities = document.querySelector(`.activities`);
const checkbox = activities.querySelectorAll(`input[type="checkbox"]`);

activities.addEventListener("change", () => {
    if (checkbox[1].checked) {
        checkbox[3].parentNode.style.color = 'rgba(0,0,0,.2)';
        checkbox[3].disabled = true;
    }
    
    else {
        checkbox[3].disabled = false;
        checkbox[3].parentNode.style.color = 'rgba(0,0,0,1)';
    }
    if (checkbox[3].checked) {
        checkbox[1].parentNode.style.color = 'rgba(0,0,0,.2)';
        checkbox[1].disabled = true;
    }
    else {
        checkbox[1].disabled = false;
        checkbox[1].parentNode.style.color = 'rgba(0,0,0,1)';
    }
    if (checkbox[2].checked) {
        checkbox[4].parentNode.style.color = 'rgba(0,0,0,.2)';
        checkbox[4].disabled = true;
    }
    else {
        checkbox[4].disabled = false;
        checkbox[4].parentNode.style.color = 'rgba(0,0,0,1)';
    }
    if (checkbox[4].checked) {
        checkbox[2].parentNode.style.color = 'rgba(0,0,0,.2)';
        checkbox[2].disabled = true;
    }
    else {
        checkbox[2].disabled = false;
        checkbox[2].parentNode.style.color = 'rgba(0,0,0,1)';
    }
})

//Extracts the price from a specified individual activity
const price = item => {
    return parseInt(item.substring(item.indexOf('$') + 1));
}

const activitySelected = () => {
    if (totalCost > 0) {
        return true;
        console.log('Activity valid'); 
    } else {
        
        return false;
    }
}
const activityErrorDiv = document.createElement('div');
const activityError = document.createElement('h3');
const activityTitle = document.querySelector('.activities legend');

// Add total cost field to activities form
let totalCost = 0;
const activitiesCostDiv = document.createElement('div');
const activitiesCost = document.createElement('h3');
activitiesCostDiv.setAttribute('id', 'totalSpend');
activitiesCostDiv.style.display = 'block';
activitiesCostDiv.appendChild(activitiesCost);
activities.appendChild(activitiesCostDiv);

// Calculate total cost of activities and display to user
activities.addEventListener("change", e => {
    let item = e.target.parentNode.textContent;
    if (e.target.checked == true) {
        // If error message is present, remove error once activity is selected
        if (activityError) {
            activityTitle.style.color = ""; 
            activityError.remove();
        }
      totalCost += price(item);
      activitiesCost.innerHTML = 'Total: $' + totalCost;
    } else if (e.target.checked == false) {
      totalCost -= price(item);
    }
    activitiesCost.textContent = "Total: $" + totalCost;
})

/* ========================
Payment Info 
======================== */
const paymentDropdown = document.getElementById('payment');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const creditCard = document.getElementById('credit-card');

// hide PayPal and Bitcoin fields by default
paypal.style.display = "none";
bitcoin.style.display = "none";
// Default showing credit card option
paymentDropdown.options == 'credit card';

paymentDropdown.addEventListener("change", () => {
    // Show PayPal and hide other fields if PayPal is selected as payment option
    if (paymentDropdown.options[paymentDropdown.selectedIndex].value == 'paypal') {
        paypal.style.display = "block";
        bitcoin.style.display = "none";
        creditCard.style.display = "none";
    }
    // Show Bitcoin and hide other fields if Bitcoin is selected as payment option
   else if (paymentDropdown.options[paymentDropdown.selectedIndex].value == 'bitcoin') {
        bitcoin.style.display = "block";
        paypal.style.display = "none";
        creditCard.style.display = "none";
    }
    // Show Credit Card and hide other fields if Credit Card is selected as payment option
    else if (paymentDropdown.options[paymentDropdown.selectedIndex].value == 'credit card') {
        creditCard.style.display = "block";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }
})

/* ========================
Form Submit 
======================== */
const formSubmitButton = document.querySelector('button[type="submit"]');
const nameInput = document.getElementById('name');
const nameInputTitle = document.querySelector('label[for="name"]');
const emailInput = document.getElementById('mail');
const emailTitle = document.querySelector('label[for="mail"]');
const activityLegend = document.querySelector('label[name="npm"]');
const ccInput = document.getElementById(`cc-num`);
const ccTitle = document.querySelector('label[for="cc-num"]');
const zipInput = document.getElementById(`zip`);
const zipTitle = document.querySelector('label[for="zip"]');
const cvvInput = document.getElementById(`cvv`);
const cvvTitle = document.querySelector('label[for="cvv"]');

function validateEmail(email) {
    const emailReg = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return emailReg.test(email);
}

formSubmitButton.addEventListener("click", e => {
    // If name field is empty or incorrect format, trigger error message
    if(nameInput.value == '' || /^[0-9]/.test(nameInput.value)) {
        nameInput.style.borderColor = "rgb(195, 17, 50)";
        nameInputTitle.innerHTML = "Name: (please provide your name)";
        nameInputTitle.style.color = "rgb(195, 17, 50)"; 
        nameInputTitle.style.fontWeight = "bold"; 
        console.log('Name invalid');
        nameInput.focus();
        e.preventDefault();
    }
    else if (nameInput.value !== '') {
        nameInput.style.borderColor = "";
        nameInputTitle.innerHTML = "Name:";
        nameInputTitle.style.color = ""; 
        nameInputTitle.style.fontWeight = ""; 
    }
    // If email is incorrect format or empty, trigger error message
    if(emailInput.value == '') {
        emailInput.style.borderColor = "rgb(195, 17, 50)";
        emailTitle.innerHTML = "Email: (please provide a valid email address)";
        emailTitle.style.color = "rgb(195, 17, 50)"; 
        emailTitle.style.fontWeight = "bold";
        console.log('Email invalid');
        emailInput.focus(); 
        e.preventDefault();
    }
    else if (validateEmail(emailInput.value)) {
        emailInput.style.borderColor = "";
        emailTitle.innerHTML = "Email:";
        emailTitle.style.color = ""; 
        emailTitle.style.fontWeight = "";
        console.log('Email valid'); 
    }
    // If total cost of activities is 0, trigger error until activity is checked
    if (activitySelected()) {
        activityError.innerHTML = "Register for Activities";
        activityError.style.color = "";
        activityTitle.style.color = ""; 
        activityError.style.fontWeight = "";
        console.log('Activity valid'); 
    } else {
        activityError.innerHTML = "Please select an Activity";
        activityError.style.color = "rgb(195, 17, 50)";
        activityTitle.style.color = "rgb(195, 17, 50)"; 
        activityError.style.fontWeight = "bold";
        activityError.style.fontSize = "18px";
        activityErrorDiv.appendChild(activityError);
        activityTitle.appendChild(activityErrorDiv);
        e.preventDefault();
        console.log('Activity invalid'); 
    }
    const zipErrorMessage = document.createElement('p');
    zipErrorMessage.className = 'zipError';
    const cvvErrorMessage = document.createElement('p');
    cvvErrorMessage.className = 'cvvError';

    // Have card validation only if the credit card payment option is selected
    if (paymentDropdown.options[paymentDropdown.selectedIndex].value == 'credit card') {
        const ccErrorMessage = document.createElement('p');
        ccErrorMessage.className = 'ccError';
        const ccErrorSelect = document.querySelector('.ccError');
        const zipErrorSelect = document.querySelector('.zipError');
        const cvvErrorSelect = document.querySelector('.cvvError');
        const creditCardErrorStyle = () => {
            ccTitle.style.color = "rgb(195, 17, 50)";
            ccInput.style.borderColor = "rgb(195, 17, 50)";
            ccTitle.style.fontWeight = "bold";
            ccErrorMessage.style.color = "rgb(195, 17, 50)";
            ccErrorMessage.style.fontWeight = "bold";
        }
        // Credit Card conditional field validation - 3 conditions
        if (/^([0-9]{13,16})$/.test(ccInput.value)) {
            if(ccErrorSelect) {
                ccErrorSelect.remove();
            }
            ccTitle.style.color = ""; 
            ccTitle.style.fontWeight = ""; 
            ccInput.style.borderColor = "";
            console.log('cc valid');
        } else if (ccInput.value == "") { // If credit card field is empty, show error
            if(ccErrorSelect) {
                ccErrorSelect.remove();
            }
            ccErrorMessage.innerHTML = 'Please enter a credit card number.';
            creditCard.before(ccErrorMessage);
            creditCardErrorStyle();
            console.log('cc invalid');
            e.preventDefault();
        }
        else if (/^[a-zA-Z]+$/.test(ccInput.value)) { // If credit card values entered are letters, throw error message
            if(ccErrorSelect) {
                ccErrorSelect.remove();
            }
            ccErrorMessage.innerHTML = 'Please enter numbers only for a credit card, no letters.';
            creditCard.before(ccErrorMessage);
            creditCardErrorStyle();
            console.log('cc invalid');
            e.preventDefault();
        } 
        else if (ccInput.value.length < 13 || ccInput.value.length > 16) { // If credit card field is not 13-16 digits, show error
            if(ccErrorSelect) {
                ccErrorSelect.remove();
            }
            ccErrorMessage.innerHTML = 'Credit card numbers should be between 13 and 16 digits long.';
            creditCard.before(ccErrorMessage);
            creditCardErrorStyle();
            console.log('cc invalid');
            e.preventDefault();
        } 
        // Zip Code field validation - must be 5 numbers, no letters
        if (/^([0-9]{5})$/.test(zipInput.value)) {
            if(zipErrorSelect) {
                zipErrorSelect.remove();
            }
            zipTitle.style.color = ""; 
            zipTitle.style.fontWeight = ""; 
            zipInput.style.borderColor = "";
            console.log('zip valid');
        } else {
            if(zipErrorSelect) {
                zipErrorSelect.remove();
            }
            zipErrorMessage.innerHTML += ' Zip code must be 5 digits.';
            zipTitle.style.color = "rgb(195, 17, 50)";
            zipInput.style.borderColor = "rgb(195, 17, 50)";
            zipTitle.style.fontWeight = "bold"; 
            creditCard.before(zipErrorMessage);
            zipErrorMessage.style.color = "rgb(195, 17, 50)";
            zipErrorMessage.style.fontWeight = "bold";
            console.log('zip invalid');
            e.preventDefault();
        }
        // CVV field validation - must be 3 numbers, no letters
        if (/^([0-9]{3})$/.test(cvvInput.value)) {
            if(cvvErrorSelect) {
                cvvErrorSelect.remove();
            }
            cvvTitle.style.color = ""; 
            cvvTitle.style.fontWeight = ""; 
            cvvInput.style.borderColor = "";
            console.log('cvv valid');
        } else {
            if(cvvErrorSelect) {
                cvvErrorSelect.remove();
            }
            cvvErrorMessage.innerHTML += ' CVV must be 3 digits.';
            cvvTitle.style.color = "rgb(195, 17, 50)";
            cvvInput.style.borderColor = "rgb(195, 17, 50)";
            cvvTitle.style.fontWeight = "bold";
            creditCard.before(cvvErrorMessage);
            cvvErrorMessage.style.color = "rgb(195, 17, 50)";
            cvvErrorMessage.style.fontWeight = "bold";
            console.log('cvv invalid');
            e.preventDefault();
        }
    }
})

// Real-time Error Message for Name field - show error if non-letters
let letters = /^[a-zA-Z '-]+$/;
nameInput.addEventListener("keydown", () => {
    if(nameInput.value.match(letters)) {
        nameInput.style.borderColor = "";
        nameInputTitle.innerHTML = "Name:";
        nameInputTitle.style.color = ""; 
        nameInputTitle.style.fontWeight = "";
    } else {
        nameInput.style.borderColor = "rgb(195, 17, 50)";
        nameInputTitle.innerHTML = "Name: (Letters and apostrophes only please)";
        nameInputTitle.style.color = "rgb(195, 17, 50)"; 
        nameInputTitle.style.fontWeight = "bold"; 
    }
})

// Real-time Error Message for email Field - show error if not 3 digits
let emailFormat = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
emailInput.addEventListener("keyup", () => {
    if(emailInput.value.match(emailFormat)) {
        emailTitle.style.color = ""; 
        emailTitle.style.fontWeight = ""; 
        emailInput.style.borderColor = "";
        emailTitle.innerHTML = "Email:";
    }
})

let ccLeters = /[a-zA-Z '-]/;
// Real-time Error Message for Credit Card Field - show error if letters
ccInput.addEventListener("keyup", () => {
    const ccErrorMessage = document.createElement('p');
    ccErrorMessage.className = 'ccError';
    const ccErrorSelect = document.querySelector('.ccError');
    if (ccInput.value.match(ccLeters)) {

        if(ccErrorSelect) {
            ccErrorSelect.remove();
        }
        ccErrorMessage.innerHTML = 'Please enter numbers only for a credit card, no letters.';
        creditCard.before(ccErrorMessage);
        ccTitle.style.color = "rgb(195, 17, 50)";
        ccInput.style.borderColor = "rgb(195, 17, 50)";
        ccTitle.style.fontWeight = "bold";
        ccErrorMessage.style.color = "rgb(195, 17, 50)";
        ccErrorMessage.style.fontWeight = "bold";
    } else {
        if(ccErrorSelect) {
            ccErrorSelect.remove();
        }
        ccTitle.style.color = ""; 
        ccTitle.style.fontWeight = ""; 
        ccInput.style.borderColor = "";
    }
})

// Real-time Error Message for Zip code Field - show error if not 5 digits
let zipNumbers = /^([0-9]{5})$/;
zipInput.addEventListener("keyup", () => {
    const zipErrorSelect = document.querySelector('.zipError');
    if(zipInput.value.match(zipNumbers)) {
        zipTitle.style.color = ""; 
        zipTitle.style.fontWeight = ""; 
        zipInput.style.borderColor = "";
        if (zipErrorSelect) {
            zipErrorSelect.remove();
        }
    }
})

// Real-time Error Message for CVV Field - show error if not 3 digits
let cvvNumbers = /^([0-9]{3})$/;
cvvInput.addEventListener("keyup", () => {
    const cvvErrorSelect = document.querySelector('.cvvError');
    if(cvvInput.value.match(cvvNumbers)) {
        cvvTitle.style.color = ""; 
        cvvTitle.style.fontWeight = ""; 
        cvvInput.style.borderColor = "";
        if (cvvErrorSelect) {
            cvvErrorSelect.remove();
        }
    }
})
