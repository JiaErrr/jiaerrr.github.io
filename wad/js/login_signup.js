const form = document.getElementById('form');
const input_username = document.getElementById('input-username');
const input_email = document.getElementById('input-email');
const input_password = document.getElementById('input-password');
const input_confirm_password = document.getElementById('input-confirm-password');
const error_message = document.getElementById('error-message');
var validate = false;

//form checker 
// form.addEventListener('submit', (e) => {
//    let errors = [];

//    if(input_username){

//    }
// })

//Validation 
function getSignupFormValidation (username, email, password, confirmPassword){
   let errors = []

   if(username.value.match(/^[a-zA-Z0-9]{1,}$/g)){
      validate = true;
   }
   else if(username.value.match(/^[\W\D]{1,}$/g)){
      errors.push('User name cannot include special characters.')
      input_username.parentElement.classList.add('incorrect')
   }
   else{
      errors.push('Enter a user name.')
      input_username.parentElement.classList.add('incorrect')
   }


   if(email.value.match(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{3,}$/g)){
      validate = true;
   }
   else{
      errors.push('Enter a valid email address.')
      input_email.parentElement.classList.add('incorrect')
   }

   //valid password length-- 
   if(password.value.length >= 8){
      length.classList.remove("invalid");
      length.classLit.add("valid");
      validate = true;
   }
   else{
      length.classList.add("invalid");
      length.classList.remove("valid");
   }
   //valid password capital & lowercase
   if(password.value.match(/^[a-zA-Z]$/g)){
      letter.classList.remove("invalid");
      letter.classLit.add("valid");
      validate = true;
   }
   else{
      letter.classList.add("invalid");
      letter.classList.remove("valid");
   }
   //valid password number
   if(password.value.match(/^[0-9]{1,}$/g)){
      number.classList.remove("invalid");
      number.classLit.add("valid");
      validate = true;
   }

   if(password !== confirmPassword){
      errors.push('The passwords you entered do not match.')
      input_password.parentElement.classList.add('incorrect')
      input_confirm_password.parentElement.classList.add('incorrect')
   }

   return errors;
}

//input icon control
input_username.addEventListener("mouseover", () => {
   document.getElementById('user-icon').playerInstance.playFromBeginning();
});

input_email.addEventListener("mouseover", () => {
   document.getElementById('email-icon').playerInstance.playFromBeginning();
});

input_password.addEventListener("mouseover", () => {
   document.getElementById('password-icon').playerInstance.playFromBeginning();
});

input_confirm_password.addEventListener("mouseover", () => {
   document.getElementById('confirm-password-icon').playerInstance.playFromBeginning();
});
