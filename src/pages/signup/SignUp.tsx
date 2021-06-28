import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../providers/authentication/Auth";
import { Container } from "./Styles";
import { Redirect, Link } from "react-router-dom";
import { UserSignUp } from '../../types/UserSignUp';

function SignUp() {
    const { signUpForm, token } = useAuth();

    const [error, setError] = useState<boolean>(false);

    const schema = yup.object().shape({
        username: yup.string().required("Username required"),
        password: yup
        .string()
        .min(6, "Minimun 6 characters!")
        .required("Password required!"),
        confirmPassword: yup
        .string()
        .min(6, "Minimun 6 characters!")
        .required(" Confirm password required!")
        .oneOf([yup.ref('password'), null], 'Passwords are different!'),
        email: yup.string().email()
    });


    const { register, handleSubmit, formState: { errors } } = useForm<UserSignUp>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: UserSignUp) => {
        signUpForm(data, setError);
    };

    if(token !== ''){
        return <Redirect to='/'/>
    }

    return (
        <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <TextField
                margin="normal"
                variant="outlined"
                label="User name"
                size="small"
                color="primary"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
            ></TextField>
            </div>
            <div>
            <TextField
                margin="normal"
                variant="outlined"
                label="Password"
                size="small"
                color="primary"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                type='password'
            ></TextField>
            </div>
            <div>
            <TextField
                margin="normal"
                variant="outlined"
                label="Password confirm"
                size="small"
                color="primary"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                type='password'
            ></TextField>
            </div>
            <div>
            <TextField
                margin="normal"
                variant="outlined"
                label="Email"
                size="small"
                color="primary"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            ></TextField>
            </div>
            <Button type="submit" variant="contained" color="primary" size="large">
                Send
            </Button>
        </form>
        <div style={{marginTop: '30px'}}>
            <p>Already have a account? <Link to='/login'>Login</Link></p>
        </div>
        </Container>
    );
}

export default SignUp;
