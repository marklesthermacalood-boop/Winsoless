// Hardcoded user database
const USER_DATABASE = {
  'mark@google.com': {
    email: 'mark@google.com',
    username: 'Mark Macalood',
    password: 'mark123', // In production, this would be hashed
  },
  'harvey@google.com': {
    email: 'harvey@google.com',
    username: 'Harvey Dangate',
    password: 'harvey456',
  },
  'jeff@google.com': {
    email: 'jeff@google.com',
    username: 'Jeffrey David',
    password: 'jeff123',
  },
  'lance@mail.com': {
    email: 'lance@mail.com',
    username: 'Lance Llaguno',
    password: 'lance456',
  },
};

// Current logged-in user stored in session
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

/**
 * Sign up a new user
 * @param {string} email - User's email
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @param {string} confirmPassword - Confirm password
 * @returns {object} - { success: boolean, message: string }
 */
function signup(email, username, password, confirmPassword) {
  // Validate inputs
  if (!email || !username || !password || !confirmPassword) {
    return { success: false, message: 'All fields are required.' };
  }

  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match.' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  if (!email.includes('@')) {
    return { success: false, message: 'Please enter a valid email.' };
  }

  // Check if user already exists
  if (USER_DATABASE[email]) {
    return { success: false, message: 'Email already registered. Please login or use a different email.' };
  }

  // Create new user
  USER_DATABASE[email] = {
    email,
    username,
    password, // In production, password should be hashed
  };

  // Save new user to localStorage (simulating database persistence)
  localStorage.setItem('userDatabase', JSON.stringify(USER_DATABASE));

  // Auto-login after signup
  currentUser = {
    email,
    username,
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  return { success: true, message: 'Account created successfully! Logging you in...' };
}

/**
 * Login an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {object} - { success: boolean, message: string }
 */
function login(email, password) {
  // Validate inputs
  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  // Check if user exists
  const user = USER_DATABASE[email];
  if (!user) {
    return { success: false, message: 'Email not found. Please check or sign up.' };
  }

  // Verify password
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  // Set current user
  currentUser = {
    email: user.email,
    username: user.username,
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  return { success: true, message: 'Logged in successfully!' };
}

/**
 * Logout the current user
 */
function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
}

/**
 * Check if user is logged in
 * @returns {boolean}
 */
function isLoggedIn() {
  return currentUser !== null;
}

/**
 * Get the current logged-in user
 * @returns {object|null}
 */
function getCurrentUser() {
  return currentUser;
}

/**
 * Update authentication UI based on login state
 */
function updateAuthUI() {
  const loginLink = document.getElementById('nav-login');
  const signupLink = document.getElementById('nav-signup');
  const loginLinkMobile = document.getElementById('nav-login-mobile');
  const signupLinkMobile = document.getElementById('nav-signup-mobile');

  // If the desktop links aren't present, still attempt to update mobile links.
  if (!loginLink && !loginLinkMobile) return;

  const setTextAndNav = (el, text, nav) => {
    if (!el) return;
    el.textContent = text;
    if (nav) el.dataset.nav = nav;
    else el.removeAttribute('data-nav');
  };

  if (isLoggedIn()) {
    const user = getCurrentUser();
    const firstName = user.username.split(' ')[0];

    setTextAndNav(loginLink, `Hi, ${firstName}`, 'account');
    if (loginLink) { loginLink.onclick = null; loginLink.style.cursor = 'pointer'; }
    setTextAndNav(loginLinkMobile, `Hi, ${firstName}`, 'account');
    if (loginLinkMobile) { loginLinkMobile.onclick = null; loginLinkMobile.style.cursor = 'pointer'; }

    // Make signup links act as logout buttons but keep IDs so we can update them later
    if (signupLink) {
      signupLink.textContent = 'Logout';
      signupLink.removeAttribute('data-nav');
      signupLink.onclick = (e) => { e.preventDefault(); logout(); updateAuthUI(); navigate('home'); };
    }
    if (signupLinkMobile) {
      signupLinkMobile.textContent = 'Logout';
      signupLinkMobile.removeAttribute('data-nav');
      signupLinkMobile.onclick = (e) => { e.preventDefault(); logout(); updateAuthUI(); navigate('home'); };
    }
  } else {
    setTextAndNav(loginLink, 'Login', 'login');
    if (loginLink) { loginLink.onclick = null; loginLink.style.cursor = 'auto'; }
    setTextAndNav(loginLinkMobile, 'Login', 'login');
    if (loginLinkMobile) { loginLinkMobile.onclick = null; loginLinkMobile.style.cursor = 'auto'; }

    if (signupLink) { signupLink.textContent = 'Sign Up'; signupLink.dataset.nav = 'signup'; signupLink.onclick = null; }
    if (signupLinkMobile) { signupLinkMobile.textContent = 'Sign Up'; signupLinkMobile.dataset.nav = 'signup'; signupLinkMobile.onclick = null; }
  }
}
