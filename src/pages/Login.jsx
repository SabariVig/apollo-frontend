import React from "react";
import useForm from "react-hook-form";
import * as Yup from "yup";
import { Typography, Button } from "antd";
const { Text } = Typography;



const Login = () => {

  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("E-mail Is Required"),
    password: Yup.string().required("Password Is A required Field")
  });

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
    validationSchema: schema
  });


const onSubmit = data => {
  console.log(data)
  };



  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
        style={{ padding:30,marginTop:15 }}
          className={errors.email?"Custom_input formError" :"Custom_input"}
          type="text"
          name="email"
          placeholder="Email"
          ref={register}
        />
        {errors.email && <Text type="danger">{errors.email.message}</Text>}
        <input
          style={{ padding:30,marginTop:15 }}
          className={errors.password?"Custom_input formError" :"Custom_input"}
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
        size="large"
          style={{ marginTop: 15 }}
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
