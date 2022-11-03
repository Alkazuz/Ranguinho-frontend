import { Component } from "react";

import { User } from 'firebase/auth';

import { useNavigate } from 'react-router';
import { auth } from "../../../utils/firebase";
export class LoginBase extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        };
    }
    
    componentWillMount(): void {
        let _this = this;
        auth.onAuthStateChanged((user: User | null) => {
            if (user) {
                _this.setState({loggedin: true});
            } else {
                _this.setState({loggedin: false});
            }
        });
    }

}