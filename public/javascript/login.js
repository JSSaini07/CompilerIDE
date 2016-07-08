
$(document).ready(function(){
  $('.loginButton').on('click',function(){
    fields=['username','password'];
    loginData={};
    loginData['username']=$('.usernameInput').children(0).val();
    loginData['password']=$('.passwordInput').children(0).val();
    $('.usernameInput').children(0).css({'borderColor':''});
    $('.passwordInput').children(0).css({'borderColor':''});
    $('.errorMessage').css({'display':'none'});
    error="";
    if(loginData['username']=="")
    {
        $('.usernameInput').children(0).css({'borderColor':'#f96e64'});
        error="<kbd>Fill all the fields.</kbd>";
    }
    if(loginData['password']=="")
    {
        $('.passwordInput').children(0).css({'borderColor':'#f96e64'});
        error="<kbd>Fill all the fields.</kbd>";
    }
    if(error!="")
    {
      showError(error);
    }
    else
    {
      $.ajax({
        url:'login',
        type:'POST',
        data:loginData,
        success:function(result){
          if(result=="")
          {
            window.location="/";
          }
          else
          {
            showError(result);
          }
        }
      });
    }
  });
});

function showError(error) {
  $('.errorMessage').css({'display':'initial'});
  $('.errorMessage')[0].innerHTML=error;
}