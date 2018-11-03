var baseurl = "https://hacker-news.firebaseio.com/v0/";
var container = document.querySelector(".container");
var ol = document.querySelector(".ol");
var newbtn = document.querySelector("#new");
var listNum = 10;
var itemList;

newbtn.addEventListener("click", function() {
  ol.innerText = "";
  var promise = new Promise(makeItem);
  promise.then(function() {
    console.log(itemList);
    for (var i = 0; i < listNum; i++) {
      var url = baseurl + "item/" + itemList[i] + ".json";

      fetch(url)
      .then(function(res) {
        return res.json();
      })
      .then(makeList)
    }
  });
});

function makeItem(resolve) {
  var url = baseurl + "newstories/.json";

  fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    itemList = data;
    resolve(itemList);
  });
}

function makeList(data) {
  var list = document.createElement("li");
  var title = document.createElement("p");
  var sub = document.createElement("p");
  list.id = data.id;
  title.className = "title";
  sub.className = "sub";
  title.innerHTML = "<a target='_blank' href=" + data.url + ">" + data.title + "</a>";
  sub.innerText = data.score + " points by " + data.by + " | " + data.descendants + " comments"
  list.append(title);
  list.append(sub);
  ol.append(list);
  console.log(data.id)
  console.log(data.title);
}
