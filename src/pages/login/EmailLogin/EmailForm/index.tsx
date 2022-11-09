
import { useForm } from "react-hook-form";

import "./index.css";

interface EmailFormProp{
  onReceiveEmail: (email: string) => void
}

export default function EmailForm(props: EmailFormProp) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    props.onReceiveEmail(data.email)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
            <input className={`box-div${(errors?.email?.type ? ' error' : '')}`}
                {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i
                })}
            />
            <span className={`floating-placeholder${(errors?.email?.type ? ' error-color' : '')}`}>Informe o seu email</span>
        </div>
      
      
      {errors?.email?.type === "required" && <p>Digite seu email</p>}
      {errors?.email?.type === "pattern" && (
        <p>Digite um email válido</p>
      )}
      <input value="Continuar" type="submit" disabled={(errors?.email?.type != undefined)} className="btn-ranguinho width-100 height-50"/>
    </form>
  );
}
