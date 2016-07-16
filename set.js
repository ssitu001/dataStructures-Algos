//Set

function Set() {

  let items = {};

  this.has = value => items.hasOwnProperty(value);

  this.add = value => {
    if (!this.has(value)){
      items[value] = value;
      return true;
    }
    return false;
  };

  this.remove = value => {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };

  this.clear = () => {
    items = {};
  };
  
  this.size = () => { 
    return Object.keys(items).length; //{4} 
  }; 

  this.values = () => {
    let values = [];
    for (var key in items) {
      values.push(items[key]);
    }
    return values;
  }

  //other methods to implement later
  //union
  //intersection
  //difference
  //subset



}
// let set = new Set(); 
// set.add(1); 

// console.log(set.values()); //outputs ["1"] 
// console.log(set.has(1));   //outputs true 
// console.log(set.size());   //outputs 1 

// set.add(2); 
// console.log(set.values()); //outputs ["1", "2"] 
// console.log(set.has(2));   //true 
// console.log(set.size());   //2 

// set.remove(1); 
// console.log(set.values()); //outputs ["2"] 

// set.remove(2); 
// console.log(set.values()); //outputs [] 





