import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../providers/authentication/Auth";
import { Container } from "./Styles";
import { Link, Redirect } from "react-router-dom";
import { User } from '../../types/User';

const Login = () => {
  const { token, signIn } = useAuth();

  const [error, setError] = useState<boolean>(false);

  const schema = yup.object().shape({
      username: yup.string().required("Username required!"),
      password: yup
      .string()
      .min(6, "Minimun 6 characters!")
      .required("Password required!"),
  });


  const { register, handleSubmit, formState: { errors } } = useForm<User>({
      resolver: yupResolver(schema),
  });

  const onSubmit = (data: User) => {
      signIn(data, setError);
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
      <Button type="submit" variant="contained" color="primary" size="large">
        Send
      </Button>
    </form>
    {error && <span> User or password wrong! </span>}
    <div style={{marginTop: '30px'}}>
        <p>Don;t have a account yet? <Link to='/SignUp'>SignUp</Link></p>
    </div>
    </Container>
  );
}

export default Login;
