import React, { Component } from 'react'
import logo from './logo.svg'
import axios from 'axios';

export default class LoginBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            classEmail: false,
            classPassword: false,
            forgetPass: false,
            createAcc: false,
            logo: false,
            label: false
        };
    }

    chgEmailInputBorder(val) {
        this.setState({ classEmail: val })
    }

    chgPasswordInputBorder(val) {
        this.setState({ classPassword: val })
    }

    chgUnderlineForget(val) {
        this.setState({ forgetPass: val })

    }

    chgUnderlineCreate(val) {
        this.setState({ createAcc: val })
    }

    chgEmail(val) {
        this.setState({ email: val })
    }

    chgPassword(val) {
        this.setState({ password: val })
    }

    async login() {
        var self = this;
        this.logospin(true);
        this.showLabel(false);
        await axios.post('http://localhost:3000/api/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                if (response.status == 200) {
                    alert('Login Successed')
                }
            })
            .catch(function (error) {
                console.log(error.response.status);
                return self.setState({ label: true })
            });
        this.logospin(false);
    }

    logospin(val) {
        this.setState({ logo: val })
    }

    showLabel(val) {
        this.setState({ label: val })
    }

    render() {
        return (
            <div className='col-4 offset-4 loginbox'>
                <img src={logo} className={this.state.logo === false ? 'logo center' : ' logo center logo-spin'} />
                <h5>E-mail address</h5>
                <input
                    type='text'
                    className={this.state.classEmail === false ? 'col-12 inputbox' : 'col-12 inputbox borderinput'}
                    onBlur={() => this.chgEmailInputBorder(false)}
                    onFocus={() => this.chgEmailInputBorder(true)}
                    onChange={(e) => this.chgEmail(e.target.value)}
                    placeholder='example@appman.co.th' />
                <h5>Password</h5>
                <input
                    type='password'
                    className={this.state.classPassword === false ? 'col-12 inputbox ' : 'col-12 inputbox borderinput'}
                    onBlur={() => this.chgPasswordInputBorder(false)}
                    onFocus={() => this.chgPasswordInputBorder(true)}
                    onChange={(e) => this.chgPassword(e.target.value)}
                    placeholder='your password...' />

                <label
                    className={this.state.label === false ? 'col-12 hidden' : 'col-12'}>email or password is incorrect</label>

                <button className='signin col-4 offset-4' onClick={() => this.login()}>SIGN IN</button>

                <div className='form-inline'>
                    <p
                        className={this.state.forgetPass === false ? 'col-5 deepskyblue ' : 'col-5 deepskyblue underline'}
                        onMouseOver={() => this.chgUnderlineForget(true)}
                        onMouseLeave={() => this.chgUnderlineForget(false)}>Forget password ?</p>
                    <p
                        className={this.state.createAcc === false ? 'col-5 offset-2 deepskyblue' : 'col-5 offset-2 deepskyblue underline'}
                        onMouseOver={() => this.chgUnderlineCreate(true)}
                        onMouseLeave={() => this.chgUnderlineCreate(false)}>Create new Account</p>
                </div>

            </div>
        )
    }
}