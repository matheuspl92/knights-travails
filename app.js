const NodeFactory = (position, neighborsNodes) => {
    this.position = position;
    this.neighborsNodes = neighborsNodes.slice();

    return {
        position,
        neighborsNodes,
    }
};

const BoardFactory = () => {
    const boardArray = [];

    const _createNodes = (() => {

        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                boardArray.push(NodeFactory([i, j], []));
            }
        }
    })();

    const _getNode = (positionArray) => {
        if (positionArray[0] >= 0 && positionArray[0] < 8 && positionArray[1] >= 0 && positionArray[1] < 8) {

            for (let i = 0; i < boardArray.length; i += 1) {
                /*console.log("TEST")
                console.log(positionArray.toString());
                console.log(boardArray[i].position.toString());*/
                if (positionArray.toString() === boardArray[i].position.toString()) return boardArray[i];
            }
        } else {
            //console.log("ERROR: INVALID BOARD POSITION");
            return null;
        }
    };

    const _linkNodes = (() => {
        for (let i = 0; i < boardArray.length; i += 1) {
            const position = boardArray[i].position;
            //console.log(position)
            const neighborArray = [];
            neighborArray.push([position[0] + 1, position[1] + 2],
                [position[0] + 1, position[1] - 2],
                [position[0] - 1, position[1] + 2],
                [position[0] - 1, position[1] - 2],
                [position[0] + 2, position[1] + 1],
                [position[0] + 2, position[1] - 1],
                [position[0] - 2, position[1] + 1],
                [position[0] - 2, position[1] - 1]);

            //console.log(neighborArray);

            for (let j = 0; j < neighborArray.length; j += 1) {
                const neighborNode = _getNode(neighborArray[j]);
                if (neighborNode !== null) {
                    boardArray[i].neighborsNodes.push(neighborNode);
                }
            }
        }
        /*boardArray.forEach((node) => {
            const position = node.position;
            console.log(position)
            const neighborArray = [];
            neighborArray.push([position[0] + 1, position[1] + 2],
                [position[0] + 1, position[1] - 2],
                [position[0] - 1, position[1] + 2],
                [position[0] - 1, position[1] - 2],
                [position[0] + 2, position[1] + 1],
                [position[0] + 2, position[1] - 1],
                [position[0] - 2, position[1] + 1],
                [position[0] - 2, position[1] - 1]);

            console.log(neighborArray)
            neighborArray.forEach((nodePosition) => {
                console.log(nodePosition);
                const neighborNode = _getNode(nodePosition);
                console.log(neighborNode);
                if (neighborNode !== null) {
                    node.neighborsNodes.push(neighborNode);
                }
            })

        });*/
    })();

    return {
        nodes: boardArray,
        getNode: _getNode,
    }
};

const knightMoves = (start, end) => {

    const _searchPath = (node, target, path = [], resultsArray = [], isFirstCall = true, depth = 0) => {
        if (depth > 7) return null;
        if (node === target) {
            path.push(node.position);
            return path;
        }

        const newPath = path.slice();
        newPath.push(node.position);
        let result = null;


        for (let i = 0; i < node.neighborsNodes.length; i += 1) {
            result = _searchPath(node.neighborsNodes[i], target, newPath, resultsArray, false, depth + 1);
            if (result !== null) {
                resultsArray.push(result);
            }
        }

        if (isFirstCall) {

            minValue = Infinity;
            minIndex = 0;
            for (let i = 0; i < resultsArray.length; i += 1) {
                if (resultsArray[i].length < minValue) {
                    minValue = resultsArray[i].length;
                    minIndex = i;
                }
            }

            return resultsArray[minIndex];

        } else {

            return null;

        }
    };

    const board = BoardFactory();
    const rootNode = board.getNode(start);
    const targetNode = board.getNode(end);
    const movesArray = _searchPath(rootNode, targetNode);

    if (movesArray.length > 1) {
        console.log(`You made it in ${movesArray.length} moves! Here's your path:`);
    } else {
        console.log(`You made it in 1 move! Here's your path:`);
    }
    movesArray.forEach(move => {
        console.log(`[${move.toString()}]`);
    });

};

knightMoves([0, 0], [7, 7]);