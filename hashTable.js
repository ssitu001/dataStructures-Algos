//HashTable aka HashMap
// When we use a hash function, we already know which position the value is in, so we can simply retrieve it. A hash function is a function that, given a key, will return an address in the table where the value is.

//lose lose hash function - sum up the ASCII values of each character of the key length.
//ie. John , 74+111+104+110 = hashvalue: 399 = location/address of the hash table bucket 

//dbj2Hash function
// var djb2HashCode = function (key) { 
//   var hash = 5381; //{1} 
//   for (var i = 0; i < key.length; i++) { //{2} 
//     hash = hash * 33 + key.charCodeAt(i); //{3} 
//   } 
//   return hash % 1013; //{4} 
// }; 

//Collisions solution: 1)seperate chaining-using linkedList 2)linear probing-if position is defined, increment to next position until not defined 3)double hashing

function HashTable() {

  let table = [];

  //hashfunction
  let loseloseHashCode = key => {
    let hash = 0;
    for(var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    //To work with lower numbers, we must use the rest of the division (mod) of the hash number using an arbitrary number 
    return hash % 37; 
  };

  //seperate chaining helper to create an object instance 
  function ValuePair(key, value) {
    this.key = key;
    this.value = value;
    this.toString = () => '[' + this.key + ' - ' + this.value + ']';
  }

  this.put = (key, value) => {
    let position = loseloseHashCode(key);

    if(!table[position]) {
      table[position] = new LinkedList();
    }   
    table[position].append(new ValuePair(key, value)); 
  };

  //do not want to shift our table for future lookups
  this.remove = key => {
    let position = loseloseHashCode(key);

    if(table[position] !== undefined) {
      let current = table[position].getHead();

      while(current.next) {
        if(current.element.key === key) {
          table[position].remove(current.element);
          if(table[position].isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
      if(current.element.key === key) {
        table[position].remove(current.element);
        if(table[position].isEmpty()) {
          table[position] = undefined;
        }
        return true;
      }
    }
    return false;
  };

  //retrieve method
  this.get = key => {
    let position = loseloseHashCode(key);

    if(table[position] !== undefined) {
      let current = table[position].getHead();

      while(current.next) {
        if(current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
      //if head or tail, don't go into while loop
      if(current.element.key === key) {
        return current.element.value;
      }
    }
    return undefined; 
  };

  this.print = () => {
    for (var i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ": " + table[i]);
      }
    }
  }
};


var hash = new HashTable;
hash.put('Gandalf', 'gandalf@email.com'); 
hash.put('John', 'johnsnow@email.com'); 
hash.put('Tyrion', 'tyrion@email.com'); 
hash.put('Gandalf', 'gandalf@email.com2'); 
hash.print()





//linkedList 
function LinkedList() {

  let Node = function(element) {
    this.element = element;
    this.next = null;
  };

  let length = 0;
  let head = null;

  //append to end of list
  this.append = (element) => {
    let node = new Node(element);
    let current;

    if(!head) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      //set new pointer 
      current.next = node;
    }
    length++;
  };

  //removing element fron a specific location
  this.removeAt = (position) => {
    if( position > -1 && position < length ) {
      let current = head;
      let previous;
      let index = 0;

      if( position === 0 ) {
        head = current.next;
      } else {
        while (index++ < position) { //make reference to node before and next
          previous = current;
          current = current.next;
        }
        //link previous node with current's next: skip 'current' to remove 
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null; //if not valid position
    }
  };

  //inserting an element at any position
  this.insert = (position, element) => {
    if (position > -1 && position < length ) {
      let node = new Node(element);
      let current = head;
      let previous;
      let index = 0;

      if (position === 0) {
        node.next = current;
        head = node;      
      } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;  
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  //convert the linkedlist object into a string
  this.toString = () => {
    let current = head;
    let string = "";

    while(current) {
      string += current.element + (current.next ? 'n' : '');
      current = current.next;
    }
    return string;
  };

  //indexOf method receives the value of an element, and returns the position of this element if it is found. Otherwise, it returns -1.
  this.indexOf = (element) => {
    let current = head;
    let index = 0;

    while(current) {
      if(current.element === element) {
        return index;
      }
      index++
      current = current.next;
    }
    return -1;
  };

  //remove
  this.remove = (element) => {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };

  //isEmpty
  this.isEmpty = () => length === 0; 

  //size
  this.size = () => length;

  //getHead
  this.getHead = () => head;

  // this.print
};

