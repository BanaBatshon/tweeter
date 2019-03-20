/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}




// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
$(document).ready(function () {

  let newTweet = createTweetElement(tweetData);

  $('#all-tweets').append(newTweet);

  function createTweetElement(tweetObj) {
    //gets the tweet properties from the passed object
    let avatar = $('<img>').attr('src',tweetObj["user"]["avatars"]["small"]);
    let name = tweetObj["user"]["name"];
    let handle = tweetObj["user"]["handle"];
    let content = tweetObj["content"]["text"];
    let time = tweetObj["created_at"];
    let firstIcon = $('<img>').attr('src',"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdwg0wJVieaSx6QuLadnzwTV31477EvTmEUZXpQWOoqO0p3xP3w");
    let secondIcon = $('<img>').attr('src',"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMAmiZyTmfSZPpUBJQQI_jCBDzt6hKtU9Jb6R71Psv191K0dVS4w");
    let thirdIcon = $('<img>').attr('src',"data:image/jpeg;base64,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");

    //creats a new tweet class in an article
    tweet = $('<article>').addClass('tweet');

    //creats the tags of the tweet class
    let header = tweet.append($('<header>'));
    let img = header.append($('<img>'));
    let h5 = header.append($('<h5>'));
    let h6 = header.append($('<h6>'));
    let div = tweet.append($('<div>'));
    let p = div.append($('<p>'));
    let footer = tweet.append($('<footer>'));
    let span = footer.append($('<span>').addClass('icons'));

    //appends the properties to the tweet tags
    img.append(avatar);
    h5.append(name);
    h6.append(handle);
    p.append(content);
    footer.append(time);
    span.append(firstIcon);
    span.append(secondIcon);
    span.append(thirdIcon);

    return (tweet);
  }
})

//  <article class="tweets">
//    <header>
//          <img src="https://img5.androidappsapk.co/300/7/7/6/com.ivh.funnyjokes.png" alt="Smiley face" height="50" width="50">
//          <h5>Bana Batshon</h5>
//          <h6>@Banana</h6>
//    </header>
//    <div>
//      <p>Hi there! this is my first tweet</p>
//    </div>
//    <footer>
//      10 days ago
//      <span class="icons">
//        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdwg0wJVieaSx6QuLadnzwTV31477EvTmEUZXpQWOoqO0p3xP3w" alt="heart" height="20" width="20">
//        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMAmiZyTmfSZPpUBJQQI_jCBDzt6hKtU9Jb6R71Psv191K0dVS4w" alt="Smiley face" height="20" width="20">
//        <img src="data:image/jpeg;base64,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" alt="Smiley face" height="20" width="20">
//      </span>
//    </footer>
//  </article>

    // note for using ajax later: $.ajax("http://").done((response) => {
    // response.tweets.forEach(renderTweet)
    // })
    //$


