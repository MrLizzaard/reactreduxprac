import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { register } from "./Auth/authCrud";

const initialValues = {
  userId: "",
  email: "",
  password: "",
  passwordConfirm: "",
  userName: "",
  acceptTerms: false,
};

const Registration = (props) => {
  const RegistrationSchema = Yup.object().shape({
    userId: Yup.string() //
      .min(3, "3자 이상")
      .max(20, "20자 미만")
      .required("아이디 쓰셈"),
    email: Yup.string() //
      .email("이메일형식안맞는듯")
      .min(3, "3자 이상")
      .max(20, "20 less")
      .required("이메일 적으셈"),
    password: Yup.string() //
      .min(3, "적어도 3자")
      .max(50, "많으면 50자")
      .required("비밀번호!"),
    passwordConfirm: Yup.string() //
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "비밀번호 안맞음"),
      }),
    userName: Yup.string() //
      .min(3, "3자 이상")
      .max(20, "20자 미만")
      .required("님 이름 쓰셈"),
    acceptTerms: false,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setSubmitting }) => {
      register(values.userId, values.email, values.password, values.userName)
        .then(() => {
          console.log("then");
        })
        .catch((err) => {
          console.log(err);
        });
      setSubmitting(false);
    },
  });
  return (
    <div>
      <Link to="/auth/login">로그인페이지</Link>
      <h1>Registration</h1>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div>
          <label name="userId">아이디</label>
          <br />
          <input type="text" name="userId" placeholder="아이디" {...formik.getFieldProps("userId")} />
          {formik.touched.userId && formik.errors.userId ? <div>{formik.errors.userId}</div> : null}
        </div>

        <div>
          <label name="email">이메일</label>
          <br />
          <input type="email" name="email" placeholder="이메일" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>

        <div>
          <label name="password">비밀번호</label>
          <br />
          <input type="password" name="password" placeholder="비밀번호" {...formik.getFieldProps("password")} />
          {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>

        <div>
          <label name="password">비밀번호확인</label>
          <br />
          <input type="password" name="passwordConfirm" placeholder="비밀번호확인" {...formik.getFieldProps("passwordConfirm")} />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? <div>{formik.errors.passwordConfirm}</div> : null}
        </div>

        <div>
          <label name="userName">이름</label>
          <br />
          <input type="text" name="userName" placeholder="이름" {...formik.getFieldProps("userName")} />
          {formik.touched.userName && formik.errors.userName ? <div>{formik.errors.userName}</div> : null}
        </div>

        <div>
          <label className="checkbox">
            어쩌구 저쩌구 동의하십니까?
            <input type="checkbox" name="acceptTerms" {...formik.getFieldProps("acceptTerms")} />
            {formik.touched.acceptTerms && formik.errors.acceptTerms ? <div>{formik.errors.acceptTerms}</div> : null}
            <span />
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? <div>{formik.errors.acceptTerms}</div> : null}
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          확인
        </button>
      </form>
    </div>
  );
};

export default Registration;
