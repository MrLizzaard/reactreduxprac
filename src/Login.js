import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { login } from "./Auth/authCrud";

const initialValues = {
  userId: "",
  password: "",
};

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    userId: Yup.string() //
      .min(3, "적어도 3자")
      .max(50, "많으면 50자")
      .required("아이디 입력"),
    password: Yup.string() //
      .min(3, "적어도 3자")
      .max(50, "많으면 50자")
      .required("비밀번호 입력"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        login(values.userId, values.password)
          .then(({ data: { authToken } }) => {
            setLoading(false);
            console.log(authToken);
          })
          .catch((err) => {
            values.userId = "";
            values.password = "";
            alert("로그인 정보 잘못됨");
          })
          .finally(() => {
            setLoading(false);
            setSubmitting(false);
          });
      }, 1000);
    },
  });

  return (
    <div>
      <Link to="/auth/registration">회원가입</Link>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div>
          <label name="userId">아이디</label>
          <br />
          <input type="text" name="userId" placeholder="아이디" {...formik.getFieldProps("userId")} />
        </div>
        <div>
          <label name="password">비밀번호</label>
          <br />
          <input type="password" name="password" placeholder="비밀번호" {...formik.getFieldProps("password")} />
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          확인
        </button>
      </form>
      {loading ? <div>로딩중</div> : null}
    </div>
  );
};

export default Login;
