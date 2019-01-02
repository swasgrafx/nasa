//console.log(nasaKey);

var apod = {
  //Create a random apodDate
  randomDate: function(start, end) {
    var date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    //Format the date
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    if(m < 10){
      m = '0' + m;
    }

    if(d < 10){
      d = '0' + d;
    }

    return y + '-' + m + '-' + d;

  },

  buildDOM: function(result){

    $('#apodTitle').text(result.title);

    if(result.media_type === 'video') {
      $("#apodImg").hide();
      $("#apodVideo > iframe").attr("src", result.url).show();
    }else{
      $("#apodVideo").hide();
      $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
    }

    if(result.copyright){
//      if(result.copyright!=undefined){
        $('#apodCopyright').html('&copy;' + result.copyright + '&nbsp;');
    }

    $('#apodDate').text(result.date);
    $('#apodDesc').text(result.explanation);
  },

  getRequest: function(){
    var _this = this;
    //2011-03-28
    var date = this.randomDate(new Date(1995, 5, 16), new Date());
    //var date = this.randomDate(new Date(2011, 2, 28), new Date(2011, 2, 28));

    var url = "https://api.nasa.gov/planetary/apod?api_key="
      + '390M91Et3zMGVAsL2q7BYziWdK5Q3lfIMhFoSRl2'
      + '&date=' + date;

    $.ajax({
      url:url
    }).done(function(result){
      _this.buildDOM(result);
    }).fail(function(result){
      console.log(result);
    });
  },
  //Application constructor
  init: function() {
    this.getRequest();
  }
};

apod.init();

$(function(){
  $('#btnRandom').on('click',function(e){
    apod.getRequest();
    e.preventDefault();
  });
});
