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

}

let linkedlist = new LinkedList();
linkedlist