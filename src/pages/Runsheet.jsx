import React from 'react';
import { Form, ButtonToolbar, Button, Input } from 'rsuite';
import NavBar from '../Components/Barnav/NavBar';
import SideNav from '../Components/SideNav/SideNav';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const Runsheet = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
  <NavBar />
  <div style={{ display: "flex", height: "calc(100% - 55px)" }}>
        <div
          style={{
            position: "fixed",
            top: "55px",
            left: 0,
            width: "250px",
            height: "calc(100vh - 55px)",
            overflowY: "auto",
          }}
        >
          <SideNav />
        </div>
        <div
          style={{
            marginLeft: "250px",
            width: "calc(100% - 250px)",
            paddingTop: "20px",
          }}
        ><br/>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "20px 0" }}>
              <h2 style={{ fontSize: "25px", color: "#2e2c2c" }}>
                Runsheet
              </h2>
            </div>
            <Form>
    <Form.Group controlId="name">
      <Form.ControlLabel>Nom</Form.ControlLabel>
      <Form.Control name="name" />
    </Form.Group>
    <Form.Group controlId="email">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email" />
    </Form.Group>
    <Form.Group controlId="password">
      <Form.ControlLabel>Mot de passe</Form.ControlLabel>
      <Form.Control name="password" type="password" autoComplete="off" />
    </Form.Group>
    <Form.Group>
      <ButtonToolbar>
        <Button appearance="primary">Submit</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
    </Form.Group>
  </Form>
          </div>
        </div>
      </div>
  </div>
  )
};

export default Runsheet