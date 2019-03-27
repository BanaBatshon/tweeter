$(document).ready(function () {
  $("#newTweet").hide()
  $(".error").hide();
  loadTweets();

  function createTweetElement(tweetObj) {
    //gets the tweet properties from the passed object
    let avatar = $('<img>').attr('src',tweetObj["user"]["avatars"]["small"]);
    let name = tweetObj["user"]["name"];
    let handle = tweetObj["user"]["handle"];
    let content = tweetObj["content"]["text"];
    let postTime = tweetObj["created_at"];
    let time = moment(postTime).fromNow();
    let firstIcon = $('<i id="heart" class="fas fa-heart"></i>');
    let secondIcon = $('<i id="retweet" class="fas fa-retweet"></i>');
    let thirdIcon = $('<i id="flag" class="fab fa-font-awesome-flag"></i>');
  
    //creats a new tweet class in an article
    tweet = $('<article>').addClass('tweet');
  
    //creats the tags of the tweet class
    let header = $('<header>');
    let h5 = $('<h5>');
    let h6 = $('<h6>');
    let div = $('<div>');
    let p =  $('<p>');
    let footer = $('<footer>');
    let span =$('<span>').addClass('icons');

    //appends the properties to the tweet tags
    tweet.append(header)
    header.append(avatar)
    header.append(h5);
    h5.append(name);
    header.append(h6);
    h6.append(handle);
    tweet.append(div);
    div.append(p);
    p.append($("<p class='content'></p>").text(content)); // prevents XSS with escaping
    tweet.append(footer);
    footer.append(time);
    footer.append(span);
    span.append(firstIcon);
    span.append(secondIcon);
    span.append(thirdIcon);
  
    return (tweet);
  }

  function renderTweets(tweets) {
    for ( const tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $("#allTweets").prepend(newTweet);
    }
  }

  function loadTweets (){
    $.ajax({url: '/tweets',method: 'GET',success: function(data){
      renderTweets(data);
      },
      error: function(err){
      console.log("there was an error getting data");
      }
    });
  }

  let $button = $("#compose");
  $button.click(function(event) {
    event.preventDefault();
    $("#newTweet").slideToggle('fast', function() {
      $("textarea").focus();
      // console.log($("textarea").val());
    });
  })

  let $form = $('#newTweetForm');
  $form.submit(function (event) {
    event.preventDefault();
    // Checks if the user doesnt type anything or only spaces and tries to post a tweet
    if ($("textArea").val().length === 0 || ($("textArea").val().split(" ").join("")).length === 0) {
        $(".error").text('Error: Please type something to tweet!');
        $(".error").slideDown('fast');
    // Checks if the user exceeds the 140 character limit
    } else if ($("textArea").val().length > 140 ) {
      $(".error").text('Error: You have exceeded the character limit!');
      $(".error").slideDown('fast');
    // loads the tweets and resets the counter after submission
    } else {
      $(".error").hide();
      let $formInput = $(this).serialize();
      $.ajax({ method: 'POST', url: "/tweets", data: $formInput})
      .done(function (res) {
        renderTweets([res]);
        $("textarea").val('');
        $("#counter").text(140);
      });
    }
  })
})