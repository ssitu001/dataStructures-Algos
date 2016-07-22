//Graph

function Graph() {
  let vertices = [];
  let adjList = new Dictionary();

  //helper function
  let initializeColor = () => {
    let color = [];
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white';
    }
    return color;
  };

  //dfs helper
  let dfsVisit = (u, color, callback) => {
    color[u] = 'grey';
    if (callback) {
      callback(u);
    }
    let edges = adjList.get(u);
    for (var i = 0; i < edges.length; i++) {
      let w = edges[i];
      if(w === 'white') {
        dfsVisit(w, color, callback);
      }
    }
    color[u] = 'black';
  };

  //improved DFS helper
  let DFSVisit = (u, color, d, f, p) {
    console.log('discovered' + u);
    color[u] = 'grey';
    d[u] = ++time;
    let edges = adjList.get(u);
    for(let i = 0; i < edges.length; i++) {
      let w = edges[i];
      if(color[w] === 'white') {
        p[w] = u;
        DFSVisit(w, color, d, f, p);
      }
    }
    color[u] = 'black';
    f[u] = ++time;
    console.log('explored' + u);
  };



  this.addVertex = v => {
    vertices.push(v);
    adjList.set(v, []);
  };

  this.addEdge = (v, w) => {
    adjList.get(v).push(w);
    adjList.get(w).push(v);
  };

  this.toString = () => {
    let s = '';
    for(let i =0; i < vertices.length; i++) {
      s += vertices[i] + ': ';
      let edges = adjList.get(vertices[i]);
      for (let j = 0; j < edges.length; j++) {
        s += edges[j] + ' ';
      }
      s += '\n';
    }
    return s;
  };

  //bfs
  this.bfs = (v, callback) => {

    let color = initializeColor();
    let queue = new Queue();
    queue.enqueue(v);

    while(!queue.isEmpty()) {
      let u = queue.dequeue();
      let edges = adjList.get(u);
      color[u] = 'grey';
      for(let i = 0; i < edges.length; i++) {
        let w = edges[i];
        if(color[w] === 'white') {
          color[w] = 'grey';
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
      if(callback) {
        callback(u);
      }
    }
  };

  //shortest path
  this.BFS  = v => {

    let color = initializeColor();
    let queue = new Queue();
    let d = [];
    let pred = [];
    queue.enqueue(v);

    for(let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0;
      pred[vertices[i]] = null;
    }

    while(!queue.isEmpty()) {
      let u = queue.dequeue();
      let edges = adjList.get(u);
      color[u] = 'grey';

      for (let i = 0; i < edges.length; i++) {
        let w = edges[i];
        if(color[w] === 'white') {
          color[w] = 'grey';
          d[w] = d[u] + 1;
          pred[w] = u;
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
    }
    return {
      distances: d,
      predecessors: pred
    };
  };

  //dfs
  this.dfs = (callback) => {
    let color = initializeColor();

    for(let i = 0; i < vertices.length; i++) {
      if(vertices[i] === 'white') {
        callback(vertices[i], color, callback);
      }
    }
  }

  //improved DFS
  let time = 0;

  this.DFS = () => {
    let color = initializeColor();
    let d = [];
    let f = [];
    let p = [];
    time = 0;

    for (let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0;
      f[vertices[i]] = 0;
      p[vertices[i]] = null;
    }

    for (let i = 0; i < vertices.length; i++) {
      if(vertices[i] === 'white') {
        DFSVisit(vertices[i], color, d, f, p);
      }
    }
    return {
      discovery: d,
      finished: f,
      predecessors: p
    };
  };

}

let graph = new Graph();
let myVertices = ['A','B','C','D','E','F','G','H','I'];
for (var i=0; i<myVertices.length; i++){ //{8} 
  graph.addVertex(myVertices[i]); 
} 
graph.addEdge('A', 'B');
graph.addEdge('A', 'C'); 
graph.addEdge('A', 'D'); 
graph.addEdge('C', 'D'); 
graph.addEdge('C', 'G'); 
graph.addEdge('D', 'G'); 
graph.addEdge('D', 'H'); 
graph.addEdge('B', 'E'); 
graph.addEdge('B', 'F'); 
graph.addEdge('E', 'I'); 

function printNode(value){ //{16} 
  console.log('Visited vertex: ' + value); //{17} 
} 
graph.bfs(myVertices[0], printNode);

var shortestPathA = graph.BFS(myVertices[0]); 
console.log(shortestPathA); 


//we can build the path from vertex A to the other vertices using the following code:
// var fromVertex = myVertices[0]; //{9} 
// for (var i=1; i<myVertices.length; i++){ //{10} 
//   var toVertex = myVertices[i], //{11} 
//   path = new Stack();       //{12} 
//   for (var v=toVertex; v!== fromVertex; 
//   v=shortestPathA.predecessors[v]) { //{13} 
//     path.push(v);                          //{14} 
//   } 
//   path.push(fromVertex);       //{15} 
//   var s = path.pop();          //{16} 
//   while (!path.isEmpty()){     //{17} 
//     s += ' - ' + path.pop(); //{18} 
//   } 
//   console.log(s); //{19} 
// } 



//using dictionary to store adjacent list
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
    for (let key in items) {
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

//our Queue class

function Queue() {
  let items = [];
  this.enqueue = (element) => items.push(element);
  this.dequeue = () => items.splice(0,1)[0];
  this.front = () => items[0];
  this.isEmpty = () => items.length === 0;
  this.size = () => items.length;
  this.print = () => console.log(items.toString());
}