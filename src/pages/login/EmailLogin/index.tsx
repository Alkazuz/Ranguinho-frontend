import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import type { FC, ReactNode } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { handleFirebaseError } from '../../../utils/firebaseError';
import LoginBase, { LoginPageClass } from '../LoginBase';

import LogoBanner from '../../../../public/images/banner-login.png'

import "./index.css"
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import { ErrorBox } from '../../../components/ErrorBox';
const auth = getAuth();
export class Class extends LoginPageClass{
  
  constructor(props) {
    super(props);
    this.state = {
        error: "",
        step: 0,
        email: "",
        password: ""
    };
  }

  componentDidMount(): void {
    super.componentDidMount();
  }

  render(): ReactNode {

    const onClickBack = () => {

      this.setState({step: this.state.step - 1})
      
    }

    const errorMsg = this.state.error;
    let backDiv = this.state.step == 0 ? <Link to={"/login"}><div className="back-div"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={16}><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></div></Link> 
        : <Link><div className="back-div" onClick={onClickBack}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={16}><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
          </div></Link>

    
    const onChangeEmail = (email: string) => {
      this.setState({email: email});
      this.setState({step: this.state.step + 1})

      
    }

    const onChangePassword = async (password: string) => {
      this.setState({password: password});
      try{
        const data = await signInWithEmailAndPassword(auth, this.state.email, password)
        const user = data.user;
        
      }catch(err){
        this.setState({
          error: handleFirebaseError(err),
        });
        this.setState({step: this.state.step - 1})
      }
    }

    return (

      <div className="container-login" style={{overflowY: 'hidden'}}>
          
          <div className="container">
          <div className="rounded-background"></div>
            <div className="image-left">
              <LazyLoadImage src={LogoBanner} alt="" className="banner" />
            </div>

            <div className="login-right">
              <div className="login-container box-div lite-shadow login-size">
                {backDiv}
                

                <div className="login-sub-container">
                  {this.state.step == 0 && <><h1 className="title-email">Informe o seu e-mail para continuar</h1><EmailForm onReceiveEmail={onChangeEmail} /></>}
                  {this.state.step == 1 && <><h1 className="title-email">Informe a sua senha para continuar</h1><PasswordForm onReceivePassword={onChangePassword}/></>}
                  {this.state.error && <ErrorBox msg={this.state.error} onClose={() => this.setState({error: ""})}/>}
                </div>
                </div>
            </div>

            

          </div>
      </div> );
  }
}

function LoginMain() {
  let navigate = useNavigate();
  return <Class navigate={navigate} />
}

export default LoginMain

