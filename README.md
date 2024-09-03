# Lista Virtualizada

### Preview
[screen-capture (1).webm](https://github.com/user-attachments/assets/5ef3c889-31eb-4e4e-97be-eda2782674f0)

Este projeto demonstra como implementar uma lista virtualizada em JavaScript. A virtualização é uma técnica usada para otimizar o desempenho ao lidar com listas grandes, renderizando apenas os itens que estão visíveis na janela de visualização, juntamente com um buffer de itens acima e abaixo da área visível.

## Índice

- [Introdução](#introdução)
- [Como Funciona](#como-funciona)
- [Explicação do Código](#explicação-do-código)
  - [Seleção dos Elementos](#seleção-dos-elementos)
  - [Variáveis de Configuração](#variáveis-de-configuração)
  - [Função de Renderização](#função-de-renderização)
  - [Manipulador de Evento de Rolagem](#manipulador-de-evento-de-rolagem)
  - [Inicialização](#inicialização)
- [Regras Matemáticas](#regras-matemáticas)
- [Conclusão](#conclusão)

## Introdução

Para começar, inclua a seguinte estrutura HTML no seu projeto:

```html
<div id="container" style="height: 500px; overflow: auto;">
  <div id="viewport"></div>
</div>
```

Adicione o código JavaScript fornecido neste repositório e personalize as variáveis `itemHeight`, `bufferSize` e `numberOfItems` conforme necessário.

## Como Funciona

Esta implementação cria uma lista virtualizada que renderiza de forma eficiente apenas os itens visíveis na janela de visualização, juntamente com um buffer de itens adicionais para proporcionar uma rolagem suave. A ideia principal é calcular os índices de início e fim dos itens a serem renderizados com base na posição atual de rolagem e ajustar a posição dos itens renderizados usando uma transformação `translateY`.

## Explicação do Código

### Seleção dos Elementos

```javascript
const container = document.getElementById("container");
const viewport = document.getElementById("viewport");
```

- `container`: O elemento que contém a lista rolável.
- `viewport`: O elemento onde os itens da lista serão renderizados.

### Variáveis de Configuração

```javascript
const itemHeight = 50; // Altura de cada item
const bufferSize = 20; // Número de itens a renderizar acima e abaixo da área visível
const numberOfItems = 1000; // Número total de itens
```

- `itemHeight`: A altura de cada item na lista (em pixels).
- `bufferSize`: O número de itens a serem renderizados acima e abaixo da área visível para proporcionar uma rolagem suave.
- `numberOfItems`: O número total de itens na lista.

### Função de Renderização

```javascript
function renderItems(startIndex, endIndex) {
  viewport.innerHTML = ""; // Limpa a área de visualização
  for (let i = startIndex; i < endIndex; i++) {
    const item = document.createElement("div");
    item.className = "item";
    item.textContent = `Item ${i + 1}`;
    viewport.appendChild(item);
  }
  viewport.style.transform = `translateY(${startIndex * itemHeight}px)`;
}
```

- **Limpeza da Área de Visualização**: A área de visualização é limpa antes de renderizar novos itens.
- **Criação de Itens**: Os itens são criados dinamicamente e adicionados à área de visualização.
- **Ajuste de Posição**: A transformação `translateY` ajusta a posição vertical da área de visualização com base no `startIndex`.

### Manipulador de Evento de Rolagem

```javascript
function onScroll(e) {
  const scrollTop = container.scrollTop;
  const startIndex = Math.max(
    Math.floor(scrollTop / itemHeight) - bufferSize,
    0
  );
  const endIndex = Math.min(
    startIndex +
      bufferSize * 2 +
      Math.ceil(container.clientHeight / itemHeight),
    numberOfItems
  );

  renderItems(startIndex, endIndex);
}
```

- **Cálculo do `startIndex`**: O índice do primeiro item a ser renderizado é baseado na posição de rolagem e na altura do item.
- **Cálculo do `endIndex`**: O índice do último item a ser renderizado é baseado na área visível e no tamanho do buffer.
- **Renderização dos Itens**: Chama a função `renderItems` com os índices calculados.

### Inicialização

```javascript
container.addEventListener("scroll", onScroll);
onScroll();
```

- **Listener de Rolagem**: A função `onScroll` é chamada sempre que o container é rolado.
- **Renderização Inicial**: A função `onScroll` é chamada uma vez durante a inicialização para renderizar o conjunto inicial de itens.

## Regras Matemáticas

- **Cálculo do `startIndex`**:
  - `Math.floor(scrollTop / itemHeight)`: Converte a posição de rolagem em um índice de item.
  - `- bufferSize`: Subtrai o tamanho do buffer para renderizar itens adicionais acima da área visível.
  - `Math.max(..., 0)`: Garante que o índice inicial não seja negativo.
- **Cálculo do `endIndex`**:

  - `startIndex + bufferSize * 2 + Math.ceil(container.clientHeight / itemHeight)`: Calcula o índice final com base na área visível e no tamanho do buffer.
  - `Math.min(..., numberOfItems)`: Garante que o índice final não ultrapasse o número total de itens.

- **Transformação `translateY`**: Ajusta a posição dos itens renderizados com base no `startIndex` multiplicado pela altura do item.

## Conclusão

Esta implementação de lista virtualizada é uma maneira eficiente de lidar com listas grandes em aplicações web, reduzindo a carga de renderização ao exibir apenas os itens que estão visíveis na janela de visualização. Compreendendo os conceitos-chave e as regras matemáticas, você pode personalizar e expandir esta implementação conforme suas necessidades.
