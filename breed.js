var dogBreed;
var breedId;
var wantedBreed;
function dogSearch() {
  var queryURL = "https://api.thedogapi.com/v1/breeds/search?q=" + dogBreed + "&api_key=89916d17-0951-4678-b49b-662c62818c70";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    if (!response[0]) {
      $("#alertDog").removeClass("hide");
    }
    else {
      $("#alertDog").addClass("hide");
      if (response.length > 1) {
        var choice = $("<p>").text("Choose which dog breed you wanted:");
        $("#dogContent").append(choice);
        for (var i = 0; i < response.length; i++) {
          var dogChoices = $("<button>").text(response[i].name).addClass("dogChoiceBtn");
          $("#dogContent").append(dogChoices);
        }
        $(document).on("click", ".dogChoiceBtn", function (event) {
          event.stopImmediatePropagation();
          $("#dogContent").empty();
          $("#dogImg").attr("src", "");
          wantedBreed = $(this).text();
          for (var i = 0; i < response.length; i++) {
            console.log(response[i].name, wantedBreed);
            if (wantedBreed == response[i].name) {
              breedId = response[i].id;
              console.log("You wanted: " + response[i].name);
              $(".dogChoiceBtn").remove();
              $(choice).remove();
              $("#dogContent").prepend("<p>Life Span: " + response[i].life_span + " years</p>");
              $("#dogContent").prepend("<p>Weight: " + response[i].weight.imperial + " lbs</p>")
              $("#dogContent").prepend("<p>Temperament: " + response[i].temperament + "</p>");
              $("#dogContent").prepend("<h4>" + response[i].name + "</h4>");
              dogImgSearch(breedId);
            }
          }
        });
      }
      else {
        breedId = response[0].id;
        $("#dogContent").prepend("<p>Life Span: " + response[0].life_span + " years</p>");
        $("#dogContent").prepend("<p>Weight: " + response[0].weight.imperial + " lbs</p>")
        $("#dogContent").prepend("<p>Temperament: " + response[0].temperament + "</p>");
        $("#dogContent").prepend("<h4>" + response[0].name + "</h4>");
        dogImgSearch(breedId);
      }
    }
  });
}
function catImgSearch(breedId) {
  console.log(breedId + " cat image search");
  queryURL = "https://api.thecatapi.com/v1/images/search?breed_id=" + breedId + "&api_key=89916d17-0951-4678-b49b-662c62818c70";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log()
    if (response[0]) {
      $("#catImg").attr("src", response[0].url);
      $("#catImg").css("width", "300px");
    }
    else {
      $("#catContent").append("<p>[No Picture Available]</p>");
    }
  });
}
function dogImgSearch(breedId) {
  queryURL = "https://api.thedogapi.com/v1/images/search?breed_id=" + breedId + "&api_key=89916d17-0951-4678-b49b-662c62818c70";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    if (response[0]) {
      $("#dogImg").attr("src", response[0].url);
      $("#dogImg").css("width", "300px");
    }
    else {
      $("#dogContent").append("<p>[No Picture Available]</p>")
    }
  });
}
//hides user error alert when they click the 'x'
function alertHide() {
  $("#alertCat").addClass("hide");
  $("#alertDog").addClass("hide");
}