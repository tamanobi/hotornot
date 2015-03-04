function comp(a, b) {
  var counter = 0;
  function countUp(){
    counter++;
  }
  return a-b;
}
var comp = {
  counter : 0,
  comp : function(a, b) {this.counter++; return a-b;}
};
var comp2 = {
  counter : 0,
  comp : function(a, b) {this.counter++; return a-b;}
};
function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}
function swapArray(ary,a, b) {
  var tmp = ary[a];
  a = ary[b];
  b = tmp;
}
function quick_sort(list, head, tail) {
  if (head >= tail) return;
  var pivotIndex = getRandomInt(head, tail);
  var pivot = list[pivotIndex];
  var left = head;
  var right = tail;
  var count = 0;
  var cc = 0;
  while (true) {
    //while (list[left] - pivot < 0) left++;
    //while (pivot - list[right] < 0) right--;
    while (comp2.comp(list[left] - pivot < 0)) left++;
    while (comp2.comp(pivot - list[right] < 0)) right--;
    if (left >= right) break;
    var tmp = list[left];
    list[left] = list[right];
    list[right] = tmp;
    left++;
    right--;
  }
  if (left - head > 1) quick_sort(list, head, left-1);
  if (tail - right > 1) quick_sort(list, right+1, tail);
}
function partition(list, head, tail, pivotIndex) {
  var pivot = list[pivotIndex];
  list[pivotIndex] = list[tail];
  list[tail] = pivot;

  var storeIndex = head;
  for (var i=head; i<=tail-1; i++) {
    if (comp.comp(list[i], pivot) <= 0) {
      var tmp = list[storeIndex];
      list[storeIndex] = list[i];
      list[i] = tmp;
      storeIndex++;
    }
  }
  var tmp = list[tail];
  list[tail] = list[storeIndex];
  list[storeIndex] = tmp;
  return storeIndex;
}
// @see http://ja.wikipedia.org/wiki/%E9%81%B8%E6%8A%9E%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0
function sortFirstK(list, head, tail, K) {
  if (tail > head) {
    var pivotIndex = getRandomInt(head, tail);
    var pivot = list[pivotIndex];
    pivotNewIndex = partition(list, head, tail, pivotIndex);
    sortFirstK(list, head, pivotNewIndex-1, K);
    if (pivotNewIndex < K)
      sortFirstK(list, pivotNewIndex+1, tail, K);
  }
}
function knuthShuffle(list) {
  var N = list.length;
  for(var i = N-1; i >= 0; i--) {
    var r = getRandomInt(0, i);
    var t = list[i];
    list[i] = list[r];
    list[r] = t;
  }
}
function test() {
  var list1 = [];
  var list2 = [];
  var N = 30;
  for(var i = 0; i<N; i++) {
  list1.push(getRandomInt(0, N));
  list2.push(i);
  }
  knuthShuffle(list2);

  console.log(list1);
  quick_sort(list1, 0, N-1);
  console.log(list1);
  console.log(comp2.counter);

  console.log(list2);
  sortFirstK(list2, 0, N-1, 3);
  console.log(list2);
  console.log(comp.counter);
}
function comparison(val) {
  // クリックされたらオブジェクトに通知して、ビューを更新
  if (val > 0) {
    console.log("selected right");
  } else if (val < 0 ) {
    console.log("selected left");
  } else {
    console.log("selected center");
  }
  update();
}
function update() {
}
function makePair(list) {
  var pair = [];
  
  return pair;
}
var View = function (rightName, centerName, leftName) {
  this.right = $("#"+rightName);
  this.center = $("#"+centerName);
  this.left = $("#"+leftName);
  this.counter = 0;
  this.update = function(){
  };
};
var Model = {
  list : [],
};
function setup() {
  list = [
    "エーリカ",
    "クドリャフカ",
    "神北小毬",
    "かんな",
    "ルイズ"
  ];
  var view = new View("left", "center", "right");
  console.log(list);
  view.left.on('click', function() {
    comparison(+1);
  });
  view.center.on('click', function() {
    comparison(0);
  });
  view.right.on('click', function() {
    comparison(-1);
  });
  console.log(view);
}
$(function(){
  setup();
});
