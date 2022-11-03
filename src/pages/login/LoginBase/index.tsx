import { Component, ReactNode } from "react";

import { User } from 'firebase/auth';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { auth } from "../../../utils/firebase";

export interface PropNagivation{
    navigate:  NavigateFunction
}

export class LoginPageClass extends Component<PropNagivation>{

    
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
    return <LoginPageClass navigate={navigate} />
}

export default LoginBase