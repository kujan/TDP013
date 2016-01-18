document.getElementById("register").onclick = function () {
    location.href = "/register";
  };

function validatePass(form) {
    no_match = "<div class='alert alert-error'><a href = '#'class='close'data-dismiss='alert'>&times;</a><strong>Error!</strong>Passwords doesn't match</div>";
    text = document.getElementById("error");
    text.innerHTML("cp");
}