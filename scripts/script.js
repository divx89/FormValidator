/**************************************************************************************************************************/
/************************************************* GET DOM VALUES *********************************************************/
/**************************************************************************************************************************/

const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const email = document.getElementById('email');

/**************************************************************************************************************************/
/**************************************************** FUNCTIONS ***********************************************************/
/**************************************************************************************************************************/

//Function to show specific error in case of an invalid field
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Function to display that the fields are successfully validated
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    formControl.lastElementChild.textContent = 'Show Error Message';
}

//function to check the validity of the entered email address
function checkEmail(input){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(input.value)){
        showSuccess(input);
    }else{
        showError(input,'Email is not valid');
    }
}

//Function to get the name of the field in question, with the first letter capitalized
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Function to verify that the fields forming an input array are not empty
function checkRequired(inputArray){
    inputArray.forEach(function(input) {
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} cannot be left blank`);
        }else{
            showSuccess(input);
        }
    });
}

//Function to validate that the length of the input is in the allowed range
function checkLength(input, minLength, maxLength) {
    if (input.value.trim().length < minLength){
        showError(input, `${getFieldName(input)} must be at least ${minLength} characters`);
    }else if (input.value.trim().length > maxLength){
        showError(input, `${getFieldName(input)} must be at most ${maxLength} characters`);
    }else{
        showSuccess(input);
    }
}

//Function to validate that the password and its confirmatory field match
function checkPasswordsMatch(input1, input2){
    if(input1.value != input2.value){
        showError(input2,'Passwords do not match');
    }
}

/**************************************************************************************************************************/
/************************************************ EVENT LISTENERS *********************************************************/
/**************************************************************************************************************************/

//Event Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
});