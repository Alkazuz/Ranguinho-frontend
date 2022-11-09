
import { useForm } from "react-hook-form";

import "./index.css";

interface PasswordFormProp{
  onReceivePassword: (email: string) => void
}

export default function PasswordForm(props: PasswordFormProp) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    props.onReceivePassword(data.password)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
            <input type={'password'} className={`box-div${(errors?.password?.type ? ' error' : '')}`}
                {...register("password", {
                required: true,
                })}
            />
            <span className={`floating-placeholder${(errors?.password?.type ? ' error-color' : '')}`}>Informe a sua senha</span>
        </div>
      
      
      {errors?.password?.type === "required" && <p>Digite sua senha</p>}
      {errors?.password?.type === "pattern" && (
        <p>Digite uma senha válida</p>
      )}
      <input value="Continuar" type="submit" disabled={(errors?.password?.type != undefined)} className="btn-ranguinho width-100 height-50"/>
    </form>
  );
}
