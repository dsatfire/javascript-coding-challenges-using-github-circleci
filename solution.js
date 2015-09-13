Solution = (function() {
  return {
    calculateAmountOfWaterCollected: function(n) {
      var getVolume = function (leftIndex, rightIndex, array) {
        var height = Math.min(array[leftIndex], array[rightIndex]);
        var sum = 0;
        for (var i = leftIndex + 1; i < rightIndex; i++) {
          sum+= height - array[i]; 
        }
        return sum;
      }
      var pools = [];
      n.forEach(function (value, index, array){
            //nothing to do if at the bottom of a pool or under water
            if (value === 0 || (pools.length != 0 && array[pools[pools.length - 1]["right_index"]] > value)) {
              return;
            }
            var right = -1;
            
            for (var i = index + 1; i < array.length; i++) {
              if (array[i] >= value) {
                right = i;
                break;
              } else if (right === -1 && array[i] > 0) {
                 right = i;
              }else if (array[i] > array[right]) {
                right = i
              } 
            }
            if (right === -1) {
              return;
            }
            pools.push({left_index:index, right_index: right, volume:  getVolume(index, right, array) });
        });
      return pools.reduce(function (previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue["volume"];
      }, 0);
    }    
  }
}());