// tri à peigne O(n log n)

var combSort = function (array) {
    var interval = Math.floor(array.length/1.3);
    while (interval > 0) {
      for(var i=0; i+interval<array.length; i+=1) {
        if (array[i] > array[i+interval]) {
          var small = array[i+interval];
          array[i+interval] = array[i];
          array[i] = small;
        }
      }
      interval = Math.floor(interval/1.3);
    }
    return array;
  };
  
// -------------------------------------------------
// tri fusion

function mergeSort(array,half = array.length/2){

    if(array.length < 2){
      return array  // it means we no longer divide the array
                    // into smaller chunks
    }
  
    const left = array.splice( 0,half ); //left part of  the array
  
    return merger( mergeSort( left ),mergeSort( array ) )
  }

  function merger(left, right) {
    const arr = [  ];
    while (left.length && right.length) {
        if (left[ 0 ] < right[ 0 ]) {
            arr.push( left.shift( ) ) // remove from the left part and push into
                                              //the sorted array
        } else {
            arr.push( right.shift(  ) ) // remove from the right part and push into
                                               //the sorted array
        }
    }
    return [ ...arr, ...left, ...right ];
}
    // ------------------------------------------------------
// quicksort

    function quick_Sort(origArray) {
        if (origArray.length <= 1) { 
            return origArray;
        } else {
    
            var left = [];
            var right = [];
            var newArray = [];
            var pivot = origArray.pop();
            var length = origArray.length;
    
            for (var i = 0; i < length; i++) {
                if (origArray[i] <= pivot) {
                    left.push(origArray[i]);
                } else {
                    right.push(origArray[i]);
                }
            }
    
            return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
        }
    }


// _____________________________________________________________
const ramdomArray = function(l){
    var tab = []
    for (let index = 0; index < l; index++) {
        tab.push(Math.floor(Math.random() * 100))
    }
    return tab;
}


var arraySize = 10000;
var arrayNumber = 1000;

var array1 = []
var array2 = []
var array3 = []
for (let index = 0; index < arrayNumber; index++) {
    array1.push(ramdomArray(arraySize))
    array2.push(ramdomArray(arraySize))
    array3.push(ramdomArray(arraySize))
}


// console.log(allArray)


var startTime = new Date().getTime();
var elapsedTime = 0;

for (let index = 0; index < arrayNumber; index++) {
    combSort(array1[index])
}

elapsedTime = new Date().getTime() - startTime;

console.log('tri peigne: '+elapsedTime/arrayNumber + ' ms');

var startTime = new Date().getTime();
var elapsedTime = 0;

for (let index = 0; index < arrayNumber; index++) {
    mergeSort(array2[index])
}

elapsedTime = new Date().getTime() - startTime;

console.log('tri fusion: '+elapsedTime/arrayNumber + ' ms');

var startTime = new Date().getTime();
var elapsedTime = 0;


for (let index = 0; index < arrayNumber; index++) {
    quick_Sort(array3[index])
}

elapsedTime = new Date().getTime() - startTime;

console.log('tri rapide: '+elapsedTime/arrayNumber + ' ms');


// tri fusion version elixir


function _divise(l,acc1 = [],acc2 = []){
    if (l.length == 0) {
         return [acc1,acc2]
    }else if( (l.slice(1)).length == 0){
        return  [[l[0]].concat(acc1),acc2]
    } else {
        return _divise(l.slice(2),[l[0]].concat(acc1),[l.slice(1)[0]].concat(acc2))
    }
}



function _fussionne(l1,l2,acc = []){
    if(l1.length == 0){
        return acc.concat(l2)
    }else if(l2.length == 0){
        return acc.concat(l1)
    }else{
        return l1[0] < l2[0] && _fussionne(l1.slice(1),l2,acc.concat([l1[0]])) ||_fussionne(l1,l2.slice(1),acc.concat([l2[0]]))
    }
}

function _tri_fusion(l,acc = []){
    if(l.length == 0){
        return acc
    }else if(l.slice(1).length==0){
        return l
    }else{
        tuple = _divise(l)
        const l1 = tuple[0]
        const l2 = tuple[1]
        return _fussionne(_tri_fusion(l1),_tri_fusion(l2))
    }
}



// faire des courbes sur 10, 100 répétitions....
