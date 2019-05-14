$(document).ready(function() {
   
  $('.carousel').carousel({
        interval: false
    }); 
    
    /* Change the Name of the Shingle Color on default selected Shingle Line Image*/
    if($('li').hasClass('active')){
      $('li.active').find('span').html()
      setTimeout(function() {
        getActiveImageName();
      }, 100);           
    }

    /* Change the Name of the Shingle Color on Click Next and Previous Icons*/
    $("a.event-cap").on("click",function() {                
                setTimeout(function() {
                  if($('li').hasClass('active')){
                    getActiveImageName();
                    /* URL Build For the Bookmark Functionality */
                    getURLParam($('li.active').attr('data-slide-to'));  
                  }
              }, 100);                
      });
    
    /* Change the Name of the Shingle Color on Click Images*/
    $("li").on("click",function() {  
      $('#shingleName').html(' - '+$(this).find('span').html())   
      getURLParam($(this).attr('data-slide-to'));  
    });

    /* Shingle Color dropdown form submit */
    $('#shingles_dropdown').on("change",function() {       
         $('#shingleFrm').submit();    
      });
  }); 
 
  /* Change the URL for Bookmark the Shingle Images */
  function getURLParam(shingle_active){
    var url_param = '?zip='+$('#zip').val()+'&shingle='+$('#shingle_group_name').attr('uid-data')+'&shingle_active='+shingle_active;
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + url_param;
    window.history.pushState({ path: newurl }, '', newurl);
  }
 /* Get Selected Image Name */
  function getActiveImageName(){
    $('#shingleName').html(' - '+$('li.active').find('span').html()) 
  }
  
   