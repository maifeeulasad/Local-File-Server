import React from 'react';
import {Navbar,Form,FormControl,Button} from "react-bootstrap";
//import Form from "react-bootstrap/Form";
//import NavDropdown from "react-bootstrap/NavDropdown";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import '../index.css';
//import axios from "axios";
//import server from '../server';

class NavigationBar extends React.Component{

    state={
        route:''
    };

    constructor(props){
        super(props);
        console.log('check for more file upload');
    }



    componentDidMount() {
        
    }
    render() {

        return(
            <div>
                <NotificationContainer/>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/home">Local File Server</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                    </Navbar.Collapse>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                        <Button type="submit">Search</Button>
                        <Button variant="danger" type="submit" href="/upload">Upload</Button>
                    </Form>
                </Navbar>
            </div>
        );

    }
}
export default NavigationBar;
