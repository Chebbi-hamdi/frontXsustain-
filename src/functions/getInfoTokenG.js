// 1. Extract Token from URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// 2. Decode Token
const decodedToken = jwt.decode(token);
console.log("------------------------",decodedToken);
// 3. Verify Information
if (!decodedToken || !decodedToken.email || !decodedToken.name) {
    // Token or required information is missing or invalid
    // Handle this case (e.g., redirect to login page or show an error message)
    console.error('Invalid token or missing information');
    return ; // It seems like there's a variable named 'error' that is supposed to be defined elsewhere.
}

// 4. Populate Inputs
document.getElementById('emailInput').value = decodedToken.email;
document.getElementById('nameInput').value = decodedToken.name;
