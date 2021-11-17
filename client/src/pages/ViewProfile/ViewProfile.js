import React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { INFO, TOKEN } from '../../SettingValue';
export default function ViewProfile(props) {

    const handleReturn = () => {
        props.history.goBack();
    }
    const {hoten,diachi,email,sodienthoai} =JSON.parse(localStorage.getItem(INFO)) ;
    if (localStorage.getItem(TOKEN)) {
        return (
            <div>
                <Header/>
                <div className='container'>
                    <div className="row">
                        <p className='text-center'>Thông tin cá nhân</p>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <p>Họ và tên</p>
                                <input type="text" className="form-control" value={hoten} readOnly/>
                            </div>
                            <div className="form-group">
                                <p>Địa chỉ</p>
                                <input type="text" className="form-control" value={diachi} readOnly/>
                            </div>

                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <p>Email</p>
                                <input type="email" className="form-control" value={email} readOnly/>
                            </div>
                            <div className="form-group">
                                <p>Số điện thoại</p>
                                <input type="text" className="form-control" value={sodienthoai} readOnly/>
                            </div>
                        </div>

                    </div>
                    <button className='btn btn-danger' style={{ width: '50%', margin: '0 auto' }} onClick={handleReturn} >Quay lại</button>
                </div>


            </div>

        )
    }
    else {
        return <Redirect to='/' />
    }

}
