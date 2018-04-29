
$(function(){
  // set an Unsplash photo as a background
  $(".container-fluid").css({
  'background-image' : 'url(https://images.unsplash.com/photo-1510575188413-04020c9623d4?auto=format&fit=crop&w=1132&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)'
   });
  
  var end, link;
  var txt, head, lk;
  
  // to fetch a random article
  $("#random").click(function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
    return false;
  });
  
  // to search for Wikipedia entries
  $("#search").click(function() {
    $(".article").empty();
    $(".panel").css({'padding' : '0.5vw'}).animate({left : '2.5vw', top : '9vh'}, 400);
    end = $("#in").val();
    link = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=6&search=" + end + "&format=json&callback=?";
    
    $.ajax({
      dataType: 'json',
      type: 'GET',
      url: link,
      success: function(data) {
        for (var i = 0; i < data[1].length; i++) {
          head = data[1][i];
          txt = data[2][i];
          lk = data[3][i];
          $(".article").append("<button class='btn-block'" + "id='" + i + "'>" + "<b>" + head + "</b>" + "<br>" + txt + "</button>" + "</a>" + "<br>");
          
          $(".btn-block").click(function(){
            window.open(data[3][this.id]);
            return false;
           });
        }
        return false;
      },
      error: function(errorMessage) {}
    });
  }); 
  
  // if user is on a mobile
  if (navigator.userAgent.match(/iphone|android|blackberry/ig)) {
    $(".btn").click(function() {
      var randomColorChange = '#'+ (Math.random()*0xFFFFFF<<0).toString(16);
      $(".container-fluid").css('background-color', randomColorChange);
      $(".container-fluid").css({'background-image' : 'none', 'height' : '220vh'});
    });
    $(".container-fluid").css({
  'background-image' : 'url(https://images.unsplash.com/photo-1510248703225-7f7838dfd579?auto=format&fit=crop&w=1534&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)', 'height' : '120vh', 'background-color' : '#dfbf9f'});
    $(".btn").addClass("btn-xs").css({'background-color' : '#a6a6a6'});   
    $(".panel").css({'width' : '39vw', 'padding' : '0.5vw'}).addClass("text-center");
    $(".article").css({'margin' : '35vh 0.5vw 1vh 0.5vw'});
    $("button").css({'font-size' : '7vw', 'background-color' : 'rgba(204, 204, 204, 0.8)'});
    $(".btn").css({'font-size' : '4vw'});
    
    // make it responsive to screen orientation
    if (screen.orientation.type === "landscape-secondary" || screen.orientation.type === "landscape-primary") {
      $("button").css({'font-size' : '3vw'});
      $(".btn").css({'font-size' : '2vw'});
      $(".container-fluid").css({'height' : '320vh'});
      $(".article").css({'margin' : '55vh 0.5vw 1vh 0.5vw'});
    } 
 } 
})


