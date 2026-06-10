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

	prettyPrint(node = this.root, prefix = "", isLeft = true) {
		if (node === null) return;

		this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);

		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

		this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 3, 5]);

tree.prettyPrint();
