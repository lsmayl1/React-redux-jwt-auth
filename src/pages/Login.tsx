import React, { useState } from "react";
import { useLoginMutation } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(form).unwrap(); 
      console.log("Login successful:", result);
      localStorage.setItem("token", result.accessToken); 
      navigate("/profile");
      } catch (err) {
      console.error("Login failed:", (err as any).data.message);
    }
  };

  return (
    <>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={onChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={onChange}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {isError && <p>Error: {(error as any).data.message}</p>}
    </form>
    
    </>
  );
};

export default Login;
