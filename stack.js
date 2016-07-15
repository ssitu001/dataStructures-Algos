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

let stack = new Stack();
stack.isEmpty();
stack.push(5);
stack.pop();
stack.push(5);
stack.peek()
stack.isEmpty();
stack.peek();
stack.clear();
stack.push(5);
stack.print();