import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { login } from "../../features/slices/authSlice";
import { useDispatch } from "react-redux";
import ApiService from "../../Services/Api/ApiService";
import { loginSuccess } from "../../features/slices/authSlice";
const Login = () => {
  const intitalState = {
    email: "",
    password: "",
    
  };
  const [values, setValues] = useState(intitalState);
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
console.log(values);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const response = await ApiService.login(values.email, values.password);
      // Assuming response includes the token
      dispatch(loginSuccess(response)); // Dispatch loginSuccess with the response
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., invalid credentials, network error)
      // You might want to set error state here and show error messages in the UI
    }
  };
  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            type="text"
            name="email"  
            value={values.email}
            onChange={onChange}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
          
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            onClick={handleSubmit}
          >
            Sign In
          </Button>
         
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
