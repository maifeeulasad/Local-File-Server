import React from 'react';
import Welcome from 'react-welcome-page'
import axios from 'axios';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import data from '../cofig'


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
        let filesUrl=data.server+"/files";
        console.log(filesUrl);
        axios
            .get(filesUrl)
            .then((res)=>{
                this.setState({files:res.data})
            })
    }

    renderFiles(){
        return this.state.files.map((file)=>{
            return(
                <tr>
                    <td>{file.fileID}</td>
                    <td>{file.fileName}</td>
                    <td>{file.uploadedBy}</td>
                    <td>{file.checksum}</td>
                    <td>{file.download}</td>
                </tr>
            );
        })
    }


    render() {
        return(
            <div>
                <Welcome
                    loopDuration={2500}
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

                <div className={"m-wrapper"}>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>File ID</th>
                            <th>File Name</th>
                            <th>Uploaded By</th>
                            <th>Checksum</th>
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
