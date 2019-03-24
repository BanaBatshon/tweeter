$(document).ready(function() {
    let maxLength = 140;
    $("textArea").on('keyup', function() {
      let length = $(this).val().length;
      let counter = maxLength - length;
      $(".counter").html(counter);
      if (counter < 0) {
        $(".counter").css('color', 'red');
      } 
      else if (counter === 0) {
        $(".counter").css('color', 'orange');
      }
  })
});