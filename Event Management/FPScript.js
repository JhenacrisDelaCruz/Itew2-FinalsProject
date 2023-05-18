// Define a User class with properties for first name (FName), last name (LName), email, and password.
// Assigning the value of the parameter to the property of the User object.
class User{
    constructor(FName, LName, email, password){
        this.email = email; this.password = password; 
    this.FName = FName;
    this.LName = LName;
    }
}

// Define a UserList class to manage the list of registered users
class UserList{
    constructor(){
        this.users = []; // Initialize an empty array to hold the users
    }
    
    // Add a user to the list and save to localStorage
    addUser(user){
      this.users.push(user);
      localStorage.setItem('client', JSON.stringify(this.users));
    }

    // Load the list of users from localStorage
    loadUsers(){
        const users = JSON.parse(localStorage.getItem('client'));
        
        if(users){
            this.users = users;
        }
    }

    // Check if the given email and password match a registered user
    login(email, password){
        const user = this.users.find(u => u.email === email);
        if(!user){
            alert('Account is not registered.');
            $('#logInEmail').val('');
            $('#logInPass').val('');
        }

        //If the password is invalid, an alert is displayed to inform the user and the password field is cleared.
        else if(user.password !== password){
            alert('Invalid password.');
            $('#logInPass').val('');
        } 

        //If the email or password is incorrect, an alert is displayed to inform the user, and both email and password fields are cleared.
        else if(user.email !== $('#logInEmail').val() || user.password !== $('#logInPass').val()){
            alert('The email or password you entered is incorrect.');
            $('#logInEmail').val('');
            $('#logInPass').val('');
        } 

        //  It means the login is successful. An alert is displayed to welcome the user with their full name, and the page is redirected to 'ClientProfile.html'.
        else{
            alert(`Welcome ${user.FName} ${user.LName}!`);
            window.location.href = 'Home.html';
        }
    }
}



// STORING THE INFORMATION TO THE LOCAL STORAGE
$(document).ready(function(){
    const userList = new UserList(); // Initialize a UserList object

    userList.loadUsers(); // Load the list of users from localStorage

    // Handle the click event of the signup form submit button
    $('#signUp-Form').submit(function(event){
        event.preventDefault();
        const FName = $('#FName').val();
        const LName = $('#LName').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const user = new User(FName, LName, email, password);
        userList.addUser(user);
        alert('Registration successful!');
        $('#signUp-Form')[0].reset();
        $('#logInForm').show(); 
        $('#signup-form').hide();
        localStorage.setItem("currentEmail", email);
        localStorage.setItem("currentPassword", password);
    });

    // Handle the submit event of the login form
    $('#login-form').submit(function(event){
      event.preventDefault();
      const email = $('#logInEmail').val();
      const password = $('#logInPass').val();
      localStorage.setItem("currentEmail", email);
      localStorage.setItem("currentPassword", password);
      userList.login(email, password);
    });

    // Load the list of users from localStorage when the page loads
    userList.loadUsers();


    // Hide the signup form on page load
    $('#signup-form').hide();
    $('#logInForm').hide();

    // When the user clicks on <span> (x), close the SignUp Form
    $('.close').click(function(){
    $('#signup-form').hide();
});

    // When the user clicks on <span> (x), close the LogIn Form
    $('.closeLogIn').click(function(){
    $('#logInForm').hide();
});

    // When the user clicks anywhere outside of the SignUp or LogIn Form, close them
    $(window).click(function(event){
        if(event.target.id == "signup-form"){
            $('#signup-form').hide();
        }
        else if(event.target.id == "logInForm"){
            $('#logInForm').hide();
        }
    });

    // Handle click event for signup link
    $('#signUp-link').click(function(event){
    event.preventDefault(); // Prevent default link behavior
    $('#signup-form').show(); // Show the signup form
    $('#logInForm').hide(); // Hide the login form
});

    // Handle click event for login link
    $('#logIn-link').click(function(event){
    event.preventDefault(); // Prevent default link behavior
    $('#logInForm').show(); // Show the login form
    $('#signup-form').hide(); // Hide the signup form
});

    // Handle click event for signup link inside the login form
    $('#signUp-link2').click(function(event){
    event.preventDefault(); // Prevent default link behavior
    $('#signup-form').show(); // Show the signup form
    $('#logInForm').hide(); // Hide the login form
});

    // Handle click event for cancel button
    $('.cancelBtn').click(function(){
    $('#signup-form').hide();
});

    // Password toggle functionality
    $('#showPass').click(function (){
        var passwordInput = $('#password');
        var passwordFieldType = passwordInput.attr('type');
        var showPass = $('#showPass');

        if(passwordFieldType == 'password'){
            passwordInput.attr('type', 'text');
            showPass.text('Hide');
        }

        else{
            passwordInput.attr('type', 'password');
            showPass.text('Show');
        }
    });

    $('#showConfirmPass').click(function (){
        var confirmPasswordInput = $('#confirm-password-input');
        var confirmPasswordFieldType = confirmPasswordInput.attr('type');
        var showConfirmPass = $('#showConfirmPass');

        if(confirmPasswordFieldType == 'password'){
            confirmPasswordInput.attr('type', 'text');
            showConfirmPass.text('Hide');
        }

        else{
            confirmPasswordInput.attr('type', 'password');
            showConfirmPass.text('Show');
        }
    });


    // Password toggle functionality
    $('#logInShowPass').click(function (){
        var logInPassInput = $('#logInPass');
        var passwordFieldType = logInPassInput.attr('type');
        var logInShowPass = $('#logInShowPass');

        if(passwordFieldType == 'password'){
            logInPassInput.attr('type', 'text');
            logInShowPass.text('Hide');
        }
        else{
            logInPassInput.attr('type', 'password');
            logInShowPass.text('Show');
        }
    });

    // Handle click event for client button
    $('#client-btn').click(function(){
    $('#logInForm').show(); // Show the login form  
});

    // Handle click event for admin button
    $('#admin-btn').click(function(){
    $('#logInForm').show(); // Show the login form


    // Handle click event for login button
    $('#userLogin').click(function(e){
    e.preventDefault(); // Prevent form from submitting


    // Get values of username and password inputs
    var logInEmail = $('#logInEmail').val();
    var logInPass = $('#logInPass').val();


    // Check if the username and password inputs match the required values
    if(logInEmail === 'Admin' && logInPass === 'Admin1234'){
    // Redirect to admin dashboard
        window.location.href = "Dashboard.html";
    }

    else{
    // Show error message
    $('#errorMessage').text('Please enter a valid username and password.');
                }   
            });
        });
    });




