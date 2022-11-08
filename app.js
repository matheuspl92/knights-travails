const NodeFactory = (position, neighborsNodes) => {
    this.position = position;
    this.neighborsNodes = neighborsNodes.slice();

    return {
        position,
        neighborsNodes,
    }
};

const BoardFactory = () => {
    const _createNodes = () => {
        const boardArray = [];

        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                boardArray.push(NodeFactory([0,0], []));
            }
        }

        return boardArray;
    };

    return {
        createNodes: _createNodes,
    }
};

const board = BoardFactory();
console.log(board.createNodes());