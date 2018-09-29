import React, { render } from "react";
import ReactDOM from "react-dom";

const styles = {
  body: {
    fontFamily: "sans-serif",
    textAlign: "center"
  }
};
const Todo = props => (
  <li>
    <input
      type="checkbox"
      onChange={props.onToggle}
      checked={props.todo.checked}
    />
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todo.text}</span>
  </li>
);

let id = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const todo = prompt("add a todo");
    console.log(todo);
    this.setState(prevState => ({
      todos: [...prevState.todos, { id: id++, text: todo, checked: false }]
    }));
  }

  deleteTodo(id) {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id != id)
    }));
  }

  toggleTodo(id) {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id != id) return todo;
        return {
          id: id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    }));
  }
  render() {
    return (
      <div>
        <div>Todos Count: {this.state.todos.length}</div>
        <div>
          Unchecked Todos:{" "}
          {this.state.todos.filter(todo => !todo.checked).length}
        </div>
        <button onClick={() => this.addTodo()}>add a todo</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              onDelete={() => this.deleteTodo(todo.id)}
              onToggle={() => this.toggleTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
