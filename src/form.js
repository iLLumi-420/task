import { useState } from "react";

function Form({ schema }) {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    schema.forEach((data) => {
      const { name, validate } = data;
      const value = formValues[name];
      let error = "";

      if (validate) {
        const { type, min_length, min_value } = validate;
        if (type === "string" && value.length < min_length) {
          error = `Minium length of name should be ${min_length}`;
        } else if (type === "number" && Number(value) < min_value) {
          error = `Minium age should be ${min_value}`;
        }
        if (error) {
          errors[name] = error;
        }
      }
    });
    if (Object.keys(errors).length === 0) {
      console.log(formValues); // Handle form submission
      alert("Form submitted successfully!");
    } else {
      alert(
        "Please fix the following errors: \n" + Object.values(errors).join("\n")
      );
    }
  };

  return (
    <div className="App">
      <h1>React after so long</h1>
      <h2>Dynamic Form</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {schema.map((data) => {
            return (
              <div key={data.name}>
                <label>{data.label}</label>:
                <input
                  type={data.type}
                  name={data.name}
                  placeholder={data.placeholder}
                  onChange={handleChange}
                  value={formValues[data.name] || ""}
                />
                <br />
              </div>
            );
          })}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;
