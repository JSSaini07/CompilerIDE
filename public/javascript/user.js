
$(document).ready(function(){
  $('.link').on('click',function(){
    window.location=$(this).text();
  });
});