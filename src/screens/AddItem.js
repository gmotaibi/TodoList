import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row, CardHeader } from 'reactstrap';

class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }


  render() {

    return (
      <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Col xl={8} lg={12} md={12}>
          <Card>
            <CardHeader > <h3>Add new item</h3> </CardHeader>
            <CardBody >
              <Form onSubmit={this.props.handleSubmit}>

                <FormGroup row>
                  <Col sm={12}>
                    <Label for="exampleText" sm={8}> Number of task </Label>
                    <Input type="text" className="mb-2" name="id" id="id" placeholder="id" value={this.state.id} onChange={this.handleChange} required />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={12}>
                    <Label for="exampleText" sm={2}>Task title  </Label>
                    <Input type="text" className="mb-2" name="title" id="title" placeholder="title" value={this.state.title} onChange={this.handleChange} required />
                  </Col>
                </FormGroup>
                
                <FormGroup check row>
                  <Col md="12" sm="12" xs="12">
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}




export default AddItem;


