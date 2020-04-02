import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as yup from 'yup';
import { Link } from 'react-router-dom';


const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please input your name")
    .min(2, "name must be more than 2 characters"),
  size: yup.string().required("must include the size of your pizza").oneOf(["medium", "large", "extra-large"]),
  topping: yup
    .boolean()
    .oneOf([true || false], "must pick at least one topping"),
  instructions: yup
    .string()
});

// formSchema = formSchema.test(
//   // this test is added additional to any other (build-in) tests
//   "myCustomCheckboxTest",
//   null, // we'll return error message ourself if needed
//   obj => {
//     // only testing the checkboxes here
//     if (obj.topping1 || obj.topping2 || obj.topping || obj.topping) {
//       return true; // everything is fine
//     }

//     return new yup.ValidationError(
//       "❗ Check at least one checkbox",
//       null,
//       toppings
//     );
//   }
// );

export default function Form() {
  // state for your button and whether you can submit depending on if you fill out required fields
  const [button, setButton] = useState(true);

  // state for our form
  const [formState, setFormState] = useState({
    name: "",
    size: "",
    topping: "",
    instructions: ""
  });

  // state for our errors
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    topping: "",
    instructions: ""
  });

  // state for our post request
  const [post, setPost] = useState([]);
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButton(!valid);
    });
  }, [formState]);

  // submit our state post
  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/orders", formState)
      .then(res => {
        setPost(res.data);
        setFormState({
          name: "",
          size: "",
          topping: "",
          instructions: ""
        });
      })
      .catch(err =>
        console.log(
          "something went wrong when adding to your order",
          err.response
        )
      );
  };
  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "topping" ? e.target.checked : e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist(); // constantly checking to see what the user is typing in and checking if its valid
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <Link to={"/"} className="homePage">
          <div>Home</div>
        </Link>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            id="name"
            placeholder="Your Name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>{" "}
        <br />
        <label htmlFor="size">
          What Pizza size would you like?
          <select id="size" name="size" onChange={inputChange}>
            <option value="select-one">Select One</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extra-large">Extra-Large</option>
          </select>
        </label>{" "}
        <br />
        <label htmlFor="topping" className="topping">
          <input
            id="topping"
            type="checkbox"
            name="topping"
            checked={formState.topping1}
            value={formState.topping1}
            onChange={inputChange}
          />
          Pepperoni
          {errors.topping.length > 0 ? (
            <p className="error">{errors.topping}</p>
          ) : null}
        </label>
        <label htmlFor="topping" className="topping">
          <input
            id="topping"
            type="checkbox"
            name="topping"
            checked={formState.topping2}
            value={formState.topping2}
            onChange={inputChange}
          />
          Sausage
          {errors.topping.length > 0 ? (
            <p className="error">{errors.topping}</p>
          ) : null}
        </label>
        <label htmlFor="topping" className="topping">
          <input
            id="topping"
            type="checkbox"
            name="topping"
            checked={formState.topping3}
            value={formState.topping3}
            onChange={inputChange}
          />
          Pineapple
          {errors.topping.length > 0 ? (
            <p className="error">{errors.topping}</p>
          ) : null}
        </label>
        <label htmlFor="topping" className="topping">
          <input
            id="topping"
            type="checkbox"
            name="topping"
            checked={formState.topping4}
            value={formState.topping4}
            onChange={inputChange}
          />
          Bacon
          {errors.topping.length > 0 ? (
            <p className="error">{errors.topping}</p>
          ) : null}
        </label>
        <br />
        <label htmlFor="instructions">
          Special Instructions:
          <textarea
            id="instructions"
            name="instructions"
            placeholder="Ex. Door Bell, If we should call before knocking etc."
            value={formState.instructions}
            onChange={inputChange}
          />
          {errors.instructions.length > 0 ? (
            <p className="error">{errors.instructions}</p>
          ) : null}
        </label>
        {/* displaying our post request data */}
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button disabled={button}>Add to Order</button>
      </form>
    </div>
  );
}
