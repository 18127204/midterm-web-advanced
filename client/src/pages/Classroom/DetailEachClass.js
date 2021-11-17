import React, { Component } from 'react'
import HeaderClassRoom from '../../components/HeaderClassRoom/HeaderClassRoom';
import { Redirect } from 'react-router';
import {URL_API,URL_FRONTEND,INFO,TOKEN,INFCLASS} from '../../SettingValue';
import Axios from 'axios';
import ModalAddStudent from './ModalAddStudent';
import ModalAddTeacher from './ModalAddTeacher';
export default class DetailEachClass extends Component {
    constructor(props) {
        super(props);
        this.state={
            infoClass:[],
            lstStudents:[],
            lstTeachers:[],
        }
    }
    getDetailClassroom=()=>{

        let promise=Axios({
            method:'GET',
            url:`${URL_API}/classroom/api/detailClassroom/${this.props.match.params.duonglink}`,
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((res)=>{
            // console.log('infor class',res.data);
            this.setState({
                infoClass:res.data[0]
            });
            localStorage.setItem(INFCLASS,JSON.stringify(res.data[0]));
            // console.log('get infor class oke',this.state.infoClass);
        });
        promise.catch((error)=>{
            console.log('get infor class that bai',error);
        });
    }
    getAllListTeachers=()=>{
        let promise=Axios({
            method:'GET',
            url:`${URL_API}/classroom/api/teacherClassroom/${this.props.match.params.duonglink}`,
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((res)=>{
            // console.log('infor teacher',res.data);
            this.setState({
                lstTeachers:res.data
            })
            // console.log('get infor teacher oke',this.state.lstTeachers);
        });
        promise.catch((error)=>{
            console.log('get infor teacher that bai',error);
        });
    }
    getAllListStudents=()=>{
        let promise=Axios({
            method:'GET',
            url:`${URL_API}/classroom/api/studentClassroom/${this.props.match.params.duonglink}`,
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((res)=>{
            console.log('infor student',res.data);
            this.setState({
                lstStudents:res.data
            })
            console.log('get infor student oke',this.state.lstStudents);
        });
        promise.catch((error)=>{
            console.log('get infor student that bai',error);
        });
    }
    componentDidMount(){
        this.getDetailClassroom();
        this.getAllListTeachers();
        this.getAllListStudents();
    }
    handleDisplayTeachers=(lst)=>{
        if(lst.length){
            return lst.map((teacher,index)=>{
                return (
                    <tr key={index}>
                        <td>{teacher.hoten}</td>
                    </tr>
                )
            })
        }
        else{
            
        }

    }
    handleDisplayStudents=(lst)=>{
        if(lst.length){
            return lst.map((st,index)=>{
                return(
                    <tr key={index}>
                        <td>{st.hoten}</td>
                    </tr>
                )
            })
        }
        else{
            return(<div></div>)   
        }

    }

    handleInvitedTeacher=(info)=>{
        let infoCourse=JSON.parse(localStorage.getItem(INFCLASS));
        let dataSend={...info,...infoCourse};

        let promise=Axios({
            method:'POST',
            url:`${URL_API}/sendEmail/SendEmailTeacher`,
            data:dataSend,
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((res)=>{
            console.log('oke p1');
            this.getAllListTeachers();
        });
        promise.catch((error)=>{
            console.log('get infor student that bai',error);
        });

    }

    handleInvitedStudent=(info)=>{
        let infoCourse=JSON.parse(localStorage.getItem(INFCLASS));
        let dataSend={...info,...infoCourse};
        let promise=Axios({
            method:'POST',
            url:`${URL_API}/sendEmail/SendEmailStudent`,
            data:dataSend,
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((res)=>{
            console.log('oke p1');
            this.getAllListStudents();
        });
        promise.catch((error)=>{
            console.log('get infor student that bai',error);
        });
    }

    render() {
        return (
            <div>
                <HeaderClassRoom tenLop={this.state.infoClass.tenlophoc}/>
                {/* Tab panes */}
                <div className="tab-content">
                    <div id="bangtin" className="container tab-pane active container">
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3>Tên lớp học: {this.state.infoClass.tenlophoc}</h3>
                                <h3>Chủ đề : {this.state.infoClass.chude}</h3>
                                <h3>Phần : {this.state.infoClass.phan}</h3>
                                <h3>Chủ phòng :{this.state.infoClass.phong}</h3>
                                <h3>Đường link tham gia:  {URL_FRONTEND+this.state.infoClass.duonglink}</h3>
                            </div>

                        </div>

                    </div>
                    <div id="moinguoi" className="container tab-pane fade container">
                        <div className='row'>
                            <div className='col-md-12'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Giáo viên</th>
                                            <th><button className='btn btn-success' data-toggle="modal" data-target="#modelIdAddTeacher">Mời giáo viên</button></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.handleDisplayTeachers(this.state.lstTeachers)}
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-md-12'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Học sinh</th>
                                            <th><button className='btn btn-success'  data-toggle="modal" data-target="#modelIdAddStudent">Mời học sinh</button></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.handleDisplayStudents(this.state.lstStudents)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalAddTeacher invitedTeacher={this.handleInvitedTeacher}/>
                <ModalAddStudent invitedStudent={this.handleInvitedStudent}/>
            </div>

        )
    }
}
