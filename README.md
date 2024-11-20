
# Dev Sudoku Game

Este é um jogo de Sudoku desenvolvido para treinar habilidades de programação e lógica de resolução. O projeto foi criado utilizando **React** e **TypeScript**.

## Funcionalidades

- **Resolução Automática:** O jogo pode resolver automaticamente o Sudoku utilizando um algoritmo de backtracking.
- **Verificação de Sudoku:** Permite verificar se o Sudoku está completo ou se a solução está correta.
- **Reset:** Você pode resetar o tabuleiro para o estado inicial e tentar novamente.
- **Interatividade:** O usuário pode editar as células e tentar resolver o Sudoku manualmente.

## Como Rodar

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js**: Você pode baixar e instalar o Node.js em [https://nodejs.org/](https://nodejs.org/).
- **NPM ou Yarn**: O npm é instalado junto com o Node.js. Ou você pode usar o Yarn.

### Passos para rodar o projeto

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/dev-sudoku-game.git
    ```

2. Navegue até o diretório do projeto:

3. Instale as dependências do projeto:

    - Usando **NPM**:

    ```bash
    npm install
    ```


## Tecnologias Usadas

- **React**: Para a criação da interface interativa do jogo.
- **TypeScript**: Para garantir tipos estáticos e segurança no código.
- **Styled-components**: Para o estilo do layout do jogo.

## Estrutura do Projeto

- **Componente `Home`:** Componente principal onde o Sudoku é exibido, com botões para resolver, verificar e resetar.
- **Componente `Table`:** Exibe o tabuleiro do Sudoku e permite interações do usuário.
- **Funções Utilitárias:** Contém a lógica de resolução do Sudoku, comparação de tabuleiros e cópias profundas de arrays.