// CHECK THE INPUT OF THE USER IN PASSWORD
function checkForm(){
    var firstName = document.querySelector('#FName').value;
    var lastName = document.querySelector('#LName').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var confirmPassword = document.querySelector('#confirm-password-input').value;

    // Check if first name or last name contain numbers
    var regex = /\d/;
    if(regex.test(firstName) || regex.test(lastName)){
        document.querySelector('#err-msg').textContent = 'Names cannot contain numeric values';
        return false;
    }else{
        document.querySelector('#err-msg').textContent = '';
    }

    // Submit form if all validations pass
    return true;
}

// CHECK THE STRENGTH OF THE PASSWORD
function checkPassword(){
    var password = document.querySelector('#password').value;
    var passReqLength = document.querySelector('#passReqLength');
    var passReqLower = document.querySelector('#passReqLower');
    var passReqUpper = document.querySelector('#passReqUpper');
    var passReqNumber = document.querySelector('#passReqNumber');
    var passReqSpecial = document.querySelector('#passReqSpecial');
    var passwordStrength = document.querySelector('#password-strength');

    // Check password length
    if(password.length >= 8){
        passReqLength.style.color = 'green';
    }else{
        passReqLength.style.color = 'red';
    }

    // Check for lowercase letter
    if(/[a-z]/.test(password)){
        passReqLower.style.color = 'green';
    }else{
        passReqLower.style.color = 'red';
    }

    // Check for uppercase letter
    if(/[A-Z]/.test(password)){
        passReqUpper.style.color = 'green';
    }else{
        passReqUpper.style.color = 'red';
    }

    // Check for number
    if(/[0-9]/.test(password)){
        passReqNumber.style.color = 'green';
    }else{
        passReqNumber.style.color = 'red';
    }

    // Check for special character
    if(/[@#$%^&+=]/.test(password)){
        passReqSpecial.style.color = 'green';
    }else{
        passReqSpecial.style.color = 'red';
    }

    // Calculate password strength score
    var strengthScore = 0;

    if(password.length >= 8){
        strengthScore++;
    }
    if(/[a-z]/.test(password)){
        strengthScore++;
    }
    if(/[A-Z]/.test(password)){
        strengthScore++;
    }
    if(/[0-9]/.test(password)){
        strengthScore++;
    }
    if(/[@#$%^&+=]/.test(password)){
        strengthScore++;
    }

    // Set password strength indicator
    if(strengthScore == 0){
        passwordStrength.style.width = '0';
        passwordStrength.style.height = '0';
        passwordStrength.style.backgroundColor = 'white';
        passwordStrength.style.color = 'WHITE';
    }else if(strengthScore == 1){
        passwordStrength.style.width = '20%';
        passwordStrength.style.height = '20%';
        passwordStrength.style.backgroundColor = '#A91B0D';
        passwordStrength.textContent = 'Weak';
        passwordStrength.style.padding = '.5rem';
        passwordStrength.style.color = 'WHITE';
    }else if(strengthScore == 2){
        passwordStrength.style.width = '40%';
        passwordStrength.style.backgroundColor = '#ff9900';
        passwordStrength.textContent = 'Fair';
        passwordStrength.style.padding = '.5rem';
        passwordStrength.style.color = 'WHITE';
    }else if(strengthScore == 3){
        passwordStrength.style.width = '60%';
        passwordStrength.style.backgroundColor = '#FFEA61';
        passwordStrength.textContent = 'Moderate';
        passwordStrength.style.padding = '.5rem';
        passwordStrength.style.color = 'BLACK';
    }else if(strengthScore == 4){
        passwordStrength.style.width = '80%';
        passwordStrength.style.backgroundColor = '#FFEA61';
        passwordStrength.textContent = ' Moderate';
        passwordStrength.style.padding = '.5rem';
        passwordStrength.style.color = 'BLACK';
    }else if(strengthScore == 5){
        passwordStrength.style.width = '100%';
        passwordStrength.style.backgroundColor = '#028A0F';
        passwordStrength.textContent = 'Very Strong';
        passwordStrength.style.padding = '.5rem';
        passwordStrength.style.color = 'WHITE';
    }
}

// CHECK IF THE PASSWORD AND CONFIRM PASSWORD ARE THE SAME
function checkPasswordMatch(){
    var password = document.querySelector('#password').value;
    var confirmPassword = document.querySelector('#confirm-password-input').value;
    var passwordMatchMsg = document.querySelector('#password-match-msg');

    if(!password || !confirmPassword){
        // if either password field or confirm password field is empty
        passwordMatchMsg.textContent = '';
        passwordMatchMsg.style.color = '';
        return;
    }
    else if(password !== confirmPassword){
        passwordMatchMsg.textContent = 'Passwords do not match';
        passwordMatchMsg.style.color = 'red';
    } 
    else{
        passwordMatchMsg.textContent = 'Passwords match';
        passwordMatchMsg.style.color = 'green';
    }
}