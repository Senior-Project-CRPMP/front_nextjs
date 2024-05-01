'use client'
import React, { useState } from "react";

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);

  const handleFieldChange = (index, fieldKey, value) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldKey] = value;
      return updatedFields;
    });
  };

  const addFormField = () => {
    setFormFields((prevFields) => [
      ...prevFields,
      { label: "", type: "text", placeholder: "", value: "" },
    ]);
  };

  const removeFormField = (index) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };

  const handleInputChange = (index, value) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index].value = value;
      return updatedFields;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  const renderFormField = (field, index) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "date":
      case "checkbox":
      case "radio":
        return (
          <input
            type={field.type}
            className="border rounded p-2 w-full mb-2"
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        );
      case "textarea":
        return (
          <textarea
            className="border rounded p-2 w-full mb-2"
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          ></textarea>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2">Field Label</label>
          <input
            type="text"
            className="border rounded p-2 w-full mb-2"
            value={field.label}
            onChange={(e) => handleFieldChange(index, "label", e.target.value)}
          />

          <label className="block mb-2">Field Type</label>
          <select
            className="border rounded p-2 w-full mb-2"
            value={field.type}
            onChange={(e) => handleFieldChange(index, "type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="textarea">Textarea</option>
          </select>

          <label className="block mb-2">Placeholder</label>
          <input
            type="text"
            className="border rounded p-2 w-full mb-4"
            value={field.placeholder}
            onChange={(e) =>
              handleFieldChange(index, "placeholder", e.target.value)
            }
          />

          {renderFormField(field, index)}

          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => removeFormField(index)}
          >
            Remove Field
          </button>
        </div>
      ))}

      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 ml-4 mt-4"
        onClick={addFormField}
      >
        Add Field
      </button>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded ml-4 mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;