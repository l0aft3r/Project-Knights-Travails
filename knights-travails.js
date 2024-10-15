function MakeAdjacencyListTree() {
    const tree = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            tree.push([[i, j], []]);
            if (i - 2 >= 0 && j - 1 >= 0) tree[tree.length-1][1].push([i - 2, j - 1]);
            if (i - 2 >= 0 && j + 1 <= 7) tree[tree.length-1][1].push([i - 2, j + 1]);
            if (i + 2 <= 7 && j - 1 >= 0) tree[tree.length-1][1].push([i + 2, j - 1]);
            if (i + 2 <= 7 && j + 1 <= 7) tree[tree.length-1][1].push([i + 2, j + 1]);
            if (i - 1 >= 0 && j - 2 >= 0) tree[tree.length-1][1].push([i - 1, j - 2]);
            if (i + 1 <= 7 && j - 2 >= 0) tree[tree.length-1][1].push([i + 1, j - 2]);
            if (i - 1 >= 0 && j + 2 <= 7) tree[tree.length-1][1].push([i - 1, j + 2]);
            if (i + 1 <= 7 && j + 2 <= 7) tree[tree.length-1][1].push([i + 1, j + 2]);
        }
    }
    return tree;
}

function knightsTravails(before, after) {
    if (before[0] === after[0] && before[1] === after[1]) return 0;
    const queue = [];
    const chessBoard = MakeAdjacencyListTree();
    for (square of chessBoard) {
        if (square[0][0] === before[0] && square[0][1] === before[1]) {
            for (square2 of square[1]) {
                if (square2[0] === after[0] && square2[1] === after[1]) return [[square[0][0], square[0][1]], [square2[0], square2[1]]];
                queue.push([[square[0][0], square[0][1]], [square2[0], square2[1]]]);
            }
            break;
        }
    }
    while (true) {
        const path = queue.shift();
        const lastsqr = path[path.length-1];
        for (square of chessBoard) {
            if (square[0][0] === lastsqr[0] && square[0][1] === lastsqr[1]) {
                for (square2 of square[1]) {
                    queue.push([...path, [square2[0], square2[1]]]);
                    if (square2[0] === after[0] && square2[1] === after[1]) return queue[queue.length-1];
                }
                break;
            }
        }
    }
}
console.log(knightsTravails([0, 0], [7, 7]));