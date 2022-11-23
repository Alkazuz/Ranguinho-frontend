import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile, User, UserCredential } from 'firebase/auth';
import { FC, ReactNode, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { handleFirebaseError } from '../../utils/firebaseError';


import "./index.css"
import { ErrorBox } from '../../components/ErrorBox';
import { PropPage } from '../../constants/Interfaces';
import { useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import {auth } from '../../utils/firebase';

export function Class(props: PropPage){

    const [error, setError] = useState<string>('');

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user: UserCredential | null) => {
        if (user) {
          setError('');
          await updateProfile(auth.currentUser, {displayName: data.name})
          props.navigate('/')
        }

      })
      .catch( (err: FirebaseError) => setError(handleFirebaseError(err)))
    };

    return (

      <div className="container-login" style={{overflowY: 'hidden'}}>
          
          <div className="container">
          <div className="rounded-background"></div>
            <div className="image-left">
              <LazyLoadImage src={'/images/banner-login.png'} alt="" className="banner" />
            </div>

            <div className="login-right">
              <div className="login-container box-div lite-shadow register-size">

                <div className="login-sub-container">
                  <h1 className="title-field">Preencha os campos para continuar</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-field">
                        <input className={`box-div${(errors?.name ? ' error' : '')}`}
                            {...register("name", {
                            required: true,
                            pattern: /[A-Z][a-z].* [A-Z][a-z].*/
                            })}
                        />
                        <span className={`floating-placeholder${(errors?.nome?.type ? ' error-color' : '')}`}>Informe nome e sobrenome</span>
                    </div>

                    <div className="input-field">
                        <input className={`box-div${(errors?.email?.type ? ' error' : '')}`}
                            {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i
                            })}
                        />
                        <span className={`floating-placeholder${(errors?.email?.type ? ' error-color' : '')}`}>Informe o seu email</span>
                    </div>
                          
                    <div className="input-field">
                        <input type={"password"} className={`box-div${(errors?.password?.type ? ' error' : '')}`}
                            {...register("password", {
                            required: true,
                            minLength: 6,
                            
                            })}
                        />
                        <span className={`floating-placeholder${(errors?.password ? ' error-color' : '')}`}>Informe sua senha</span>
                    </div>
                    <input value="Continuar" autoComplete="off" type="submit" disabled={(errors != undefined && errors?.name != undefined 
                    && errors?.email != undefined && errors?.password != undefined)} className="btn-ranguinho width-100 height-50"/>
                    
                  </form>
                  <br />
                  {error && <ErrorBox msg={error} onClose={() => setError('')}/>}
                </div>
              </div>
            </div>

            

          </div>
      </div> );
}

function RegisterPage() {
  let navigate = useNavigate();
  return <Class navigate={navigate} />
}

export default RegisterPage

