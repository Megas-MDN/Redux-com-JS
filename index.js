const INITIAL_STATE = {
  colors: ["white", "black", "red", "green", "blue", "yellow"],
  index: 0,
};
// const INIT_STATE = { cont: 0 };

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "NEXT_COLOR":
      return {
        ...state,
        index: (state.index + 1) % state.colors.length,
      };
    case "PREVIOUS_COLOR":
      return {
        ...state,
        index: state.index > 0 ? state.index - 1 : state.colors.length - 1,
      };
    case "ADD_COLOR":
      return {
        ...state,
        colors: [...state.colors, action.payload],
        index: state.colors.length,
      };
    case "DELETE":
      if(state.colors.length <= 1) return state; 
      return {
        ...state,
        colors: state.colors.filter((el) => el !== state.colors[state.index]),
        index: state.index === state.colors.length - 1 ? 0 : state.index,
      };
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

function criarCor() {
  const oneChar = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let cor = "#";
  const aleatorio = () => Math.floor(Math.random() * oneChar.length);
  for (let i = 0; i < 6; i += 1) {
    cor += oneChar[aleatorio()];
  }
  return cor;
}

document.getElementById("next").addEventListener("click", () => {
  store.dispatch({ type: "NEXT_COLOR" });
});

document.getElementById("previous").addEventListener("click", () => {
  store.dispatch({ type: "PREVIOUS_COLOR" });
});

document.getElementById("random").addEventListener("click", ({ target }) => {
  store.dispatch({ type: "PREVIOUS_COLOR" });
  const cor = criarCor();
  // target.style.border = "1px solid red";
  // target.style.background = cor;
  store.dispatch({ type: "ADD_COLOR", payload: cor });
  console.log(cor);
});

document.getElementById("delete").addEventListener("click", () => {
  store.dispatch({ type: "DELETE" });
});

store.subscribe(() => {
  const { index, colors } = store.getState();
  console.log(index, colors, ' - ', colors[index]);
  span = document.getElementById("value");
  span.innerHTML = `[ ${colors[index]} ] Index no Array colors: [ ${index} ]`;
  document.getElementById('color').style.background = colors[index];
  carregaStateNaTela();
});

const carregaStateNaTela = () => {
  const pre = document.createElement('pre');
  const div = document.getElementById('state');
  div.innerHTML = '';
  pre.innerHTML = JSON.stringify(store.getState());
  // console.log(pre.innerHTML)
  div.appendChild(pre);
}

window.onload = () => carregaStateNaTela();
// store.dispatch({type: 'SOMAR', payload: {cont: 5}});
// let state = store.getState();
// console.log(state.cont);

// store.dispatch({type: 'SOMAR', payload: {cont: 10}});
// state = store.getState();
// console.log(state.cont);
