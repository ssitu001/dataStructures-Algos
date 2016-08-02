// sorting

function ArrayList() {
  let array = [];

  //non sorted array creator
  function createNonSortedArray(size) {
    let array = [];
    for (let i = size; i > 0; i--) {
      array.push(i);
    }
    return array;
  };

  //swap helper
  // function swap(array, val1, val2) {
  //   let temp = array[val2];
  //     array[val2] = array[val1];
  //     array[val] = temp;
  // }

  //swap helper es6
  function swap(array, val1, val2) {
    [array[val1], array[val2]] = [array[val2], array[val1]];
  }

  //helper for mergeSort
  function mergeSortRec(array) {
    if(array.length === 1) {
      return array;
    }
    let mid = Math.floor(length/2);
    let left = array.slice(0, mid);
    let right = array.slice(mid, array.length);

    return merge(mergeSortRec(left), mergeSortRec(right));
  };

  //helper for mergeSort cont.
  function merge(left, right) {
    let result = [];
    let iL = 0;
    let iR = 0;

    while(iL < left.length && iR < right.length) {
      if(left[iL] < right[iR]) {
        result.push(left[iL++]);
      } else {
        result.push(right[iR++]);
      }
    }

    while(iL < left.length) {
      result.push(left[iL++]);
    }

    while(iR < right.length) {
      result.push(right[iR++]);
    }

    return result;
  }

  //helper for quick sort
  function quick(array, left, right) {
    let index;
    if(array.length > 1) {
      index = partition(array, left, right);
      if(left < index - 1) {
        quick(array, left, index-1);
      }
      if(index < right) {
        quick(array, index, right);
      }
    }
  };

  //Partition for quick sort
  function partition(array, left, right) {
    let pivot = array[Math.floor((right+left)/2)];
    let l = left;
    let r = right;

    while (l <= r) {
      while ( array[l] < pivot ) {
        l++;
      }
      while ( array[r] > pivot ) {
        r--;
      }
      if ( l <= r ) {
        swap(array, l, r);
        l++;
        r--;
      }
    }
    return l;
  };

  //====================================

  this.insert = item => {
    array.push(item);
  };

  this.toString = () => 
    array.join();

  this.bubbleSort = () => {
    let length = array.length;
    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length-1; j++) {
        if(array[j] > array[j+1]) {
          swap(array, j, j+1)
        }
      }
    }
  };

  //improved bubbleSort O(n^2)
  this.modifiedBubbleSort = () => {
    let length = array.length;
    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length-1-i; j++) {
        if(array[j] > array[j+1]) {
          swap(array, j, j+1)
        }
      }
    }
  }; 

  //selection sort O(n^2)
  this.selectionSort = () => {
    let minIndex;
    for(let i = 0; i < array.length-1; i++) {
      minIndex = i;
      for(let j = i; j < array.length; j++) {
        if(array[minIndex] > array[j]) {
          minIndex = j;
        }
      }
      if (i !== minIndex) {
        swap(array, i, minIndex);
      }
    }
  };

  //insertion sort-better performance than the selection and bubble sort algorithms when sorting small arrays.
  this.insertionSort = () => {
    let temp;
    let aux;
    for(let i = 0; i < array.length; i++) {
      aux = i;
      temp = array[i];

      while (aux > 0 && array[aux - 1] > temp) {
        array[aux] = array[aux - 1];
        aux--;
      }

      array[aux] = temp;
    }
  };

  //merge sort O(nlogn);
  this.mergeSort = () => {
    array = mergeSortRec(array);
  };

  //quick sort O(nlogn) and most used/best performance;
  this.quickSort = () => {
    quick(array, 0, array.length -1);
  }




}