'use client'
import React, { useState } from "react";


const FormPreview = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});

  const handleJsonInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      setFormFields(parsedJson);
      setFormValues({});
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
    console.log("Form Values:", formValues);
  };

  const handleFormInputChange = (event) => {
    const { name, value, type, files, checked } = event.target;
    if (type === "file") {
      const file = files[0];
      const maxUploadSizeInMB = formFields
        .flatMap((section) => section.fields)
        .find((field) => field.label === name)?.maxUploadSize;

      const allowedTypes = formFields
        .flatMap((section) => section.fields)
        .find((field) => field.label === name)?.allowedTypes;

      if (
        maxUploadSizeInMB &&
        file &&
        file.size > maxUploadSizeInMB * 1024 * 1024
      ) {
        console.log("File size exceeds the maximum upload size.");
      } else if (
        allowedTypes &&
        file &&
        !allowedTypes.some((type) => file.name.toLowerCase().endsWith(type))
      ) {
        console.log("File type not allowed.");
      } else {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: file,
        }));
      }
    } else if (type === "checkbox") {
      const checkboxName = name;
      const checkboxValue = event.target.value;
      setFormValues((prevState) => {
        if (prevState[checkboxName]) {
          const updatedValues = prevState[checkboxName].includes(checkboxValue)
            ? prevState[checkboxName].filter((value) => value !== checkboxValue)
            : [...prevState[checkboxName], checkboxValue];
          return {
            ...prevState,
            [checkboxName]: updatedValues,
          };
        } else {
          return {
            ...prevState,
            [checkboxName]: [checkboxValue],
          };
        }
      });
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mx-auto">
  <h1 class="text-2xl font-bold mb-4">Form Preview</h1>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => {
    try {
      const parsedJson = JSON.parse(localStorage.getItem("data"));
      setFormFields(parsedJson);
      setFormValues({});
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
    console.log("Form Values:", formValues);
  }}>
    Preview Form
  </button>
  <hr class="my-4" />
  <form onSubmit={handleFormSubmit} class="space-y-4">
    {formFields.map((section) => (
      <div key={section.sectionName}>
        <h3 class="text-lg font-bold">{section.sectionName}</h3>
        <h4 class="text-gray-600 mb-2">{section.sectionDesc}</h4>
        {section.fields.map((field, index) => (
          <div key={index} class="space-y-2">
            <label class="block font-bold text-gray-700">{field.label}:</label>
            {field.type === "select" ? (
              <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={field.label} value={formValues[field.label] || ""} onChange={handleFormInputChange}>
                <option value="">Select an option</option>
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === "file" ? (
              <div>
                {formValues[field.label] ? (
                  <div>
                    {formValues[field.label].type.startsWith("image/") ? (
                      <img src={URL.createObjectURL(formValues[field.label])} alt="Preview" class="h-50 mb-2" />
                    ) : (
                      <span>{formValues[field.label].name}</span>
                    )}
                  </div>
                ) : (
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" name={field.label} onChange={handleFormInputChange} accept={field.allowedTypes?.join(",")} />
                )}
              </div>
            ) : field.type === "rating" ? (
              <div>
                <Rating name={field.label} value={formValues[field.label] || 0} onChange={(_, value) => handleFormInputChange({ target: { name: field.label, value } })} />
              </div>
            ) : field.type === "short-text" ? (
              <input class="shadow appearance-none border rounded w -full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={field.required} type="text" name={field.label} value={formValues[field.label] || ""} onChange={handleFormInputChange} />
            ) : field.type === "long-text" ? (
              <div>
                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={field.required} name={field.label} value={formValues[field.label] || ""} onChange={handleFormInputChange} maxLength={field.maxLength}></textarea>
                {field.maxLength && (
                  <span class="text-gray-500 text-sm">
                    {formValues[field.label]?.length || 0}/{field.maxLength}
                  </span>
                )}
              </div>
            ) : field.type === "checkbox" ? (
              <>
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label class="flex items-center">
                      <input type="checkbox" class="mr-2" name={field.label} value={option} checked={formValues[field.label]?.includes(option) || false} onChange={handleFormInputChange} />
                      {option}
                    </label>
                  </div>
                ))}
              </>
            ) : field.type === "date" ? (
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={field.required} type="date" name={field.label} value={formValues[field.label] || ""} onChange={handleFormInputChange} />
            ) : field.type === "time" ? (
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={field.required} type="time" name={field.label} value={formValues[field.label] || ""} onChange={handleFormInputChange} />
            ) : (
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={field.required} type={field.type} name={field.label} value={formValues[field.label] || ""} onChange={handleFormInputChange} />
            )}
            {field.includeComment === true && <div class="text-gray-500 text-sm">{field.comment}</div>}
          </div>
        ))}
        <hr class="my-4" />
      </div>
    ))}
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Submit
    </button>
  </form>
</div>
  );
};

export default FormPreview;
