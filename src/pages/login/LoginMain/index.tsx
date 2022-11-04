import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router';
import { ErrorBox } from '../../../components/ErrorBox';
import { handleFirebaseError } from '../../../utils/firebaseError';
import { providerFacebook, providerGoogle } from '../../../utils/providers';
import LoginBase, { LoginPageClass } from '../LoginBase';

import "./index.css"
const auth = getAuth();
export class Class extends LoginPageClass{
  
  constructor(props) {
    super(props);
    this.state = {
        error: "",
    };
  }

  componentDidMount(): void {
    super.componentDidMount();
  }

  render(): ReactNode {

    const handlerFacebookClick = async () => {
    
      try{
        const data = await signInWithPopup(auth, providerFacebook)
        const user = data.user;
        
      }catch(err){
        this.setState({
          error: handleFirebaseError(err),
        });
      }
    
    }

    const handlerGoogleClick = async () => {
      try{
        const data = await signInWithPopup(auth, providerGoogle)
        const user = data.user;
      }catch(err){
        this.setState({
          error: handleFirebaseError(err),
        });
      }
    }

    const errorMsg = this.state.error;

    return (
      <div className="container">
          <div className="container-left">
            
            <img src="images/banner-login.png" alt="" className="banner" />
            <div className="rounded-background"></div>
          </div>
          <div className="container-right">
            <div className="login-container">
              <h1 className="title">Entrar</h1>
                <h1 className="desc">Como deseja continuar?</h1>
                <button className="btn btn-facebook" onClick={handlerFacebookClick}>
                  <span className="icon-login">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="50" height="50"><path fill="#fff" d="M21.125 0H4.875C2.183594 0 0 2.183594 0 4.875v16.25C0 23.816406 2.183594 26 4.875 26h16.25C23.816406 26 26 23.816406 26 21.125V4.875C26 2.183594 23.816406 0 21.125 0zm-.660156 14.003906H18.03125v9.003907h-4.0625v-9.003907h-1.578125V10.96875h1.578125V9.035156C13.96875 6.503906 15.019531 5 18.007813 5h3.023437v3.023438h-1.757812c-1.160157 0-1.238282.429687-1.238282 1.242187l-.003906 1.703125h2.765625z"></path></svg>
                  </span>
                  <span className="btn-label">
                    Continuar com Facebook
                  </span>
                </button>
  
                <button className="btn btn-google" onClick={handlerGoogleClick}>
                  <div className="icon-login">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z" fill="#4285F4"></path><path fillRule="evenodd" clipRule="evenodd" d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.96409 10.7099C3.78409 10.1699 3.68182 9.59313 3.68182 8.99995C3.68182 8.40677 3.78409 7.82995 3.96409 7.28995V4.95813H0.957273C0.347727 6.17313 0 7.54768 0 8.99995C0 10.4522 0.347727 11.8268 0.957273 13.0418L3.96409 10.7099Z" fill="#FBBC05"></path><path fillRule="evenodd" clipRule="evenodd" d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"></path></svg>
                  </div>
                  <span className="btn-label">
                    Continuar com Google
                  </span>
                </button>

                <div className="other-logins">
                  <button className='btn btn-other lite-shadow'>
                    <span className="btn-label">Telefone</span>
                  </button>
                  <button className='btn btn-other lite-shadow'>
                    <span className="btn-label">Email</span>
                  </button>
                </div>

                {errorMsg && <ErrorBox msg={errorMsg} onClose={() => this.setState({error: ''})}/>}
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

