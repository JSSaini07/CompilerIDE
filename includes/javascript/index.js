
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/c_cpp");
editor.$blockScrolling = Infinity;

clickState=-1;

language_map={
  'C':'C',
  'C++':'CPP11',
  'Clojure':'CLOJURE',
  'C#':'CSHARP',
  'Java':'JAVA',
  'Javascript':'JAVASCRIPT',
  'Haskell':'HASKELL',
  'Perl':'PERL',
  'PHP':'PHP',
  'Python':'PYTHON',
  'Ruby':'RUBY',
  'CPP11':'C++',
  'CLOJURE':'Clojure',
  'CSHARP':'C#',
  'JAVA':'Java',
  'JAVASCRIPT':'Javascript',
  'HASKELL':'Haskell',
  'PERL':'Perl',
  'PYTHON':'Python',
  'RUBY':'Ruby'
}

starter_code_map={
  'C':'#include <stdio.h>\nint main(void) {\n  // your code goes here\n  return 0;\n}',
  'C++':'#include <iostream>\nusing namespace std;\nint main() {\n  // your code goes here\n  return 0;\n}',
  'Clojure':'; your code goes here',
  'C#':'using System;\npublic class Test\n{\n	public static void Main()\n	{\n		// your code goes here\n	}\n}',
  'Java':'import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\nclass HelloWorld\n{\n	public static void main (String[] args) throws java.lang.Exception\n	{\n		// your code goes here\n	}\n}',
  'Javascript':'// your code goes here',
  'Haskell':'-- your code goes here',
  'Perl':'# your code here',
  'PHP':'// your code goes here',
  'Python':'#your code goes here',
  'Ruby':'#your code goes here'
}

mode_map={
  'C':'c_cpp',
  'C++':'c_cpp',
  'CPP11':'c_cpp',
  'Clojure':'clojure',
  'CLOJURE':'clojure',
  'C#':'csharp',
  'CSHARP':'csharp',
  'Java':'java',
  'JAVA':'java',
  'Javascript':'javascript',
  'JAVASCRIPT':'javascript',
  'Haskell':'haskell',
  'HASKELL':'haskell',
  'Perl':'perl',
  'PERL':'perl',
  'PHP':'php',
  'Python':'python',
  'PYTHON':'python',
  'Ruby':'ruby',
  'RUBY':'ruby'
}

code_id=window.location.search.split('=')[1];

function run(){
  $('.loading').css({'display':'initial'});
  $('.ace_editor').animate({marginTop:'0px'});
  code=editor.getValue();
  input=$('.input').val();
  $.ajax({
    url:'run',
    method:'GET',
    data:{
      'lang':language_map[languageSelected],
      'code':code,
      'input':input
      },
    success:function(result){addResult(result);}
  });
}

$.ajax({
  url:'/getCode?code_id='+code_id,
  method:'GET',
  success:function(result){
    if(result.length!=0)
    {
      splitIndex=result.indexOf('/');
      languageSelected=result.substr(0,splitIndex);
      languageSelected=language_map[languageSelected];
      code=result.substr(splitIndex+1,result.length);
      editor.setValue(code);
      $('#selected').attr('id','');
      $('.languageSelected').html('<kbd>'+languageSelected+'</kbd>');
      $('.'+language_map[languageSelected]).attr('id','selected');
      editor.getSession().setMode("ace/mode/"+mode_map[languageSelected]);
      run();
    }
    else {
      editor.setValue(starter_code_map['C++']);
      languageSelected='C++';
    }
  }
});

$(document).ready(function(){
  $('.languageSelected').click(function(){
    $('.language_select_menu').css({'display':'initial'});
    $('.ace_editor').animate({marginTop:'140px'});
  });
  $('.language').click(function(){
    $('.ace_editor').animate({marginTop:'0px'},function(){
      $('.language_select_menu').css({'display':'none'});
    });
      languageSelected=this.innerHTML;
      $('.languageSelected').html('<kbd>'+languageSelected+'</kbd>');
      $('#selected').attr('id','');
      $(this).attr('id','selected');
      editor.getSession().setMode("ace/mode/"+mode_map[languageSelected]);
      editor.setValue(starter_code_map[languageSelected]);
  });
  $('.custom_input').click(function(e){
    if(clickState==-1) {
      width=$('.input').width();
      x=e.pageX-width;
      y=e.pageY+20;
      $('.input').css({display:'initial',left:x,top:y});
    }
    else {
        $('.input').css({display:'none'});
    }
    clickState*=-1;
  });
  $('.run').click(function(){run()});
  $('.themeChange').click(function(){
    if(editor.getTheme().indexOf('github')>0)
    {
      editor.setTheme("ace/theme/monokai");
      this.style='background:url("/images/day.png");background-size:40px 40px;';
    }
    else {
      editor.setTheme("ace/theme/github");
      this.style='background:url("/images/night.png");background-size:40px 40px;';
    }
  });
});
function addResult(result) {
  result=JSON.parse(result);
  code_id=result.code_id;
  status=result.run_status.status;
  if(status=='AC') {
    $('.code_status').html("<code> AC </code>");
    result=result.run_status.output_html;
  }
  else
  if(status=='CE') {
    $('.code_status').html("<code> CE </code>");
    result=result.compile_status;
  }
  else {
  if(status=='TLE') {
    $('.code_status').html("<code> TLE </code>");
    result="";
  }
  else {
    $('.code_status').html("<code> SIGSEGV </code>");
    result="";
  }
  }
  $('.loading').css({'display':'none'});
  $('.result').html(result);
  $('.code_url').html('<kbd><span class="code_label"> Code Url </span>:<span class="code_link"> http://compileride.herokuapp.com?code_id='+code_id+'</span></kbd>');
  $('.code_url').css({'display':'initial'});
}
