import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import type { FC, ReactNode } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
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

    

    const onClickContinue = async () => {
      this.setState({step: this.state.step + 1})
      console.log(this.state.step)
      if(this.state.step == 1){
        try{
          const data = await signInWithEmailAndPassword(auth, this.state.email, this.state.password)
          const user = data.user;
          
        }catch(err){
          this.setState({
            error: handleFirebaseError(err),
          });
          this.setState({step: this.state.step - 1})
        }
      }
    }

    if(this.state.step == 0){
      return (
        <div className="container">
            <div className="container-left">
              
              <LazyLoadImage src="images/banner-login.png" alt="" className="banner" />
              <div className="rounded-background"></div>
            </div>
            <div className="container-right">
              <div className="login-container">
                {backDiv}
                
                  <div className="login-sub-container">
                    <h1 className="title-email">Informe o seu e-mail para continuar</h1>
                    
                    <div className="input-field">
                      <input type="text" className='box-div' placeholder=' ' required onChange={(e) => this.setState({email: e.target.value})}/>
                      <span className="floating-placeholder">Informe o seu e-mail</span>
                    </div>
                    
                    

                    <button className="btn-ranguinho width-100 height-50" onClick={onClickContinue}>
                      Continuar
                    </button>
                    {errorMsg && <ErrorBox msg={errorMsg} onClose={() => this.setState({error: ''})}/>}
                  </div>
                 
              </div>
                
    
            </div>
        </div> );
    }
    

    return (
      <div className="container">
          <div className="container-left">
            
            <LazyLoadImage src="images/banner-login.png" alt="" className="banner" />
            <div className="rounded-background"></div>
          </div>
          <div className="container-right">
            <div className="login-container">
              {backDiv}
              
                <div className="login-sub-container">
                  <h1 className="title-email">Informe a sua senha para continuar</h1>
                  
                  <div className="input-field">
                    <input type="password" className='box-div' required onChange={(e) => this.setState({password: e.target.value})} />
                    <span className="floating-placeholder">Informe a sua senha</span>
                  </div>
                  

                  <button className="btn-ranguinho width-100 height-50" onClick={onClickContinue}>
                    Continuar
                  </button>
                  {errorMsg && <ErrorBox msg={errorMsg} onClose={() => this.setState({error: ''})}/>}
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

