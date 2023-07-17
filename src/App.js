import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    skills: [],
    workStatus: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [fieldsError, setFieldsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      const selectedSkills = formData.skills.slice();
      if (selectedSkills.includes(value)) {
        const index = selectedSkills.indexOf(value);
        selectedSkills.splice(index, 1);
      } else {
        selectedSkills.push(value);
      }
      setFormData({ ...formData, [name]: selectedSkills });
    } else {
      if (name === "mobile") {
        if (/^[0-9+-]+$/.test(value)) {
          setErrorMessage({
            ...errorMessage,
            mobile: false,
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            mobile: true,
          });
        }
      } else if (name === "email") {
        if (/^\S+@\S+\.\S+$/.test(value)) {
          setErrorMessage({
            ...errorMessage,
            email: false,
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            email: true,
          });
        }
      } else if (name === "password") {
        const regex =
          /^(?=.*[@#$])(?=.*\d{4})(?=.*[A-Z]{2})(?=.*[a-z]{2}).{8,}$/;

        if (regex.test(value)) {
          setErrorMessage({
            ...errorMessage,
            password: false,
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            password: true,
          });
        }
      } else if (name === "confirmPassword") {
        if (value === formData.password) {
          setErrorMessage({
            ...errorMessage,
            confirmPassword: false,
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            confirmPassword: true,
          });
        }
      }
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let noError = Object.keys(errorMessage).every((k) => !errorMessage[k]);
    let isEmpty = Object.values(formData).every(
      (x) => x !== null && x !== "" && x !== []
    );
    if (noError && isEmpty) {
      console.log("Submitted Succesfully", formData);
      setErrorMessage({
        mobile: false,
        email: false,
        password: false,
        confirmPassword: false,
      });
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        skills: [],
        workStatus: "",
      });
      setFieldsError(false);
    } else if (!isEmpty) {
      setFieldsError(true);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errorMessage?.mobile && (
            <span className="error">
              Mobile number should only contain numbers, +, or -.
            </span>
          )}
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errorMessage?.email && (
            <span className="error">Please enter a valid email address.</span>
          )}
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errorMessage?.password && (
            <span className="error">
              Password should contain at least 1 special character (@#$), 4
              numbers, 2 uppercase letters, and 2 lowercase letters.
            </span>
          )}
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errorMessage?.confirmPassword && (
            <span className="error">Passwords do not match.</span>
          )}
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Skills:
          <br />
          <input
            type="checkbox"
            name="skills"
            value="Reactjs"
            checked={formData.skills.includes("Reactjs")}
            onChange={handleChange}
          />{" "}
          Reactjs
          <br />
          <input
            type="checkbox"
            name="skills"
            value="Nodejs"
            checked={formData.skills.includes("Nodejs")}
            onChange={handleChange}
          />{" "}
          Nodejs
          <br />
          <input
            type="checkbox"
            name="skills"
            value="Python"
            checked={formData.skills.includes("Python")}
            onChange={handleChange}
          />{" "}
          Python
        </label>
        <br />
        <label>
          Work Status:
          <br />
          <input
            type="radio"
            name="workStatus"
            value="Wfh"
            checked={formData.workStatus === "Wfh"}
            onChange={handleChange}
          />{" "}
          Wfh
          <br />
          <input
            type="radio"
            name="workStatus"
            value="Wfo"
            checked={formData.workStatus === "Wfo"}
            onChange={handleChange}
          />{" "}
          Wfo
        </label>
        {fieldsError && (
          <span className="error">Make sure all fields are entered.</span>
        )}
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
