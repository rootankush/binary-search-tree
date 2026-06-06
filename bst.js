class Node {
	constructor(data) {
		this.data = data;
		this.right = null;
		this.left = null;
	}
}

class Tree {
	constructor(root) {
		this.root = this.buildTree(array);
	}

	buildTree(array) {
		const clean = [...new Set(array)];
		const sorted = clean.sort((a, b) => a - b);
		if (start > end) return null;
		const mid = Math.floor((start + end) / 2);
		this.root = new Node(sorted[mid]);
	}
}
