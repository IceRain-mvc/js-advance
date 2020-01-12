export default function (state = [], action: any) {//基本 引用
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "PUSH":
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.payload.id) {
          return [...newState]
        }
      }
      newState.push(action.payload);
      return [...newState];
    case "DEL":
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.payload) {
          newState.splice(i, 1);
          return [...newState]
        }
      }
      return [...newState];
    default:
      return [...newState];

  }
}
