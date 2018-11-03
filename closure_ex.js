var arr = [ 1, 2, 3 ];

console.log(1);

var i; // i > 3, 3, 3

for (i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(arr[i]);
  }, i * 100);
}

console.log(2);

//=================================

var arr = [ 1, 2, 3 ];

var i; // i > 3, 3, 3

for (i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(arr[i]);
  }, i * 100);
}

console.log(2);

//=================================

var arr = [ 1, 2, 3 ];

function timer (j) { // j > 0, 1, 2
  setTimeout(function () {
    console.log(arr[j]);
  }, j * 100);
}

for (i = 0; i < arr.length; i++) {
  timer(i);
}

console.log(2);
