$(function(){
  var checkedIn = false;
  //make it pretty
  $('#handlebars').on('hover mouseover', '.panel-body', function(){
    $(this).css('background-color', '#ededed');
  })

  .on('mouseleave', '.panel-body', function(){
    $(this).css('background-color', '#fff');
  })
  //on click hide every other gym expand box
  .on('tap click', '.panel-body', function(){
    $(this).css('background-color', '#ccc');
    var bodyId = "#"+$(this).attr('id');
    var headId = bodyId+"1";

    if (!checkedIn){//if they aren't checked in, check them in
      $('#handlebars').find('div').slideUp(500, function(){
      });
      $(headId).prepend("Checked in at: ").slideDown();
      $(bodyId).slideDown().parent().show(0);
      checkedIn = true;
    }
    else{//if they click again, check them out
      $('#handlebars').find('div').slideDown(500, function(){
        checkedIn = false;
      });
    };
  });
});
