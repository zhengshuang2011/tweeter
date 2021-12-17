$(document).ready(function () {
  const frm = $(".new-tweet-form");
  frm.on("input", function (event) {
    event.preventDefault();

    const inputBox = this.elements.text;
    const content = inputBox.value;
    const len = content.length;
    let count = 140 - len;
    $(".counter").val(count);
    if ($(".counter").val() < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "rgb(104 97 97)");
    }
  });
});
