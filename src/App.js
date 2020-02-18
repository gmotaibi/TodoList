import React from 'react';
import Todos from "./screens/TodosList";
import DetailsItem from "./screens/DetailsItem";
import AddItem from "./screens/AddItem";
import Header from './components/Layout/Header';
import {Route,HashRouter} from "react-router-dom";
import axios from 'axios';


export default class App extends React.Component {

  state = {
    todos : [],
    isLoading: true,
    errors: null,
    noData: true,
  }
  componentDidMount () {
    axios.get(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => {
        if (!response.data.length) {
          this.setState({ noData: true })
        } else {
          this.setState({
            todos: response.data,
            isLoading: false, noData: false
          });
          console.log(response.data);
        }
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
    render() {   
        var message = <p>No Data was returned!</p>;
      return (
          
            <HashRouter>
              <Header/>
                <h1 style={{textAlign:'center'}}>To Do List </h1>
                 {this.state.noData?message:<Route exact path="/" component={() => <Todos todoslist={this.state.todos}/>} />}
                  <Route exact path="/AddItem" component={AddItem} />
                  <Route exact path="/DetailsItem/:id" component={DetailsItem} />
            </HashRouter>
      );
    }
  }
