import React, { Component } from 'react';
import LoginBox from './LoginBox'
import './styles/index.scss'

class App extends Component {

    render() {
        return (
            <div className="bgcolor">
                <div className='col-14'>
                    <LoginBox />
                </div>
            </div>
        )
    }
}

export default App;
