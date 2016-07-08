
$(document).ready(function(){
  $('.registerButton').on('click',function(){
    fields=['fname','lname','userName','email','password','cpassword'];
    registerData={};
    registerData['fname']=$('.fnameInput').children(0).val();
    registerData['lname']=$('.lnameInput').children(0).val();
    registerData['userName']=$('.userNameInput').children(0).val();
    registerData['email']=$('.emailInput').children(0).val();
    registerData['password']=$('.passwordInput').children(0).val();
    registerData['cpassword']=$('.cpasswordInput').children(0).val();
    $('.errorMessage').css({'display':'none'});
    error="";
    for(i=0;i<fields.length;i++)
    {
      if(registerData[fields[i]]=="")
      {
          $('.'+fields[i]+'Input').children(0).css({'borderColor':'#f96e64'});
          error="<kbd>Fill all the fields.</kbd>";
      }
      else
      {
        $('.'+fields[i]+'Input').children(0).css({'borderColor':''});
      }
    }
    if(error==""&&registerData['email'].split('@').length!=2)
    {
      $('.emailInput').children(0).css({'borderColor':'#f96e64'});
      error="<kbd>Invalid email format.</kbd>";
    }
    if(error==""&&registerData['password']!=registerData['cpassword'])
    {
        $('.passwordInput').children(0).css({'borderColor':'#f96e64'});
        $('.cpasswordInput').children(0).css({'borderColor':'#f96e64'});
        error="<kbd>Passwords donot match.</kbd>";
    }
    if(error!="")
    {
      showError(error);
    }
    else
    {
      $.ajax({
        url:'register',
        type:'POST',
        data:registerData,
        success:function(result){
          if(result=="")
          {
            window.location='/';
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