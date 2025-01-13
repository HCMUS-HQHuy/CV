document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission
        document.querySelector('.loading').classList.add('d-block');
        document.querySelector('.error-message').classList.remove('d-block');
        document.querySelector('.sent-message').classList.remove('d-block');
        // Collect the form data
        var formData = new FormData(this);
        var keyValuePairs = [];
        for (var pair of formData.entries()) {
          keyValuePairs.push(pair[0] + "=" + pair[1]);
        }

        var formDataString = keyValuePairs.join("&");

        // Send a POST request to your Google Apps Script
        fetch(
          "https://script.google.com/macros/s/AKfycbx3zqmNYMjBvusCuujr9n2kYCq802XrqGngdPgQ2_3yKuyby8amT1O5nGXKvBzgmPeOWg/exec",
          {
            redirect: "follow",
            method: "POST",
            body: formDataString,
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          }
        )
          .then(function (response) {
            // Check if the request was successful
            if (response) {
              return response; // Assuming your script returns JSON response
            } else {
              displayError(document, "Failed to submit the form");
              throw new Error("Failed to submit the form.");
            }
          })
          .then(function (data) {
            document.querySelector('.loading').classList.remove('d-block');
            document.querySelector('.sent-message').classList.add('d-block');
            document.getElementById("contact-form").reset(); 
            // Display a success message
            // document.getElementById("message").textContent =
            //   "Data submitted successfully!";
            // document.getElementById("message").style.display = "block";
            // document.getElementById("message").style.backgroundColor = "green";
            // document.getElementById("message").style.color = "beige";
            // document.getElementById("submit-button").disabled = false;
            // document.getElementById("contact-form").reset();

            // setTimeout(function () {
            //   document.getElementById("message").textContent = "";
            //   document.getElementById("message").style.display = "none";
            // }, 2600);
          })
          .catch(function (error) {
            // Handle errors, you can display an error message here
            // console.error(error);
            displayError(document, error);
            // document.getElementById("message").textContent =
            //   "An error occurred while submitting the form.";
            // document.getElementById("message").style.display = "block";
          });

          function displayError(thisForm, error) {
            thisForm.querySelector('.loading').classList.remove('d-block');
            thisForm.querySelector('.error-message').innerHTML = error;
            thisForm.querySelector('.error-message').classList.add('d-block');
          }
      });