import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row, CardHeader } from 'reactstrap';
import swal from 'sweetalert';
import axios from 'axios';


class DetailsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          id: '',
          title: '',
          userId: '1',
          completed: 'false',
          value:''
        }
        this.handleChange = this.handleChange.bind(this);
}

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/todos/` + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo: response.data,
                    id: response.data.id
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    //Update item with id
    handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://jsonplaceholder.typicode.com/todos/` + this.props.match.params.id, {

            "userId": event.target.userId.value,
            "title": event.target.title.value,
            "completed": event.target.completed,
            "id": event.target.id.value
        }).then(response => {
            swal({
                title: "Done",
                text: "The item updated!",
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
    }
    //Delete method with id 
    handleClick = id => {
        axios.delete('https://jsonplaceholder.typicode.com/todos/' + id)
            .then(response => {
                swal({
                    title: "Done",
                    text: "The item is deleted!",
                    icon: "success",
                    button: "Ok",
                }).then((value) => {
                    window.location = "/Todos";
                });
            })
    }
    //To handle change in data
    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value })
      }

    render() {

        return (
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Col xl={8} lg={12} md={12}>
                    <Card>
                        <CardHeader>
                            <h3>Details item </h3>
                            <FormGroup>
                                <Col sm={10}>
                                    <Row>
                                        <Label for="exampleText" sm={20} style={{ fontWeight: "bold", position: 'absolute', right: -60, bottom: 5 }}>Completed</Label>
                                        <Input style={{ position: 'absolute', right: -80, top: -33 }} type="checkbox" name="completed" id="completed" value={this.state.completed} />
                                    </Row>
                                </Col>
                            </FormGroup>
                        </CardHeader>
                        
                        <CardBody  >
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Col sm={12}>
                                        <Label for="exampleText" sm={2}> Title </Label>
                                        <Input type="text" name="title" id="title" required value={this.state.title} onChange={this.handleChange}/>
                                    </Col>
                                    <Col sm={12}>
                                        <Label for="exampleText" sm={2}> user Id </Label>
                                        <Input type="text" name="userId" id="userId" required value={this.state.userId} onChange={this.handleChange}/>
                                    </Col>
                                    <Col sm={12}>
                                        <Label for="exampleText" sm={2}> Id </Label>
                                        <Input type="text" name="id" id="id" required value={this.state.id} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <FormGroup>
                                        <Col>
                                            <Button onClick={() => { this.handleClick(this.state.id) }}>Delete item</Button>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row >
                                        <Col md="12" sm="12" xs="12">
                                            <Button>Update</Button>
                                        </Col>
                                    </FormGroup>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );

    }

}
export default DetailsItem;
