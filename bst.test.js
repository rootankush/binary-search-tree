const Tree = require("./bst.js");

// Helper function updated to read the correct `.data` property from your Node instances
function getInOrderValues(node, values = []) {
	if (node === null || node === undefined) return values;

	getInOrderValues(node.left, values);
	values.push(node.data);
	getInOrderValues(node.right, values);

	return values;
}

describe("Tree", () => {
	describe("constructor / buildTree", () => {
		test("creates a tree with a root node", () => {
			const tree = new Tree([1, 7, 4, 23, 8, 9, 3, 5]);

			expect(tree.root).not.toBeNull();
			expect(tree.root.data).toBeDefined();
		});

		test("sorts values and removes duplicates when building the tree", () => {
			const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9]);

			expect(getInOrderValues(tree.root)).toEqual([1, 3, 4, 5, 7, 8, 9, 23]);
		});

		test("builds a balanced tree from sorted unique values", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.root.data).toBe(4);
			expect(tree.root.left.data).toBe(2);
			expect(tree.root.right.data).toBe(6);
		});

		test("handles an empty array", () => {
			const tree = new Tree([]);

			expect(tree.root).toBeNull();
		});
	});

	describe("includes", () => {
		test("returns true when the value exists in the tree", () => {
			const tree = new Tree([1, 3, 5, 7, 9]);
			// Since your includes method uses array.includes(value), we map the sorted array state
			const sortedArray = tree.sorted([1, 3, 5, 7, 9]);
			expect(tree.includes(sortedArray, 5)).toBe(true);
		});

		test("returns false when the value does not exist in the tree", () => {
			const tree = new Tree([1, 3, 5, 7, 9]);
			const sortedArray = tree.sorted([1, 3, 5, 7, 9]);
			expect(tree.includes(sortedArray, 100)).toBe(false);
		});
	});

	describe("insert", () => {
		test("inserts a new value into the tree", () => {
			const tree = new Tree([10, 5, 15]);

			tree.insert(12);

			expect(tree.findNode(tree.root, 12)).not.toBeNull();
		});

		test("preserves BST order after insertion", () => {
			const tree = new Tree([10, 5, 15]);

			tree.insert(12);
			tree.insert(3);
			tree.insert(20);

			expect(getInOrderValues(tree.root)).toEqual([3, 5, 10, 12, 15, 20]);
		});

		test("does not insert duplicate values", () => {
			const tree = new Tree([10, 5, 15]);

			tree.insert(10);
			tree.insert(5);

			expect(getInOrderValues(tree.root)).toEqual([5, 10, 15]);
		});

		test("can insert into an empty tree", () => {
			const tree = new Tree([]);

			tree.insert(10);

			expect(tree.root.data).toBe(10);
		});
	});

	describe("deleteItem", () => {
		test("deletes a leaf node", () => {
			const tree = new Tree([10, 5, 15, 3]);

			tree.deleteItem(3);

			expect(getInOrderValues(tree.root)).toEqual([5, 10, 15]);
		});

		test("does nothing if the value is not found", () => {
			const tree = new Tree([10, 5, 15]);

			tree.deleteItem(999);

			expect(getInOrderValues(tree.root)).toEqual([5, 10, 15]);
		});

		test("can delete the only node in the tree", () => {
			const tree = new Tree([10]);

			tree.deleteItem(10);

			expect(tree.root).toBeNull();
		});
	});

	describe("levelOrderForEach", () => {
		test("visits each value in level order", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
			const values = [];

			tree.levelOrderForEach((value) => {
				values.push(value);
			});

			expect(values).toEqual([4, 2, 6, 1, 3, 5, 7]);
		});

		test("calls the callback once for each value", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
			const callback = jest.fn();

			tree.levelOrderForEach(callback);

			expect(callback).toHaveBeenCalledTimes(7);
		});

		test("works with a single-node tree", () => {
			const tree = new Tree([10]);
			const values = [];

			tree.levelOrderForEach((value) => {
				values.push(value);
			});

			expect(values).toEqual([10]);
		});

		test("throws an error if no callback is provided", () => {
			const tree = new Tree([1, 2, 3]);

			expect(() => tree.levelOrderForEach()).toThrow();
		});
	});

	describe("inOrderForEach", () => {
		test("visits each value in ascending sorted order", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
			const values = [];

			tree.inOrderForEach((value) => {
				values.push(value);
			});

			expect(values).toEqual([1, 2, 3, 4, 5, 6, 7]);
		});

		test("visits values in sorted order even when input array is unsorted", () => {
			const tree = new Tree([7, 3, 9, 1, 5, 8, 10]);
			const values = [];

			tree.inOrderForEach((value) => {
				values.push(value);
			});

			expect(values).toEqual([1, 3, 5, 7, 8, 9, 10]);
		});

		test("calls the callback once for each value", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
			const callback = jest.fn();

			tree.inOrderForEach(callback);

			expect(callback).toHaveBeenCalledTimes(7);
		});

		test("throws an error if no callback is provided", () => {
			const tree = new Tree([1, 2, 3]);

			expect(() => tree.inOrderForEach()).toThrow();
		});
	});

	describe("preOrderForEach", () => {
		test("visits each value in preorder", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
			const values = [];

			tree.preOrderForEach((value) => {
				values.push(value);
			});

			expect(values).toEqual([4, 2, 1, 3, 6, 5, 7]);
		});

		test("throws an error if no callback is provided", () => {
			const tree = new Tree([1, 2, 3]);

			expect(() => tree.preOrderForEach()).toThrow();
		});
	});

	describe("postOrderForEach", () => {
		test("visits each value in postorder", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
			const values = [];

			tree.postOrderForEach((value) => {
				values.push(value);
			});

			expect(values).toEqual([1, 3, 2, 5, 7, 6, 4]);
		});

		test("throws an error if no callback is provided", () => {
			const tree = new Tree([1, 2, 3]);

			expect(() => tree.postOrderForEach()).toThrow();
		});
	});

	describe("height", () => {
		test("returns 0 for a leaf node", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.height(1)).toBe(0);
			expect(tree.height(3)).toBe(0);
			expect(tree.height(5)).toBe(0);
			expect(tree.height(7)).toBe(0);
		});

		test("returns the height of an internal node", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.height(2)).toBe(1);
			expect(tree.height(6)).toBe(1);
		});

		test("returns the height of the root node", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.height(4)).toBe(2);
		});

		test("returns 0 for a single-node tree", () => {
			const tree = new Tree([10]);

			expect(tree.height(10)).toBe(0);
		});
	});

	describe("depth", () => {
		test("returns 0 for the root node", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.depth(4)).toBe(0);
		});

		test("returns 1 for children of the root", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.depth(2)).toBe(1);
			expect(tree.depth(6)).toBe(1);
		});

		test("returns the depth of leaf nodes", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.depth(1)).toBe(2);
			expect(tree.depth(3)).toBe(2);
		});

		test("returns undefined if the value is not found", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.depth(999)).toBeUndefined();
		});

		test("returns 0 for a single-node tree", () => {
			const tree = new Tree([10]);

			expect(tree.depth(10)).toBe(0);
		});
	});

	describe("isBalanced", () => {
		test("returns true for an empty tree", () => {
			const tree = new Tree([]);

			expect(tree.isBalanced()).toBe(true);
		});

		test("returns true for a single-node tree", () => {
			const tree = new Tree([10]);

			expect(tree.isBalanced()).toBe(true);
		});

		test("returns true for a balanced tree", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.isBalanced()).toBe(true);
		});

		test("returns false for a right-heavy unbalanced tree", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			tree.insert(8);
			tree.insert(9);
			tree.insert(10);
			tree.insert(11);

			expect(tree.isBalanced()).toBe(false);
		});
	});

	describe("rebalance", () => {
		test("rebalances an unbalanced tree", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			tree.insert(8);
			tree.insert(9);
			tree.insert(10);
			tree.insert(11);

			expect(tree.isBalanced()).toBe(false);

			tree.rebalance();

			expect(tree.isBalanced()).toBe(true);
		});

		test("preserves all values after rebalancing", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			tree.insert(8);
			tree.insert(9);
			tree.insert(10);
			tree.insert(11);

			tree.rebalance();

			const values = [];
			tree.inOrderForEach((value) => {
				values.push(value);
			});

			expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		});

		test("handles an already balanced tree", () => {
			const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

			expect(tree.isBalanced()).toBe(true);

			tree.rebalance();

			expect(tree.isBalanced()).toBe(true);
		});

		test("handles a single-node tree", () => {
			const tree = new Tree([10]);

			tree.rebalance();

			expect(tree.root.data).toBe(10);
			expect(tree.isBalanced()).toBe(true);
		});

		test("handles an empty tree", () => {
			const tree = new Tree([]);

			tree.rebalance();

			expect(tree.root).toBeNull();
			expect(tree.isBalanced()).toBe(true);
		});
	});
});
