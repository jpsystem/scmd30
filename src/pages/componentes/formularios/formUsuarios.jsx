import { useForm } from "react-hook-form"

export default function FormUsuarios() {
    const form = useForm();
    const { register} = form;

    return(
        <div>
            <form>
                <label htmlFor="username" >Username</label>
                <input type="text" id="username" {...register("username")}/>
            
                <button>Submit</button>
            </form>
        </div>
    )
};
