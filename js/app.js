// Set focus on first text field on page load
const focusInput = document.querySelectorAll(`input[type=text]`);
focusInput[0].focus();

const jobItem = document.querySelector('#title');
const fieldset = document.querySelector('fieldset');
// Display other text field if Javascript
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
    } 
    // If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
    else if (shirtDesign.options[shirtDesign.selectedIndex].value === "heart js") {
        console.log('Started heart');
        shirtColor.appendChild(colorHeart);
        shirtColor.removeChild(colorPuns);
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
const activityErrorDiv = document.createElement('div');
const activityError = document.createElement('h3');
const activityTitle = document.querySelector('.activities.legend')
const activityLegend = document.querySelector('label[name="npm"]');
const ccInput = document.getElementById(`cc-num`);
const zipInput = document.getElementById(`zip`);
const cvvInput = document.getElementById(`cvv`);

function validateEmail(email) {
    let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email);
}

function validateCheckbox() {
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked = true) {
            return true;
        }
        else {
            return false;
        }
    }
}
// activityError.innerHTML = "Please select an Activity";
//             activityError.style.color = "rgb(195, 17, 50)"; 
//             activityError.style.fontWeight = "bold";
//             activityErrorDiv.appendChild(activityError);
//             activities.appendChild(activityTitle);
//             e.preventDefault();

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
    // If at least 1 Activities checkbox isn't selected, trigger error
    const isChecked = e.target.checked;
    const checkboxList = activities.children;
    if (isChecked) {
        for (let i = 0; i < checkboxList.length; i+= 1) {
            if (checkboxList[i].checked = true) {
                return true;
            }
            else if (checkboxList[i].checked = false) {
                activityError.innerHTML = "Please select an Activity";
                activityError.style.color = "rgb(195, 17, 50)"; 
                activityError.style.fontWeight = "bold";
                 activityErrorDiv.appendChild(activityError);
                activities.appendChild(activityTitle);
                e.preventDefault();
                return false;
            }
        }
    }
    // Credit Card validation - Credit Card number, a Zip Code, and a 3 number CVV        
    const validateCreditCard = "^([0-9]{13,16})$"
    if (ccInput.value = validateCreditCard) {
        console.log('cc valid');
//     } else if (ccre.test(ccInput.value)) {
//         ccInput.style.borderColor = 'red';
//         console.log('cc invalid');
//     }
//     if (zipInput.value == "^([0-9]{5})$") {
//         console.log('zip valid');
//     } else {
//         zipInput.style.borderColor = 'red';
//         console.log('zip invalid');
//     }
//     if (cvvInput.pattern == "^([0-9]{5})$") {
//         console.log('cvv valid');
//     } else if (cvvInput.pattern !== "^([0-9]{5})$") {
//         cvvInput.style.borderColor = 'red';
//         console.log('cvv invalid');
    }
})