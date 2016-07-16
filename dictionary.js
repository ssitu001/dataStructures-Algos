function Dictionary() {

  let items = {};

  this.has = key => key in items;

  this.set = (key, value) => {
    items[key] = value;
  };

  this.delete = key => {
    if(this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };

  this.get = key => 
    this.has(key) ? items[key] : undefined;

  this.values = () => {
    let values = [];
    for (key in items) {
      if (this.has(key)) { //bc object has other properies on the ptype chain
        values.push(items[key]);
      }
    }
    return values;
  }

  this.keys = () => Object.keys(items);

  this.clear = () => {
    items = {};
  };
  
  this.size = () => 
    Object.keys(items).length; //{4} 

  this.getItems = () => items; 

};

var dictionary = new Dictionary();
dictionary.set("student1", "Simon");
dictionary.set("student2", "Bobby");
dictionary.set("student3", "Steve");
console.log(dictionary.keys()); 
console.log(dictionary.values()); 

