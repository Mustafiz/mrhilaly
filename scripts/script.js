document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Validate form inputs
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let subject = document.getElementById('subject').value.trim();
    let message = document.getElementById('message').value.trim();

    // Email validation using a regular expression
    let emailRegex = /^\S+@\S+\.\S+$/;
    if (!name || !email || !subject || !message || !emailRegex.test(email)) {
        alert('Please fill in all fields with valid inputs.');
        return;
    }

    // Construct the form data
    var formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Perform form submission
    submitForm(formData);
});

function submitForm(formData) {
    // Make an API request to the backend (API Gateway) for form submission
    fetch('https://api.mustafizrh.net/dev', { // URL that represents the backend API endpoint to which the form data is going to be sent
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
            if (response.ok) {
                // Redirect to the thank you page
                window.location.href = 'thanks.html';
            } else {
                console.log(response);
                throw new Error('Form submission failed.');
            }
        })
        .catch(function (error) {
            console.error(error);
            alert('Form submission failed. Please try again later.');
        });
}