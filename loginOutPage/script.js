// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initLoginForm();
});

function initLoginForm() {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    const loginBtn = document.querySelector('.login-btn');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const signupLink = document.getElementById('signupLink');
    const socialButtons = document.querySelectorAll('.social-btn');

    // Form submission
    loginForm.addEventListener('submit', handleLogin);

    // Password toggle
    passwordToggle.addEventListener('click', togglePassword);

    // Real-time validation
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    // Forgot password
    forgotPasswordLink.addEventListener('click', handleForgotPassword);

    // Signup link
    signupLink.addEventListener('click', handleSignup);

    // Social buttons
    socialButtons.forEach(btn => {
        btn.addEventListener('click', handleSocialLogin);
    });

    // Focus/blur effects
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.querySelector('input').parentElement.style.background = 'white';
        });
        input.addEventListener('blur', function() {
            this.parentElement.parentElement.querySelector('input').parentElement.style.background = '#f9fafb';
        });
    });
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.innerHTML = '<img src="Images/hideIcon.png" width="80"/>';
    } else {
        passwordField.type = 'password';
        toggleIcon.innerHTML = '<img src="Images/eye.png" width="80"/>';
    }
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const errorEl = document.getElementById('emailError');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        errorEl.style.display = 'block';
        return false;
    } else {
        errorEl.style.display = 'none';
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('passwordError');
    
    if (password && password.length < 8) {
        errorEl.style.display = 'block';
        return false;
    } else {
        errorEl.style.display = 'none';
        return true;
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (!isEmailValid || !isPasswordValid) {
        return;
    }
    
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<div class="loading"></div>Signing In...';
    loginBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
        
        localStorage.setItem('isLoggedIn', 'true');
        // Success simulation
         window.location.href = "../homePage/index.html";
        // Replace with actual redirect:
        // window.location.href = '/dashboard';
    }, 2000);
}

function handleForgotPassword(e) {
    e.preventDefault();
    alert('Password reset link sent to your email!');
    // Integrate with your backend API
}

function handleSignup(e) {
    e.preventDefault();
    alert('Redirecting to signup page...');
    // window.location.href = '/signup';
}

function handleSocialLogin(e) {
    const provider = e.currentTarget.dataset.provider;
    alert(`Redirecting to ${provider} login...`);
    // Integrate with OAuth providers
}

