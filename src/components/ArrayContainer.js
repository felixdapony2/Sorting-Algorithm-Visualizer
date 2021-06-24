import { useState } from "react";
import ArrayElement from "./ArrayElement";
import "./ArrayContainer.css";

function makeArray(num) {
  var tempArr = [];
  for (var i = 0; i < num; i++) {
    tempArr.push(Math.floor(Math.random() * 150 + 20));
  }
  return tempArr;
}
function swap(arr, a, b) {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  // [arr[a], arr[b]] = [arr[b], arr[a]];
}
function compare(a, b) {
  return a > b ? true : false;
}
function mergeSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  var m = l + Math.floor((r - l) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}
function merge(arr, l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;

  var temp1 = Array(n1);
  var temp2 = Array(n2);

  for (var i = 0; i < n1; i++) {
    temp1[i] = arr[l + i];
  }
  for (var i = 0; i < n2; i++) {
    temp2[i] = arr[m + 1 + i];
  }
  var i = 0;
  var j = 0;
  var k = l;
  while (i < n1 && j < n2) {
    if (temp1[i] <= temp2[j]) {
      arr[k] = temp1[i++];
    } else {
      arr[k] = temp2[j++];
    }
    k++;
  }
  while (i < n1) {
    arr[k++] = temp1[i++];
  }
  while (j < n2) {
    arr[k++] = temp2[j++];
  }
}
function bubbleSort(arr) {
  var sortedAt = arr.length;
  while (sortedAt > 1) {
    for (var k = 0; k < sortedAt; k++) {
      if (arr[k] > arr[k + 1]) {
        swap(arr, k, k + 1);
      }
    }
    sortedAt--;
  }
  return arr;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function bubbleSortStep(arr) {
  var comparedPairs = [];
  var sortedAt = arr.length;
  while (sortedAt > 1) {
    for (var k = 0; k < sortedAt; k++) {
      if (!(k + 1 >= sortedAt)) {
        comparedPairs.push([k, k + 1, 0]);
        if (arr[k] > arr[k + 1]) {
          comparedPairs[comparedPairs.length - 1][2] = 1;
          swap(arr, k, k + 1);
        }
      }
    }
    sortedAt--;
  }
  return [arr, comparedPairs];
}
function ArrayContainer({ sortList }) {
  const numElements = 10;
  const containerHeight = window.innerHeight * 0.4;
  var containerWidth = window.innerWidth * 0.5;
  var [values, setValues] = useState(makeArray(numElements));
  var [barColors, setBarColors] = useState(Array(numElements).fill("red"));
  var barWidth = containerWidth / values.length;

  function btnBubbleSortClicked() {
    // setValues(bubbleSort(values.slice()));
    var returnedValues = bubbleSortStep(values.slice());
    var sorted = returnedValues[0];
    var comparedPairs = returnedValues[1];
    const arrayBars = document.getElementsByClassName("bar");
    // Returns a Promise that resolves after "ms" Milliseconds
    var paused = 400;
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    async function load() {
      // We need to wrap the loop into an async function for this to work
      for (var i = 0; i < comparedPairs.length; i++) {
        var swapped = false;
        if (comparedPairs[i][2]) {
          arrayBars[comparedPairs[i][0]].style.backgroundColor = "purple";
          arrayBars[comparedPairs[i][1]].style.backgroundColor = "purple";
          await timer(paused);
          [
            arrayBars[comparedPairs[i][0]].style.height,
            arrayBars[comparedPairs[i][1]].style.height,
          ] = [
            arrayBars[comparedPairs[i][1]].style.height,
            arrayBars[comparedPairs[i][0]].style.height,
          ];
          await timer(paused);
          arrayBars[comparedPairs[i][0]].style.backgroundColor = "green";
          arrayBars[comparedPairs[i][1]].style.backgroundColor = "green";
        } else {
          arrayBars[comparedPairs[i][0]].style.backgroundColor = "blue";
          arrayBars[comparedPairs[i][1]].style.backgroundColor = "blue";
        }
        await timer(paused); // then the created Promise can be awaited
        arrayBars[comparedPairs[i][0]].style.backgroundColor = "red";
        arrayBars[comparedPairs[i][1]].style.backgroundColor = "red";
        // await timer(500); // then the created Promise can be awaited
      }
    }
    load();
  }
  function btnMergeSortClicked() {
    console.log(values);
    var tempArray = values.slice();
    mergeSort(tempArray, 0, tempArray.length - 1);
    setValues(tempArray);
  }
  function btnReset() {
    setValues(makeArray(numElements));
  }
  return (
    <div>
      <button onClick={btnReset}>Generate New Array</button>
      <button onClick={btnBubbleSortClicked}>BubbleSort</button>
      <button onClick={btnMergeSortClicked}>MergeSort</button>
      <div
        className="array"
        style={{
          height: containerHeight,
          margin: "auto",
          width: containerWidth,
          padding: "10px",
        }}
      >
        {values.map(function (value, index) {
          var config = {
            left: index * barWidth,
            width: barWidth,
            height: (value / Math.max(...values)) * containerHeight,
            color: barColors[index],
          };
          return (
            <div
              key={index}
              className="bar"
              style={{
                left: config.left + "px",
                width: config.width + "px",
                bottom: 0,
                height: config.height + "px",
                backgroundColor: config.color,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default ArrayContainer;
