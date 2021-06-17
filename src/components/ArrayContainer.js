import { useState } from "react";
import ArrayElement from "./ArrayElement";
import "./ArrayContainer.css";

function makeArray(num) {
  var tempArr = [];
  for (var i = 0; i < num; i++) {
    tempArr.push(Math.random() * 150 + 20);
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
  var swappedPairs = [];
  var comparedPairs = [];
  var sortedAt = arr.length;
  while (sortedAt > 1) {
    for (var k = 0; k < sortedAt; k++) {
      if (k + 1 < sortedAt) {
        comparedPairs.push([k, k + 1]);
        if (arr[k] > arr[k + 1]) {
          swappedPairs.push([k, k + 1]);
          swap(arr, k, k + 1);
        }
      }
    }
    sortedAt--;
  }
  return [arr, swappedPairs, comparedPairs];
}
function ArrayContainer({ sortList }) {
  const numElements = 10;
  const containerHeight = window.innerHeight * 0.4;
  var containerWidth = window.innerWidth * 0.5;
  var [values, setValues] = useState(makeArray(numElements));
  var [barColors, setBarColors] = useState(Array(numElements).fill("red"));
  var barWidth = containerWidth / values.length;

  function btnSortClicked() {
    // setValues(bubbleSort(values.slice()));
    var returnedValues = bubbleSortStep(values.slice());
    var sorted = returnedValues[0];
    var swappedPairs = returnedValues[1];
    var comparedPairs = returnedValues[2];
    var newArray = [...values];
    const arrayBars = document.getElementsByClassName("bar");
    // Returns a Promise that resolves after "ms" Milliseconds
    var paused = 500;
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    async function load() {
      // We need to wrap the loop into an async function for this to work
      for (var i = 0; i < comparedPairs.length; i++) {
        var swapped = false;
        swappedPairs.map(function (value, index) {
          if (comparedPairs[i][2] === value[2]) {
            swapped = true;
          }
        });
        if (swapped) {
          arrayBars[comparedPairs[i][0]].style.backgroundColor = "purple";
          arrayBars[comparedPairs[i][1]].style.backgroundColor = "purple";
          await timer(paused);
          // const temp = arrayBars[comparedPairs[i][0]].style.height;
          // arrayBars[comparedPairs[i][0]].style.height =
          //   arrayBars[comparedPairs[i][1]].style.height;
          // arrayBars[comparedPairs[i][1]].style.height = temp;
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
    // for (var k = 0; k < swappedPairs.length; k++) {

    //   setTimeout(() => {
    //     console.log(k);
    //     var temp = arrayBars[swappedPairs[k][0]].style;
    //     arrayBars[swappedPairs[k][0]].style =
    //       arrayBars[swappedPairs[k][1]].style;
    //     arrayBars[swappedPairs[k][1]].style = temp;
    //   }, 1 * k);
    // }
  }
  function btnReset() {
    setValues(makeArray(numElements));
  }
  return (
    <div>
      <button onClick={btnReset}>Generate New Array</button>
      <button onClick={btnSortClicked}>Click me to sort</button>
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
