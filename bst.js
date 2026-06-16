class Node {
	constructor(data) {
		this.data = data;
		this.right = null;
		this.left = null;
	}
}

class Tree {
	constructor(array) {
		const sorted = this.sorted(array);
		this.root = this.buildTree(sorted, 0, sorted.length - 1);
	}

	sorted(array) {
		const clean = [...new Set(array)];
		const sorted = clean.sort((a, b) => a - b);
		return sorted;
	}

	buildTree(array, start, end) {
		if (start > end) return null;
		const mid = Math.floor((start + end) / 2);
		const node = new Node(array[mid]);
		node.left = this.buildTree(array, start, mid - 1);
		node.right = this.buildTree(array, mid + 1, end);

		return node;
	}

	includes(array, value) {
		if (array.includes(value)) {
			return true;
		}
		return false;
	}

	insertNode(node, value) {
		if (node == null) {
			node = new Node(value);
		} else if (value < node.data) {
			node.left = this.insertNode(node.left, value);
		} else if (value > node.data) {
			node.right = this.insertNode(node.right, value);
		}
		return node;
	}

	insert(value) {
		this.root = this.insertNode(this.root, value);
	}

	deleteItemNode(node, value) {
		if (node === null) {
			return node;
		}

		if (node.data > value) {
			node.left = this.deleteItemNode(node.left, value);
		} else if (node.data < value) {
			node.right = this.deleteItemNode(node.right, value);
		} else {
			if (node.left === null) {
				return node.right;
			}
			if (node.right === null) {
				return node.left;
			}
		}
		return node;
	}

	deleteItem(value) {
		this.root = this.deleteItemNode(this.root, value);
	}

	levelOrderForEach(callback) {
		if (this.root === null) return;
		const queue = [];
		queue.push(this.root);

		if (!callback) {
			throw new Error("Error Message");
		}

		while (queue.length !== 0) {
			const node = queue.shift();
			callback(node.data);

			if (node.left !== null) {
				queue.push(node.left);
			}

			if (node.right !== null) {
				queue.push(node.right);
			}
		}
	}

	preOrderForEachNode(node, callback) {
		if (node === null) return;
		callback(node.data);
		this.preOrderForEachNode(node.left, callback);
		this.preOrderForEachNode(node.right, callback);
	}

	preOrderForEach(callback) {
		const node = this.root;
		this.preOrderForEachNode(node, callback);
	}

	inOrderForEachNode(node, callback) {
		if (node === null) return;
		this.inOrderForEachNode(node.left, callback);
		callback(node.data);
		this.inOrderForEachNode(node.right, callback);
	}

	inOrderForEach(callback) {
		const node = this.root;
		this.inOrderForEachNode(node, callback);
	}

	postOrderForEachNode(node, callback) {
		if (node === null) return;
		this.postOrderForEachNode(node.left, callback);
		this.postOrderForEachNode(node.right, callback);
		callback(node.data);
	}

	postOrderForEach(callback) {
		const node = this.root;
		this.postOrderForEachNode(node, callback);
	}

	findNode(node, value) {
		if (node === null) return;
		if (value === node.data) {
			return node;
		} else if (value < node.data) {
			return this.findNode(node.left, value);
		} else {
			return this.findNode(node.right, value);
		}
	}

	calculateHeight(node) {
		if (node === null) return -1;
		const leftHeight = this.calculateHeight(node.left);
		const rightHeight = this.calculateHeight(node.right);
		return Math.max(leftHeight, rightHeight) + 1;
	}

	height(value) {
		const node = this.findNode(this.root, value);

		if (node === null) return undefined;
		return this.calculateHeight(node);
	}

	depth(value) {
		let counter = 0;
		let node = this.root;
		while (node) {
			if (node.data === value) {
				return counter;
			}
			if (value < node.data) {
				node = node.left;
			} else {
				node = node.right;
			}
			counter++;
		}
		return undefined;
	}

	isBalanced(node = this.root) {
		if (node === null) return true;
		const leftHeight = this.calculateHeight(node.left);
		const rightHeight = this.calculateHeight(node.right);
		if (Math.abs(leftHeight - rightHeight) <= 1) {
			return this.isBalanced(node.left) && this.isBalanced(node.right);
		}
		return false;
	}

	rebalance() {
		if (this.isBalanced()) {
			return;
		}
		const sortedArray = [];
		this.inOrderForEach((value) => {
			sortedArray.push(value);
		});
		this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
	}

	prettyPrint(node = this.root, prefix = "", isLeft = true) {
		if (node === null) return;

		this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);

		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

		this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
}

module.exports = Tree;

// const tree = new Tree([1, 7, 4, 23, 8, 9, 3, 5]);

// tree.prettyPrint();
// tree.insert(22);
// tree.prettyPrint();
// tree.deleteItem(23);
// tree.prettyPrint();
// tree.levelOrderForEach((value) => {
// 	console.log(value);
// // });
// tree.preOrderForEach((value) => {
// 	console.log(value);
// });
// tree.inOrderForEach((value) => {
// 	console.log(value);
// });
// tree.postOrderForEach((value) => {
// 	console.log(value);
// });
