

function Stack() {
  let items = [];
  this.push = element => items.push(element); 
  this.pop = () => items.pop(); 
  this.peek = () => items[items.length-1];
  this.size = () => items.length;
  this.isEmpty = () => items.length === 0;
  this.clear = () => items = [];
  this.print = () => console.log(items.toString());
}

//with actual ES6 classes with WeakMap to ensure the property will be private in a class
//wrap Class in a function to create a closure and non global item
// let Stack = (function () {
//   const item = new WeakMap();

//   class Stack {
//     constructor() {
//       this.set(this, []);
//     } 
//     push(element){ 
//       let s = items.get(this);
//       s.push(element); 
//     } 
//     pop(){ 
//       let s = items.get(this); 
//       let r = s.pop(); 
//       return r; 
//     } 
//     //other methods 
//   }
// })();

// let stack = new Stack();
// stack.isEmpty();
// stack.push(5);
// stack.pop();
// stack.push(5);
// stack.peek()
// stack.isEmpty();
// stack.peek();
// stack.clear();
// stack.push(5);
// stack.print();


//Stack use - Decimal to binary
function divideBy2(decNumber) {
  var remStack = new Stack();
  var rem;
  var binaryString = '';

  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

// console.log(divideBy2(233)); //11101001
// console.log(divideBy2(10)); //010
// console.log(divideBy2(1000)); //111101000

//Base Converter
function baseConverter(decNumber, base) {
  var remStack = new Stack();
  var rem;
  var binaryString = '';
  var digits = '0123456789ABCDEF';

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }

  while (!remStack.isEmpty()) {
    binaryString += digits[remStack.pop()];
  }

  return binaryString; 
}

// console.log(baseConverter(100345, 2));
// console.log(baseConverter(100345, 8));
// console.log(baseConverter(100345, 16));














