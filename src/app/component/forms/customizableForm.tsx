'use client'
import { useState } from 'react';

const FormPage = () => {
  const [showAddSec, setShowAddSec] = useState(false);
  const [sections, setSections] = useState([]);
  const [sectionInput, setSectionInput] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [jsonResult, setJsonResult] = useState(null);
  const [optionInput, setOptionInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [formValues, setFormValues] = useState({});


  const handleSectionSave = () => {
    setSections([...sections, sectionInput]);
    setShowAddSec(false);
    const formData = [...sections, sectionInput].map((section) => ({
      sectionName: section.sectionName, 
      sectionDesc: section.sectionDesc,
      fields: formFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleSectionChange = (event) => {
    const { name, value } = event.target;
    setSectionInput((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAddField = (section) => {
    setFormFields([
      ...formFields,
      {
        label: "",
        type: "short-text",
        required: false,
        section,
        options: [],
        includeComment: false,
        comment: "",
        maxLength: null,
        maxUploadSize: null,
        allowedTypes: [],
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);

    const formData = sections.map((section) => ({
      [section.sectionName]: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleFieldChange = (index, name, value, optionIndex) => {
    const updatedFields = [...formFields];
    if (name === "options") {
      updatedFields[index].options[optionIndex] = value;
    } else if (name === "allowedTypes") {
      const updatedTypes = formFields[index].allowedTypes || [];
      if (value === true) {
        if (!updatedTypes.includes(optionIndex)) {
          updatedTypes.push(optionIndex);
        }
      } else if (value === false) {
        const indexToRemove = updatedTypes.indexOf(optionIndex);
        if (indexToRemove !== -1) {
          updatedTypes.splice(indexToRemove, 1);
        }
      }
      updatedFields[index].allowedTypes = updatedTypes;
    } else {
      updatedFields[index][name] = value;
    }
    setFormFields(updatedFields);

    const formData = sections.map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleAddOption = (fieldIndex) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options.push(optionInput);
    setFormFields(updatedFields);
    setOptionInput("");

    const formData = sections.map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleRemoveOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFormFields(updatedFields);

    const formData = sections.map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleDuplicateField = (index) => {
    const updatedFields = [...formFields];
    const fieldToDuplicate = updatedFields[index];
    const duplicatedField = JSON.parse(JSON.stringify(fieldToDuplicate));
    updatedFields.splice(index + 1, 0, duplicatedField);
    setFormFields(updatedFields);

    const formData = sections.map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };
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
      <h1 class="text-2xl font-bold mb-4">Create Form</h1>

      {sections.map((section, index) => (
        <div key={index}>
          <h2>{section.sectionName}</h2>

          <form>
            {formFields.map((field, fieldIndex) => {
              if (field.section !== section.sectionName) {
                return null;
              }
              return (
                <div key={fieldIndex}>
                  <label>
                    Question:
                    <input
                      type="text"
                      name="label"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          e.target.name,
                          e.target.value,
                        )
                      }
                      className="border rounded px-3 py-2 w-full"
                    />
                  </label>
                  <label class="block mb-4 font-bold">
                     Question Type:
                   <select
    name="type"
    class="block w-full p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    value={field.type}
    onChange={(e) =>
      handleFieldChange(
        fieldIndex,
        e.target.name,
        e.target.value,
      )
    }
  >
    <option value="short-text">Short Text</option>
    <option value="long-text">Long Text</option>
    <option value="select">Select</option>
    <option value="checkbox">Checkbox</option>
    <option value="file">File</option>
    <option value="rating">Rating</option>
    <option value="date">Date</option>
    <option value="time">Time</option>
  </select>
</label>
<label class="flex items-center space-x-2">
  <span class="font-bold">Required:</span>
  <input
    type="checkbox"
    name="required"
    class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
    checked={field.required}
    onChange={(e) =>
      handleFieldChange(
        fieldIndex,
        e.target.name,
        e.target.checked,
      )
    }
  />
</label>
<label class="flex items-center space-x-2">
  <span class="font-bold">Include Comment:</span>
  <input
    type="checkbox"
    name="includeComment"
    class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
    checked={field.includeComment}
    onChange={(e) =>
      handleFieldChange(
        fieldIndex,
        e.target.name,
        e.target.checked,
      )
    }
  />
</label>
                  {field.includeComment && (
                   <div class="mb-4">
                   <textarea
                     name="comment"
                     class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     value={field.comment}
                     onChange={(e) =>
                       handleFieldChange(
                         fieldIndex,
                         e.target.name,
                         e.target.value,
                       )
                     }
                     placeholder="Add comment"
                   ></textarea>
                 </div>
                  )}
                 {field.type === "short-text" && (
  <div class="mb-4">
    <label class="block font-bold mb-2">Answer</label>
    <input
      class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      disabled
    />
  </div>
)}
{field.type === "long-text" && (
  <div class="mb-4">
    <label class="block font-bold mb-2">Answer</label>
    <textarea
      class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      disabled
    ></textarea>
    <div class="mt-2">
      <label class="block font-bold mb-2">
        Max Length:
        <input
          type="number"
          name="maxLength"
          class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={field.maxLength || ""}
          onChange={(e) =>
            handleFieldChange(
              fieldIndex,
              e.target.name,
              e.target.value,
            )
          }
        />
      </label>
    </div>
  </div>
)}
                  {field.type === "select" && (
  <>
    <h4 className="font-bold mb-2 text-gray-700">Options:</h4>
    <div className="space-y-2">
      {field.options?.map((option, optionIndex) => (
        <div
          key={optionIndex}
          className="flex items-center"
        >
          <input
            type="text"
            value={option}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-2"
            onChange={(e) =>
              handleFieldChange(
                fieldIndex,
                "options",
                e.target.value,
                optionIndex
              )
            }
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            onClick={() =>
              handleRemoveOption(fieldIndex, optionIndex)
            }
          >
            X
          </button>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <input
        type="text"
        value={optionInput}
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => setOptionInput(e.target.value)}
      />
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        onClick={() => handleAddOption(fieldIndex)}
      >
        Add Option
      </button>
    </div>
  </>
)}
                 {field.type === "checkbox" && (
  <>
    <h4 className="font-bold mb-2 text-gray-700">Options:</h4>
    <div className="space-y-2">
      {field.options?.map((option, optionIndex) => (
        <div
          key={optionIndex}
          className="flex items-center"
        >
          <input
            type="text"
            value={option}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-2"
            onChange={(e) =>
              handleFieldChange(
                fieldIndex,
                "options",
                e.target.value,
                optionIndex
              )
            }
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            onClick={() =>
              handleRemoveOption(fieldIndex, optionIndex)
            }
          >
            X
          </button>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <input
        type="text"
        value={optionInput}
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => setOptionInput(e.target.value)}
      />
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        onClick={() => handleAddOption(fieldIndex)}
      >
        Add Option
      </button>
    </div>
  </>
)}
                 {field.type === "file" && (
  <div class="mb-4">
    <div class="mb-2">
      <label class="block font-bold mb-2">
        Max Upload File Size (MB):
        <input
          type="number"
          name="maxUploadSize"
          class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={field.maxUploadSize || ""}
          onChange={(e) =>
            handleFieldChange(
              fieldIndex,
              e.target.name,
              e.target.value,
            )
          }
        />
      </label>
    </div>
    <p class="font-bold mb-2">Allowed file types:</p>
    <div class="flex flex-col space-y-2">
      <label class="flex items-center">
        <input
          type="checkbox"
          value=".doc"
          class="mr-2"
          checked={field.allowedTypes?.includes(".doc")}
          onChange={(e) =>
            handleFieldChange(
              fieldIndex,
              "allowedTypes",
              e.target.checked,
              ".doc",
            )
          }
        />
        Document (DOC/DOCX)
      </label>
      <label class="flex items-center">
        <input
          type="checkbox"
          value=".pdf"
          class="mr-2"
          checked={field.allowedTypes?.includes(".pdf")}
          onChange={(e) =>
            handleFieldChange(
              fieldIndex,
              "allowedTypes",
              e.target.checked,
              ".pdf",
            )
          }
        />
        PDF
      </label>
      <label class="flex items-center">
        <input
          type="checkbox"
          value=".txt"
          class="mr-2"
          checked={field.allowedTypes?.includes(".txt")}
          onChange={(e) =>
            handleFieldChange(
              fieldIndex,
              "allowedTypes",
              e.target.checked,
              ".txt",
            )
          }
        />
        Text
      </label>
      <label class="flex items-center">
        <input
          type="checkbox"
          value=".jpg"
          class="mr-2"
          checked={field.allowedTypes?.includes(".jpg")}
          onChange={(e) =>
            handleFieldChange(
              fieldIndex,
              "allowedTypes",
              e.target.checked,
              ".jpg",
            )
          }
        />
        Image (JPG, JPEG, PNG, GIF)
      </label>
    </div>
    <input
      type="file"
      class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      disabled
    />
  </div>
)}
{field.type === "rating" && (
  <div class="mb-4">
    <Rating value={field.value} readOnly />
  </div>
)}
{field.type === "date" && (
  <div class="mb-4">
    <input
      type="date"
      class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      disabled
    />
  </div>
)}
{field.type === "time" && (
  <div class="mb-4">
    <input
      type="time"
      class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      disabled
    />
  </div>
)} 
<br />
                  <button onClick={() => handleRemoveField(fieldIndex)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                    Remove Field
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicateField(fieldIndex) } class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Duplicate
                  </button>
                </div>
              );
            })}
          </form>
          <button onClick={() => handleAddField(section.sectionName)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded">
            Add Field
          </button>
          <hr />
        </div>
      ))}
      <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mt-4" onClick={() => setShowAddSec(true)}>Add new section</button>

      {showAddSec && (
        <div>
          Add Section
          <div>
            Section Name:
            <input name="sectionName" onChange={handleSectionChange} className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            Section Description:
            <input name="sectionDesc" onChange={handleSectionChange} className="border rounded px-3 py-2 w-full" />
          </div>
          <button onClick={handleSectionSave} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded mb-4">Save</button>
          <br />
          <br />
        </div>
      )}
      {/* 
      <h2>JSON Result</h2>
      <pre>{jsonResult}</pre> */}
      
    </div>

  );
  
};
export default FormPage;