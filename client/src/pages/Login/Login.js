import React, { useState } from 'react'
import Axios from 'axios';
import { Redirect } from 'react-router';
import { URL_API, INFO, TOKEN } from '../../SettingValue';
export default function Login(props) {
    let [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    });

    const handleInput = (event) => {
        let { name, value } = event.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        let promise = Axios({
            url: `${URL_API}/login`,
            method: 'POST',
            data: userLogin
        });

        promise.then((result) => {
            // console.log('kq tra ve sau login',result.data);
            localStorage.setItem(INFO, JSON.stringify(result.data.content));
            localStorage.setItem(TOKEN, result.data.tokenAccess);
            props.history.push("/classroom");
        })
        promise.catch((err) => {
            alert('dang nhap fail rui');
            console.log('loi nek: ', err);
        });
    };

    const handleRegister = () => {
        props.history.push("/register");
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <button className="btn btn-danger" onClick={handleLogin}>Đăng nhập</button>
                </div>
            </form>
            <div className="form-group">
                <button className="btn btn-danger" onClick={handleRegister}>Đăng ký</button>
            </div>
        </div>

    );
}
