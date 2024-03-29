import { useState, useEffect } from "react";

function Form({ schema }) {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const initializeFormValues = () => {
      const initialValues = {};

      schema.forEach((data) => {
        const { name, type } = data;

        if (type === "checkbox") {
          initialValues[name] = false;
        } else if (type === "file") {
          initialValues[name] = null;
        } else {
          initialValues[name] = "";
        }
      });

      setFormValues(initialValues);
    };

    initializeFormValues();
  }, [schema]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormValues((prevValues) => ({ ...prevValues, [name]: checked }));
    } else if (type === "file") {
      setFormValues((prevValues) => ({ ...prevValues, [name]: files[0] }));
    } else {
      setFormValues((previousData) => ({ ...previousData, [name]: value }));
    }
  };

  const handleValidation = (data, value) => {
    const { validate } = data;
    let error = "";
    if (validate) {
      const { type, min_length, min_value } = validate;
      if (type === "string" && value.length < min_length) {
        error = `Minium length of name should be ${min_length}`;
      } else if (type === "number" && Number(value) < min_value) {
        error = `Minium age should be ${min_value}`;
      }
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    schema.forEach((data) => {
      const { name } = data;
      const value = formValues[name];
      const error = handleValidation(data, value);

      if (error) {
        errors[name] = error;
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
    console.log(formValues);
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
                {data.type === "file" ? (
                  <input
                    type="file"
                    name={data.name}
                    onChange={handleChange}
                    defaultValue={formValues[data.name]}
                  />
                ) : data.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    name={data.name}
                    onChange={handleChange}
                    defaultValue={formValues[data.name]}
                  />
                ) : (
                  <input
                    type={data.type}
                    name={data.name}
                    placeholder={data.placeholder}
                    onChange={handleChange}
                    value={formValues[data.name]}
                  />
                )}
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
