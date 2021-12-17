const createTweet = function (userObj) {
  const $article = $("<article>").addClass("article-tweet");
  const $header = `  
  <header class="tweet-header">
  <div>
    <img class="tweeter" src=${userObj.user.avatars} />
  </div>
  <div class="tweetname"><span>${userObj.user.name}</span></div>
  <div class="watermark"><p>${userObj.user.handle}</p></div>
</header>`;
  const $footer = `  
  <footer class="tweet-footer">
  <div><p>${timeago.format(userObj.created_at)}</p></div>
  <div>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
</footer>`;

  const $userContent = $("<div>").addClass("tweet-content");
  $("<p>").text(userObj.content.text).appendTo($userContent);

  //Create article by three parts
  $article.append($header, $userContent, $footer);
  return $article;
};

// Render all the tweets from the "/tweets".
const renderTweetElem = function (target, users) {
  target.empty();
  for (let userObj of users) {
    const newElem = createTweet(userObj);
    target.prepend(newElem);
  }
};

const hideErrorMessage = function () {
  $(".error-message1").hide();
  $(".error-message2").hide();
};

// ----------------------
$(document).ready(function () {
  hideErrorMessage();
  const container = $(".tweets-container");

  // get data from /tweets by using ajax
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      datatype: "json",
      success: (tweets) => {
        renderTweetElem(container, tweets);
      },
      error: (err) => {
        console.log(`error is ${err}`);
      },
    });
  };
  loadTweets();

  const frm = $(".new-tweet-form");
  // When submit new tweets:
  frm.on("submit", function (event) {
    event.preventDefault();

    const serializedData = $(this).serialize();
    let contentValue = this.elements.text.value;

    // return error meaassge while submitting tweets without input
    if (contentValue.length === 0) {
      $(".error-message2").hide();
      $(".error-message1").slideDown("slow");
      return;
      // return error meaassge while submitting tweets with length more than 140
    } else if (contentValue.length > 140) {
      $(".error-message1").hide();
      $(".error-message2").slideDown("slow");
      return;
    } else {
      $.post("/tweets", serializedData, (response) => {
        loadTweets();
        $("#tweet-text").val(""); //clean the input part after submitting
        $(".counter").val(140); //counter part's value changes to 140 after submitting
        hideErrorMessage();
      });
    }
  });

  const clickNav = $(".nav-icon");
  // When click "Write a new tweet"
  clickNav.on("click", function (event) {
    event.preventDefault();
    if ($(".new-tweet").attr("hidden")) {
      $(".new-tweet").removeAttr("hidden");
      $("#tweet-text").focus();
    } else {
      $(".new-tweet").attr("hidden", true);
    }
  });

  // While scrolling down the window, the red arrow icon will show on the page. The icon will disappear when the page back to the top.
  $(window).on("scroll", function (event) {
    event.preventDefault();
    if ($(window).scrollTop() === 0) {
      $("#myBtn").attr("hidden", true);
    } else {
      $("#myBtn").removeAttr("hidden");
    }
  });
});
