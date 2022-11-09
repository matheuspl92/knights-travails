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
            console.log("ERROR: INVALID BOARD POSITION");
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

const board = BoardFactory();
console.log(board.nodes);
console.log(board.getNode([0, 0]).neighborsNodes);