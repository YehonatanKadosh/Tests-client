import * as Yup from "yup";

const phoneRegExp = /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Example: 0528998989")
    .required("Required"),
});

export default SignUpSchema;
