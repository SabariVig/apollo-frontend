import React,{useState} from "react";
import useForm from "react-hook-form";
import * as Yup from "yup";
import { Typography, Button } from "antd";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const { Text } = Typography;

const Register = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("E-mail Is Required"),
    password: Yup.string().required("Password Is A required Field"),
    username: Yup.string().required("Username Is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords Must Match")
      .required("Password  is required")
  });

  const { register, errors, handleSubmit,formState:{isSubmitting}} = useForm({
    mode: "onChange",
    validationSchema: schema
  });


  // const values=getValues()

  const [addUser] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err){
      console.log(err)
    }
  }
  );

  const [serverError,setServerError] =useState("")


  // const test= async()=>
  // {
  //   const response= await addUser({
  //     variables:{
  //       email:"lol@gmail.com",
  //       username:"LOL",
  //       password:"11111111",
  //       confirmPassword:'11111111'
  //     },
  //     errorPolicy:"all"
  //       }
  //   );
    
  // }

  const onSubmit = async (data) => {
    const response= await addUser({
      variables:data,
      errorPolicy:"all"
        }
        );
        setServerError(response.errors[0].message)
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
{serverError && <h4 style={{color:'red'}}>{serverError}</h4>}
        <input
          style={{ padding: 30, marginTop: 15 }}
          className={
            errors.username ? "Custom_input formError" : "Custom_input"
          }
          type="text"
          name="username"
          placeholder="Username"
          ref={register}
        />
        {errors.username && (
          <Text type="danger">{errors.username.message}</Text>
        )}

        <input
          style={{ padding: 30, marginTop: 15 }}
          className={errors.email ? "Custom_input formError" : "Custom_input"}
          type="text"
          name="email"
          placeholder="Email"
          ref={register}
        />
        {errors.email && <Text type="danger">{errors.email.message}</Text>}
        <input
          style={{ padding: 30, marginTop: 15 }}
          className={
            errors.password ? "Custom_input formError" : "Custom_input"
          }
          placeholder="Password"
          type="password"
          name="password"
          ref={register}
        />
        {errors.password && (
          <Text type="danger">{errors.password.message}</Text>
        )}

        <input
          style={{ padding: 30, marginTop: 15 }}
          className={
            errors.confirmPassword ? "Custom_input formError" : "Custom_input"
          }
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          ref={register}
        />
        {errors.confirmPassword && (
          <Text type="danger">{errors.confirmPassword.message}</Text>
        )}

        <br />
        <Button
        loading={isSubmitting}
          size="large"
          style={{ marginTop: 15 }}
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </form>
        {/* <Button
        onClick={test}
        >
          Tset
        </Button> */}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      token
    }
  }
`;

export default Register;
