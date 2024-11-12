import { ButtonContainer, CheckButton, Container, SovekButton, ResetButton } from "./styles";
import { Table } from '../../components/Table'
import { useState } from "react";
import { compareSudokus, solver } from "../../utils/validators";
import { getDeeppCopy } from "../../utils/helpers";

const initial = [
    [-1, 5, -1, 9, -1, -1, -1, -1, 2],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1],
];

export const Home = () => {
    const [sudokuArr, setSudokoArr] = useState(initial);

    const checkSudoku = () => {
        const sudoku = JSON.parse(JSON.stringify(initial));
        solver(sudoku);
        let compare = compareSudokus(sudokuArr, sudoku);

        if (compare.isComplete) {
            alert('Sudoku is complete');
        } else if (compare.isSolvable) {
            alert('Continue tentando!');
        } else {
            alert('Sudoku não foi resolvido. Tente novamente');
        }
    };

    const solveSudoku = () => {
        let sudoku = getDeeppCopy(initial)
        solver(sudoku);
        setSudokoArr(sudoku);
    }

    const resetSudoku = () => {
        let sudoku =getDeeppCopy(initial)
        setSudokoArr(sudoku);
    }

    return (
        <Container>
            <h1>Dev Sudoku Game</h1>
            <Table
                sudokuArr={sudokuArr}
                setSudokoArr={setSudokoArr}
                initialArr={initial}
            />
            <ButtonContainer>
                <CheckButton onClick={checkSudoku}>Checar</CheckButton>
                <SovekButton onClick={solveSudoku}>Resolver</SovekButton>
                <ResetButton onClick={resetSudoku}>Resetar</ResetButton>
            </ButtonContainer>
        </Container>
    );
};