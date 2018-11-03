var baseurl = "https://api.hnpwa.com/v0/";
var container = document.querySelector(".container");
var currentPage = "HNClone";
var page = 1;
var api = {
  "HNClone": {url: "news", maxPage: 10},
  "new": {url: "newest", maxPage: 12},
  "ask": {url: "ask", maxPage: 2},
  "show": {url: "show", maxPage: 2},
  "jobs": {url: "jobs", maxPage: 1}
};

fetch("https://api.hnpwa.com/v0/news/1.json")
.then(function(res) {
  return res.json();
})
.then(makeList);

document.addEventListener("click", clickNav);

function clickNav(e) {
  var parent = e.target.parentElement;

  if (parent && parent.nodeName === "NAV") {
    var current = e.target;
    var url = baseurl + api[current.innerText].url + "/" + page + ".json";
    page = 1;
    currentPage = current.innerText;

    fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(makeList);
  } else if (parent && parent.classList.contains("selectPage")) {
    var current = currentPage;

    if (e.target.classList.contains("pre")) {
      page--;
      if (page < 1) {
        page = 1;
        return;
      }
    } else if (e.target.classList.contains("next")) {
      page++;
      if (page > api[current].maxPage) {
        page = api[current].maxPage;
        return;
      }
    }
    var url = baseurl + api[current].url + "/" + page + ".json";

    fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(makeList);

    window.scrollTo({
      top: 0
      // behavior: "smooth"
    });
  }
}

function makeList(data) {
  // console.log(data);
  container.innerText = "";
  for (var i = 0; i < data.length; i++) {
    var item = document.createElement("div");
    item.className = "item";
    item.id = data[i].id;
    if (data[i].type === "job") {
      item.innerHTML =
        '<p>' +
          '<span class="title"><a target="_blank" href=' + data[i].url + '>' + data[i].title + ' </a></span>' +
          '<span class="domain"><a target="_blank" href=' + data[i].url + '>(' + data[i].domain + ')</a></span></p>' +
        '<p class="sub">' +
          '<span class="time">' + data[i].time_ago + '</span>' +
        '</p>'
    } else {
      item.innerHTML =
        '<p>' +
          '<span class="title"><a target="_blank" href=' + data[i].url + '>' + data[i].title + ' </a></span>' +
          '<span class="domain"><a target="_blank" href=' + data[i].url + '>(' + data[i].domain + ')</a></span>' +
        '</p>' +
        '<p class="sub">by ' +
          '<span class="userName">' + data[i].user + '</span> | ' +
          '<span class="time">' + data[i].time_ago + '</span> | ' +
          '<span class="comments" id=' + data[i].id + '>' + data[i].comments_count + ' comments</span>' +
        '</p>';
    }
    container.append(item);
  }
  return false;
}

document.addEventListener("click", clickUserName);

function clickUserName(e) {
  var current = e.target;

  if (current && current.classList.contains("userName")) {
    var url = baseurl + "user/" + current.innerText + ".json";

    fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(makeUserPage);
  }
}

function makeUserPage(data) {
  container.innerText = "";
  var userData = document.createElement("div");
  userData.className = "userPage";
  userData.innerHTML =
    '<p>user: ' + data.id + '</p>' +
    '<p>created: ' + data.created + '</p>' +
    '<p>karma: ' + data.karma + '</p>';
  container.append(userData);
}

document.addEventListener("click", clickComments);

function clickComments(e) {
  var current = e.target;

  if (current && current.classList.contains("comments")) {
    var url = baseurl + "item/" + current.id + ".json";
    // console.log(url);
    container.innerText = "";

    fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(makeCommentsList)
  }
}

function makeCommentsList(data, parent) {
  // console.log(data);
  // console.log(parent)
  if (parent === undefined) {
    parent = container;
  }
  if (data.comments.length !== 0) {
    for (var i = 0; i < data.comments.length; i++) {
      // console.log(data.comments[i].content);
      var comment = document.createElement("div");
      comment.className = "comment";
      comment.innerHTML =
        '<span class="userName">' + data.comments[i].user +'</span>' +
        '<span>' + data.comments[i].time_ago + '</span>' +
        data.comments[i].content;
      parent.append(comment);
      makeCommentsList(data.comments[i], comment);
    }
  }
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCd7vzKFIz0a12Cyt9rjH5WYoYOsBafmFo",
  authDomain: "hackernewsclone-5f100.firebaseapp.com",
  databaseURL: "https://hackernewsclone-5f100.firebaseio.com",
  projectId: "hackernewsclone-5f100",
  storageBucket: "hackernewsclone-5f100.appspot.com",
  messagingSenderId: "698410079561"
};
firebase.initializeApp(config);
