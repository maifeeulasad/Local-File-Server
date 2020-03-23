import React from 'react';
import Welcome from 'react-welcome-page'
import axios from 'axios';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import '../index.css';
import NavigationBar from "./NavigationBar";
import Button from "react-bootstrap/Button";
import {NotificationManager} from "react-notifications";
import * as server from '../muaconfig';



class Home extends React.Component{

    state={
        files:[],
    };

    constructor(props){
        super(props);
        this.loadFiles=this.loadFiles.bind(this);
        this.renderFiles=this.renderFiles.bind(this);
    }


    componentWillMount() {
        this.loadFiles();
    }

    loadFiles(){
        let filesUrl=server.server+"/files";
        console.log(filesUrl);
        axios
            .get(filesUrl)
            .then((res)=>{
                console.log(res.data);
                NotificationManager.success('File list updated','',2000);
                this.setState({files:res.data})
            })
    }

    renderFiles(){
        let keyCount=0;
        return this.state.files.map((file)=>{
            return(
                <tr key={++keyCount}>
                    <td>{file.localFileID}</td>
                    <td>{file.fileName}</td>
                    <td>{file.uploadTime}</td>
                    <td>{file.privateIP}</td>
                    <td>{file.publicIP}</td>
                    <td>{file.checksum}</td>
                    <td>{file.downloads}</td>
                    <td>{file.size}</td>
                    <td>
                        <Button variant="warning"
                                onClick={()=>{window.open(server.server+"/download/"+file.localFileID, "_blank")}}>
                            Download
                        </Button>
                    </td>
                </tr>
            );
        })
    }


    render() {
        return(
            <div>
                <Welcome
                    loopDuration={1500}
                    data={[
                        {
                            image: require('../asset/image/hug.webp'),
                            text: 'Just a Local Server to serve your files',
                            imageAnimation: 'flipInX',
                            textAnimation: 'bounce',
                            backgroundColor: '#49ff51',
                        },
                    ]}
                />
                <NavigationBar/>


                <div className={"m-wrapper"}>

                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>File ID</th>
                            <th>File Name</th>
                            <th>Upload Time</th>
                            <th>Private IP</th>
                            <th>Public IP</th>
                            <th>Checksum</th>
                            <th>Download(s)</th>
                            <th>Size</th>
                            <th>Download</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.renderFiles()
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

}

export default Home;

