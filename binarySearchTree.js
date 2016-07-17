//binarySearchTree

function BinarySearchTree() {


  function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  let root = null;

  //helper function to insert
  let insertNode = (node, newNode) => {
    //if key less than node
    if(newNode.key < node.key) {
      if(node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if(node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };

  //in Order traversal helper 
  let inOrderTraverseNode = (node, callback) => {
    if(node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }

  //pre Order traversal helper
  let preOrderTraverseNode = (node, callback) => {
    if(node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  }

  //post Order traversal helper
  let postOrderTraverseNode = (node, callback) => {
    if(node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  };

  //find the smallest node value
  let minNode = node => {
    if(node) {
      while(node && node.left !== null) {
        node = node.left
      }
      return node.key;
    }
    return null;
  };

  //find the largest node value
  let maxNode = node => {
    if(node) {
      while(node && node.right !== null) {
        node = node.right
      }
      return node.key;
    }
    return null;
  };

  //search for specific node key
  let searchNode = (node, key) => {
    if(node === null) {
      return false;
    }

    if(key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  };


  this.insert = key => {
    let newNode = new Node(key)
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode)
    }
  };

  this.inOrderTraverse = callback => 
    inOrderTraverseNode(root, callback);

  this.preOrderTraverse = callback => 
    preOrderTraverseNode(root, callback);

  this.postOrderTraverse = callback => 
    postOrderTraverseNode(root, callback);

  this.min = () => minNode(root);

  this.max = () => maxNode(root);

  this.search = key => searchNode(root, key);
}

let tree3 = new BinarySearchTree();
tree3.insert(11);
tree3.insert(7); 
tree3.insert(15); 
tree3.insert(5); 
tree3.insert(6); 
tree3.insert(3); 
tree3.insert(9); 
tree3.insert(8); 
tree3.insert(10); 
tree3.insert(13); 
tree3.insert(12); 
tree3.insert(14); 
tree3.insert(20); 
tree3.insert(18); 
tree3.insert(25);
function printNode(value){ //{6} 
  console.log(value); 
} 
tree3.postOrderTraverse(printNode); //{7} 

console.log(tree3.search(1) ? 'Key 1 found.' : 'Key 1 not found.'); 
console.log(tree3.search(8) ? 'Key 8 found.' : 'Key 8 not found.'); 
