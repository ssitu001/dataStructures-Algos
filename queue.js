//Queue FIFO

function Queue() {
  let items = [];
  this.enqueue = (element) => items.push(element);
  this.dequeue = () => items.splice(0,1)[0];
  this.front = () => items[0];
  this.isEmpty = () => items.length === 0;
  this.size = () => items.length;
  this.print = () => console.log(items.toString());
}

let queue = new Queue();
// console.log(queue.enqueue(5));
// console.log(queue.size());
// console.log()
// console.log()


//Psuedoclassical using an object as storage
function Queue1() {

  //var queueInstance = Object.create(queueMethods); 
  this.storage = {};
  this.len = 0;
  //return queueInstance;
};

//var queueMethods = {};

Queue1.prototype.size = function() {
  return this.len > 0 ? this.len : 0;
};

Queue1.prototype.enqueue = function(val) {
  this.storage[this.len] = val;
  this.len++;
};

Queue1.prototype.dequeue = function() {
  var temp = this.storage[0];
  delete this.storage[0];
  this.len--;

  for (var key in this.storage) {
    this.storage[+key - 1] = this.storage[key];
  }

  return temp;
};

//ES6 class approach using WeakMap to keep property items private
let Queue2 = (function() {

  const items = new WeakMap();

  class Queue2 {
    constructor() {
      items.set(this, []);
    }
    enqueue(element) {
      let q = items.get(this);
      q.push(element);
    }
    dequeue() {
      let q = items.get(this);
      let r = q.shift();
      return r;
    }
    //other methods
  }
  return Queue2;
})();


//Queue usage example
function PriorityQueue() {
  let items = [];
  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }

  this.enqueue = function(element, priority) {
    let queueElement = new QueueElement(element, priority);
    let added = false;
    for ( let i = 0; i < items.length; i++ ) {
      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement);
        added = true;
        break;        
      }
    }
    if(!added) {
      items.push(queueElement);
    }
  };

  this.print = function(){
    console.log(items);
  }; 

  //other methods - same as default Queue implementation    
}

// let priorityQueue = new PriorityQueue();
// priorityQueue.enqueue("John", 2);
// priorityQueue.enqueue("Jack", 1);
// priorityQueue.enqueue("Camila", 1);
// console.log(priorityQueue.print());

function hotPotato(nameList, numRounds) {
  let queue = new Queue;
  let eliminated = '';

  for ( let i = 0; i < nameList.length; i++ ) {
    queue.enqueue(nameList[i]);
  }

  while( queue.size() > 1 ) {
    for ( let j = 0; j < numRounds; j++ ) {
      queue.enqueue(queue.dequeue());
    } 
    eliminated = queue.dequeue();
    console.log(eliminated + " was eliminated");
  }
  
  let winner = queue.dequeue();
  console.log("The winner is " + winner);
  return winner;
}

let names = ['John','Jack','Simon','David','Bobby'];
console.log(hotPotato(names, 5));

