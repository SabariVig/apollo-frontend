import React, { useState } from "react";
import useForm from "react-hook-form";
import * as Yup from "yup";
import { Typography, Button } from "antd";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const { Text } = Typography;

const Login = props => {
  const schema = Yup.object().shape({
    username: Yup.string().required("Username Is Required"),
    password: Yup.string().required("Password Is A required Field")
  });

  const {
    register,
    errors,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    mode: "onChange",
    validationSchema: schema
  });

  const [addUser] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
      props.history.push("/");
    },
    onError() {
      console.log("Error From onError");
    }
  });

  const [serverError, setServerError] = useState("");



  const onSubmit = async data => {
    const response = await addUser({
      variables: data,
      errorPolicy: "all"
    });
    if (response.errors) {
      setServerError(response.errors[0].message);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <h4 style={{ color: "red" }}>{serverError}</h4>}
        <input
          style={{ padding: 30, marginTop: 15 }}
          className={
            errors.username ? "Custom_input formError" : "Custom_input"
          }
          type="text"
          name="username"
          placeholder="Username / Email"
          ref={register}
        />
        {errors.username && (
          <Text type="danger">{errors.username.message}</Text>
        )}

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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
    }
  }
`;

export default Login;
