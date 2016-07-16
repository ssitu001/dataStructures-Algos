
function DoublyLinkedList() {

  let Node = element => {
    this.prev = null;
    this.element = element;
    this.next = null;
  };

  let length = 0;
  let head = null;
  let tail = null;

  this.insert = (position, element) => {
    if( position >= 0 && <= length ) {
      let node = new Node(element);
      let current = head;
      let previous;
      let index = 0;

      if (position === 0) {
        if (!head) {
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
      } else if (position === length) { //last item
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  //removeAt
  this.removeAt = position => {
    if ( position > -1 && position < length ) {
      let current = head;
      let previous;
      let index = 0;

    if ( position === 0 ) {
      head = current.next;
      if ( length === 1 ) {
        tail = null;
      } else {
        head.prev = null; 
      }
    } else if ( position === length ) { //last item
        current = tail;
        tail = current.prev;
        tail.next = null;
    } else {
        while ( index++ < position ) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next = previous;
    }
    length--;
    return current.elements;
    } else {
      return null;
    }
  };
}



