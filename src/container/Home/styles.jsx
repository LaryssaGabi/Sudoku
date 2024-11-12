import styled from "styled-components";

export const Container = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: calc(10px + 2vmin);
    color: white;
`
export const ButtonContainer = styled.div`
    margin-top: 20px;   
`
export const CheckButton = styled.button`
    background-color: tomato;
    font-weight: bold;
    padding: 12px 20px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    margin: 0 20px;
    cursor: pointer;
    transition: 0.4s;

    &:hover{
        transform: scale(1.1);
    }
`
export const SovekButton = styled.button`
    background-color: orange;
    font-weight: bold;
    padding: 12px 20px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    margin: 0 20px;
    cursor: pointer;
    transition: 0.4s;

    &:hover{
        transform: scale(1.1);
    }
`
export const ResetButton = styled.button`
    background-color: aqua;
    font-weight: bold;
    padding: 12px 20px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    margin: 0 20px;
    cursor: pointer;
    transition: 0.4s;

    &:hover{
        transform: scale(1.1);
    }
`
