$(document).ready(function(){
  var select = ["#location a", "#map a", "#profile", "#settings a"];

  for (var i = 0; i<select.length; i++){
    $(select).click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  }
})
