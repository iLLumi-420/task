import "./App.css";
import Form from "./form";

const personSchema = [
  {
    type: "text",
    name: "fname",
    placeholder: "First name",
    label: "First name",
    validate: {
      type: "string",
      min_length: 4,
    },
  },
  {
    type: "text",
    name: "lname",
    placeholder: "Last name",
    label: "Last name",
    validate: {
      type: "string",
      min_length: 4,
    },
  },
  {
    type: "number",
    name: "age",
    placeholder: "Enter age",
    label: "Age",
    validate: {
      type: "number",
      min_value: 18,
    },
  },
];

function App() {
  return (
    <div>
      <Form schema={personSchema} />
      <br />
    </div>
  );
}

export default App;
