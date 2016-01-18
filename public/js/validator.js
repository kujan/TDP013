$(document).ready(function() {
    $('#registerForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            password: {
                validators: {
                    identical: {
                        field: 'confirmPassword',
                        message: "Passwords doesn't match"
                    }
                }
            },
            confirmPassword: {
                validators: {
                    identical: {
                        field: 'password',
                        message: "Passwords doesn't match"
                    }
                }
            },
            user: {
                message: 'The username is not valid',
                validators: {
                    // The validator will create an Ajax request
                    // sending { username: 'its value' } to the back-end
                    remote: {
                        message: 'The username is not available',
                        url: 'http://127.0.0.1:8888/getuser'
                    }
                }
            }

        }
    });

});