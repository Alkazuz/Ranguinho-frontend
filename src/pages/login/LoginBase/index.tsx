import { Component, ReactNode } from "react";

import { User } from 'firebase/auth';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { auth } from "../../../utils/firebase";

interface LoginBaseInterface{
    navigate:  NavigateFunction
}

class Class extends Component<LoginBaseInterface>{

    
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        };
    }
    
    componentDidMount(): void {
        let _this = this;

        auth.onAuthStateChanged((user: User | null) => {
            
            if (user) {
                _this.setState({loggedin: true});
                this.props.navigate('/')
                
            } else {
                _this.setState({loggedin: false});
            }
            
        });
    }

    render(): ReactNode {
        return <></>
    }
}

function LoginBase() {
    let navigate = useNavigate();
    return <Class navigate={navigate} />
}

export default LoginBase