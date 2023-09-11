import * as Yup from "yup";

export const signUp = Yup.object({
  fulName: Yup.string().min(3).required("Invalid Your Name"),
  email: Yup.string().email().required("Invalid Your Email Address"),
  password: Yup.string().min(6).required("Invalid Your Password"),
});
export const signIn = Yup.object({
  email: Yup.string().email().required("Invalid Your Email Address"),
  password: Yup.string().min(6).required("Invalid Your Password"),
});
export const forgot = Yup.object({
  email: Yup.string().email().required("Invalid Your Email Address"),
});

export const editInfo = Yup.object({
  displayName: Yup.string().min(3).required("Invalid Your Name"),
  headline: Yup.string().min(3).required("Invalid Your Headline"),
  location: Yup.string().min(3).required("Invalid Your Location"),
  education: Yup.string().min(3).required("Invalid Your Education"),
});
