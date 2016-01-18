$("#register").on('click', function () {
    location.href = "/register";
  });

function postThis(post) {

    //find logged in user
    var user = $("#current-user").html().split(" ").pop();

    //check location and link accordingly
    if ($(location).attr('pathname') == '/')  {
        var htmlString = '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="./users/' + user + '">From: ' + user + '</a></h3></div><p style="margin:5px">' + post + '</p></div>';
        $("#user-messages").prepend(htmlString);
    }
    else {
        var htmlString = '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="./' + user + '">From: ' + user + '</a></h3></div><p style="margin:5px">' + post + '</p></div>';
        $("#user-messages").prepend(htmlString);
    }
}

$(document).ready(function () {

    //hide error and search result panel
    $("#error").hide();
    $("#searchBox").hide();
    $("#searchBoxPanel").hide();
    $("#searchForm").bind("submit", function () {

        var query = $("#searchQuery").val();
        if (query == "") {
            var error = '<strong>ERROR!</strong> Search query cannot be empty';
            $("#error").html(error).show().fadeOut(5000);
            $("#searchBox").hide();
            $("#searchBoxPanel").hide();
            return false;
        }
        //empty searchBox, incase we have searched before

        $("#searchBox").html("");
        $("#searchBox").show();
        $("#searchBoxPanel").show();
        $.ajax({
            url: 'http://127.0.0.1:8888/search/' + query,
            type: "GET",
            dataType: 'json',
            success: function(results) {
                $.each(results, function() {
                    $("#searchBox").append('<a id="' + this.username + '" href="http://127.0.0.1:8888/users/' + this.username + '">' + this.username +  '</a>' + '<br>');
                });
            }
        });
        return false;
    });
    $('#msgForm').bind('submit', function () {
        var query = $('#msgQuery').val();

        //validation of input
        if (query.length < 1) {
            var error = '<strong>ERROR!</strong> Message cannot be empty';
            $("#error").hide()
            $("#error").html(error).show().fadeOut(3000);
        }
        else if (query.length > 140) {
            var error = '<strong>ERROR!</strong> Message cannot be longer than 140 chars!';
            $("#error").html(error).show().fadeOut(3000);
        }
        else {
            //check where we are so backend can save messages correctly
            if ($(location).attr('pathname') == '/') {
                $.ajax({
                    url: 'http://127.0.0.1:8888/post/' + query,
                    type: 'POST',
                    success: function() {
                        postThis(query);
                    }
                });
            }
            else {
                $.ajax({
                    url: 'http://127.0.0.1:8888/post' + $(location).attr('pathname') + '/' + query,
                    type: 'POST',
                    success: function() {
                        postThis(query);
                    }
                });
            }
        }
        return false;
    });
    $('#addFriend').bind('click', function () {
        $.ajax({
            url: 'http://127.0.0.1:8888/users/add/' + $('#user').html(),
            type: 'POST',
            success: function () {
                //reload page after successfully adding user as a friend, causing
                //jade to render their profile
                window.location.reload(true);
            }
        });
    });
});