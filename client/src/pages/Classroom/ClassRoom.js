import React, { Component } from 'react'
import { Redirect } from 'react-router';
import {URL_API,INFO,TOKEN} from '../../SettingValue';
import Header from '../../components/Header/Header';
import AClass from './AClass';
import Axios from 'axios';



export default class ClassRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClassRoom:[]
        }
    }


    getAllClassRoom=()=>{
        let promise=Axios({
            url:`${URL_API}/classroom/api/GetALLListClassroom`,
            method:'GET',
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((result)=>{
            this.setState({
                listClassRoom:result.data
            })
        });
        promise.catch((er)=>{
            console.log("loi o classroom",er);
        })
    }
    componentDidMount(){
        this.getAllClassRoom();
    }

    displayListClass = (lst) => {
        return lst.map((cl, index) => {
            return (
                <div className="col-md-3" key={index}>
                    <AClass cl={cl}/>
                </div>
            );
        })
    }

    render(){
        if(localStorage.getItem(TOKEN)){
            return (
                <div>
                    <Header/>
                    <div className='container'>
                        <div className='row'>
                            {this.displayListClass(this.state.listClassRoom)}
                        </div>
                    </div>
                </div>
            )
            
        }
        else{
            return <Redirect to='/'/>
        }
    }
}
