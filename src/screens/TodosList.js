import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Form, FormGroup, Row, CardText, Label, Input, CardHeader } from 'reactstrap';
import swal from 'sweetalert';


class Todos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.todoslist,
      isChecked: true,

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }


  handleClick = Item => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/` + Item.id)
      .then(response => {
        swal({
          title: "Done",
          text: "The item is deleted!",
          icon: "success",
          button: "Ok",
        })
      }).catch(response =>
        swal({
          title: "ُError",
          text: "The request failed!!",
          icon: "error",
          button: "Ok",
        })
      );
    this.setState(prevState => ({ todos: prevState.todos.filter(item => item !== Item) }))
  }

  handleSubmit = (id, title) => {
    axios.post(`https://jsonplaceholder.typicode.com/todos`, {

      "userId": "1",
      "title": title,
      "completed": "false",
      "id": id
    }).then(response => {
        swal({
          title: "Done",
          text: "You Add the task successfuly !",
          icon: "success",
          button: "Ok",
        })
      })

    this.setState(prevState => ({
      ...prevState,
      todos: { ...prevState.todos, id:id, title:title }
    }));
  }

  render() {



    return (
      <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
        <FormGroup>
          <Col md="12" sm="12" xs="12">
            <Link to="/AddItem" handleSubmit={this.handleSubmit}><Button>Add new Item</Button></Link>
          </Col>
        </FormGroup>
        <Row style={{ justifyContent: 'center', alignItems: 'center' }}>


          {this.state.todos.map(Item => {
            const { id, title, completed } = Item;

            return (

              <Col xl={8} lg={12} md={12}>
                <Card>
                  <CardHeader > 
                    <h3>Task items</h3> 
                    <FormGroup>
                    <Col sm={10}>
                        <Row>
                        <Label for="exampleText" sm={20} style={{ fontWeight: "bold", position: 'absolute', right: -60, bottom: 5 }}>Completed</Label>
                        <Input style={{ position: 'absolute', right: -80, top: -33 }} checked={completed} onChange={this.handleChange} type="checkbox">completed</Input>
                     </Row>
                     </Col>
                      </FormGroup>
                      </CardHeader>

                  <CardBody >
                    <Form>
                      <FormGroup row>
                        <Col sm={12}>
                          <Label for="exampleText" sm={15}>
                            <br />
                            <Link to={`/DetailsItem/${id}`} style={{ color: 'black' }}>
                              <CardText className="text-center" ><h2 className="d-block">{title}</h2></CardText><br />
                            </Link>
                          </Label>
                        </Col>
                      </FormGroup>
                      
                      <FormGroup row>
                        <Col md="12" sm="12" xs="12">
                          <Button onClick={() => { this.handleClick(Item) }}>Delete item</Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>

            );
          })
          } )
         }
          </Row>
      </Row>

    );
  }
}

export default Todos;
