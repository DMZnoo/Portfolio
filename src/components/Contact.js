import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { slideInLeft, slideInRight } from "react-animations";
import styled, { keyframes } from "styled-components";
import axios from "axios";
const Contact = () => {
  const SlideInLeft = styled.div`
    animation: 2s ${keyframes`${slideInLeft}`} infinite;
  `;
  const SlideInRight = styled.div`
    animation: 2s ${keyframes`${slideInRight}`} infinite;
  `;
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [result, setResult] = useState({
    success: false,
    message: "",
  });

  const onFormSubmit = (values) => {
    console.log("REQUEST_BODY");
    console.log(values);
    axios
      .post("/api/send", { ...values })
      .then((response) => {
        console.log("+_+_+__AXIOS SUCCESS__+_+_+");
        console.log(response.data);
        setResult(response.data);
        reset(result);
      })
      .catch((err) => {
        console.log("+_+_+__AXIOS ERROR__+_+_+");
        console.error(err.response.data); // ***
        console.error(err.response.status); // ***
        console.error(err.response.headers); // ***
        setResult({
          success: false,
          message: "Something went wrong!",
        });
      });
  };
  return (
    <div>
      {result && (
        <p className={`${result.success ? "success" : "error"}`}>
          {result.message}
        </p>
      )}
      <div className="ui center aligned segment">
        <h1 className="ui header" style={{ fontWeight: "900" }} id="contact">
          <SlideInLeft style={{ display: "inline-block" }}>
            <i
              className="caret right icon"
              style={{ textAlign: "left", fontSize: "1em" }}
            />
          </SlideInLeft>
          Contact
          <SlideInRight style={{ display: "inline-block" }}>
            <i
              className="caret left icon"
              style={{ textAlign: "right", fontSize: "1em" }}
            />
          </SlideInRight>
        </h1>
      </div>
      <div className="ui segment">
        <form
          className="ui form"
          id="contact-form"
          method="POST"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Full Name"
              ref={register({
                required: true,
                message: "Please state your name!",
              })}
            />
            {errors.name?.type === "required" && "Your name is required"}
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              name="email"
              ype="email"
              className="form-control"
              aria-describedby="emailHelp"
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              placeholder="Email"
              // onChange={onInputChange}
            />
            {errors.email && errors.email.message}
            {errors.email?.type === "required" && "Your email is required"}
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="5"
              ref={register({
                required: true,
              })}
            ></textarea>
            {errors.name?.type === "required" && "Your message is required"}
          </div>
          <button type="submit" className="ui inverted green button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
