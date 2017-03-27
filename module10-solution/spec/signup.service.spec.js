describe('menu', function () {

  var menu;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menu = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  it('Should return item object if item exists', function() {

    var expectedResponse =
      "({'id':1,'short_name':'A1','name':'Won Ton Soup with Chicken','description':'chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions','price_small':2.55,'price_large':5.0,'small_portion_name':'pint','large_portion_name':'quart','created_at':'2017-03-25T16:03:30.715Z','updated_at':'2017-03-25T16:03:30.715Z','category_short_name':'A','image_present':true})";

    // A1 does exist
    var requestUrl = ApiBasePath + '/menu_items/' + 'A1.json';

    $httpBackend.whenGET(requestUrl).respond(expectedResponse);

    menu.getItem('A1').then(function(response) {
      expect(response).toEqual(expectedResponse);
    }).catch(function (error) {
      console.log("menu.getItem('A1') returned an error!");
    });
    $httpBackend.flush();
  });

  it('Should return internal server error if item does not exist', function() {
    var expectedResponse = 
     "({'status':'500','error':'Internal Server Error'})";

    // Z1 does not exist
    var requestUrl = ApiBasePath + '/menu_items/' + 'Z1.json';

    $httpBackend.whenGET(requestUrl).respond(expectedResponse);

    menu.getItem('Z1').then(function(response) {
      console.log("Response = " + response);
      expect(response).toEqual(expectedResponse);
    }).catch(function (error) {
      console.log("menu.getItem('Z1') returned an error!");
    });
    $httpBackend.flush();

  });

});
