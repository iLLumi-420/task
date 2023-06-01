import { useState } from 'react';
import './App.css';

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
]

function App() {
const [formValues, setFormValues] = useState({})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormValues((previousData)=>( {...previousData, [name]: value} ) )

}

const handleSubmit = (e) => {
  e.preventDefault()
  const errors = {}
  personSchema.forEach((data)=>{
    const { name, validate } = data
    const value = formValues[name]
    let error = ''

    if(validate){
      const {type, min_length, min_value} = validate
      if(type === 'string' && value.length < min_length){
        error = `Minium length of name should be ${min_length}`
      }
      else if (type === 'number' && Number(value) < min_value){
        error = `Minium age should be ${min_value}`
      }
      if(error){
        errors[name] = error
      }  
    }
  })
  if (Object.keys(errors).length === 0) {
    console.log(formValues); // Handle form submission
    alert('Form submitted successfully!');
  } else {
    alert('Please fix the following errors: \n' + Object.values(errors).join('\n'));
  }
}
  


  return (
    <div className="App">
      <h1>React after so long</h1>
      <h2>Dynamic Form</h2>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          {
            personSchema.map(data => {
              return <div key={data.name}>
                <label>{data.label}</label>:
                <input 
                type={data.type} 
                name={data.name} 
                placeholder={data.placeholder} 
                onChange={handleChange} 
                value = { formValues[data.name] || '' }
                />
                <br/>
              </div>
            })
          }
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
}

export default App;
