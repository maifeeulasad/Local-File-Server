import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import server from '../server';
import {NotificationManager} from "react-notifications";
import NavigationBar from './NavigationBar';
import * as CCJ from "copy-clipboard-js";
import * as publicIp from 'public-ip';


class Upload extends React.Component{
    state={
        link:'',
        status:'ready',//ready,uploading,done,copied
        file:undefined,
        ip:undefined
    };

    constructor(props){
        super(props);
        this.onInputChange=this.onInputChange.bind(this);
        this.upload=this.upload.bind(this);
        this.copyLink=this.copyLink.bind(this);
    }

    componentWillMount() {
        publicIp.v4().then((ip)=>{
            console.log(ip);
            this.setState({ip:ip})
        })
    }

    copyLink(){
        CCJ.copyText(this.state.link);
        this.setState({status:'copied'});
        NotificationManager.success("Copied to clipboard",'',3000);
    }



    upload(){
        let file;
        try{
            file=this.state.file[0];
        }
        catch (e) {
            return;
        }
        let url=server.server+"/upload";
        let form=new FormData();
        form.append("file",file);
        form.append("ip",this.state.ip);
        axios.post(url,form)
            .then((res)=>this.uploadDone(res.data))
            .catch((err)=>NotificationManager.error(err,'',2000));
    }

    uploadDone(res){
        NotificationManager.success("Success",'',3000);
        this.setState({status:'done'});
        this.setState({link:res.fileDownloadUri})
    }



    onInputChange(e){
        if(e.target.files.length!==0){
            this.setState({file:e.target.files});
        }
    };

    render() {
        let status=this.state.status;
        console.log(status);
        console.log(this.state.file);
        if(status==='ready'){
            return(
                <div>
                    <NavigationBar/>
                    <div className="center">
                        <input multiple={false} type="file" onChange={this.onInputChange}/>
                        <Button onClick={this.upload} variant={ this.state.file!==undefined ? "outline-success" : "dead"}>Upload</Button>
                    </div>
                </div>
            );
        }
        else if(status==='uploading'){
            return(
                <div>
                    <NavigationBar/>
                    <div className="center">
                        <Spinner
                            as="span"
                            animation="grow"
                            size=""
                            role="status"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            );
        }
        else if(status==='done'){
            return(
                <div>
                    <NavigationBar/>
                    <div className="center">
                        <Form>
                            <Form.Group >
                                <Form.Control value={this.state.link} readOnly onClick={this.copyLink}/>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            );
        }
        else if(status==='copied'){
            return(
                <div>
                    <NavigationBar/>
                    <div className="center">
                        <Form>
                            <Form.Group >
                                <Form.Control value={this.state.link} readOnly isValid onClick={this.copyLink}/>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}

export default Upload;
