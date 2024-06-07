"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormFieldType =
  | "short-text"
  | "long-text"
  | "select"
  | "checkbox"
  | "file"
  | "date"
  | "time";

type FormField = {
  label: string;
  type: FormFieldType;
  required: boolean;
  options: string[];
  includeComment: boolean;
  comment: string;
  maxLength: number | null;
  maxUploadSize: number | null;
  allowedTypes: string[];
  [key: string]: any;
};

const AddForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [optionInput, setOptionInput] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
  });

  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      {
        label: "",
        type: "short-text",
        required: false,
        options: [],
        includeComment: false,
        comment: "",
        maxLength: null,
        maxUploadSize: null,
        allowedTypes: [],
      },
    ]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleFieldChange = (
    index: number,
    name: keyof FormField,
    value: any,
    optionIndex?: number | boolean
  ) => {
    const updatedFields = [...formFields];
    if (name === "options" && typeof optionIndex === "number") {
      updatedFields[index].options[optionIndex] = value as string;
    } else if (name === "allowedTypes" && typeof optionIndex === "boolean") {
      const fileType = value as string;
      const updatedTypes = [...(formFields[index].allowedTypes || [])];
      if (optionIndex) {
        if (!updatedTypes.includes(fileType)) {
          updatedTypes.push(fileType);
        }
      } else {
        const indexToRemove = updatedTypes.indexOf(fileType);
        if (indexToRemove !== -1) {
          updatedTypes.splice(indexToRemove, 1);
        }
      }
      updatedFields[index].allowedTypes = updatedTypes;
    } else {
      updatedFields[index][name] = value;
    }
    setFormFields(updatedFields);
  };

  const handleAddOption = (fieldIndex: number) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options.push(optionInput);
    setFormFields(updatedFields);
    setOptionInput("");
  };

  const handleRemoveOption = (fieldIndex: number, optionIndex: number) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFormFields(updatedFields);
  };

  const handleDuplicateField = (index: number) => {
    const updatedFields = [...formFields];
    const fieldToDuplicate = updatedFields[index];
    const duplicatedField = JSON.parse(JSON.stringify(fieldToDuplicate));
    updatedFields.splice(index + 1, 0, duplicatedField);
    setFormFields(updatedFields);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const formResponse = await fetch(
        `${apiBaseUrl}/api/Form/CreateForm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            projectId: formData.projectId,
          }),
        }
      );

      if (!formResponse.ok) {
        throw new Error("Failed to create form");
      }

      const formResult = await formResponse.json();
      const formId = formResult.id;

      const createQuestionPromises = formFields.map(async (field) => {
        const payload: any = {
          formId,
          type: field.type,
          label: field.label,
          required: field.required,
          includeComment: field.includeComment,
        };

        if (field.comment) payload.comment = field.comment;
        if (field.maxLength !== null) payload.maxLength = field.maxLength;
        if (field.maxUploadSize !== null)
          payload.maxUploadSize = field.maxUploadSize;
        if (field.allowedTypes.length > 0)
          payload.allowedTypes = field.allowedTypes;

        const questionResponse = await fetch(
          `${apiBaseUrl}/api/FormQuestion/CreateQuestion`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!questionResponse.ok) {
          throw new Error("Failed to create form question");
        }

        const questionResult = await questionResponse.json();
        const questionId = questionResult.id;

        if (field.type === "select" || field.type === "checkbox") {
          const createOptionPromises = field.options.map(async (option) => {
            await fetch(`${apiBaseUrl}/api/FormOption/CreateOption`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                formQuestionId: questionId,
                label: option,
              }),
            });
          });
          await Promise.all(createOptionPromises);
        }
      });

      await Promise.all(createQuestionPromises);

      router.push("/project_dashboard/Form/FormList");
    } catch (error) {
      console.error("Error making post request:", error);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3">
      <h1 className="text-2xl font-bold mb-4">Create New Form</h1>
      <form className="space-y-4">
      <label className="form-box">
  <p className="form-label text-gray-700 font-medium mb-2"> Form Title:</p>
  <input
    className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
  />
</label>
<label className="form-box">
  <p className="form-label text-gray-700 font-medium mb-2">Form Description:</p>
  <textarea
    className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
    name="description"
    value={formData.description}
    onChange={handleChange}
  />
</label>
<label className="form-box">
  <p className="form-label text-gray-700 font-medium mb-2">Project ID:</p>
  <input
    className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    type="text"
    name="projectId"
    value={formData.projectId}
    onChange={handleChange}
  />
</label>
        {formFields.map((field, fieldIndex) => (
          <div key={fieldIndex}>
            <label className="block mb-2">
    Question Label:
    <input
      type="text"
      name="label"
      value={field.label}
      className="border border-gray-300 rounded-md px-4 py-2 w-full"
      onChange={(e) =>
        handleFieldChange(
          fieldIndex,
          e.target.name as keyof FormField,
          e.target.value
        )
      }
    />
  </label>
  <label className="block mb-2">
    Question Type:
    <select
      name="type"
      value={field.type}
      className="border border-gray-300 px-3 py-2 rounded-md w-full"
      onChange={(e) =>
        handleFieldChange(
          fieldIndex,
          e.target.name as keyof FormField,
          e.target.value
        )
      }
    >
      <option value="short-text">Short Text</option>
      <option value="long-text">Long Text</option>
      <option value="select">Select</option>
      <option value="checkbox">Checkbox</option>
      <option value="file">File Upload</option>
      <option value="date">Date</option>
      <option value="time">Time</option>
    </select>
  </label>
  <label className="block mb-2">
    <input
      type="checkbox"
      name="required"
      checked={field.required}
      onChange={(e) =>
        handleFieldChange(
          fieldIndex,
          e.target.name as keyof FormField,
          e.target.checked
        )
      }
      className="mr-2 text-blue-500 focus:ring-blue-500 border-gray-300 rounded mt-3" 
    />
    Required
  </label>
            <label className="block mb-2">
              Include Comment:
              <input
                type="checkbox"
                className="ml-3 text-blue-500 focus:ring-blue-500 border-black-300 rounded"
                name="includeComment"
                checked={field.includeComment}
                onChange={(e) =>
                  handleFieldChange(
                    fieldIndex,
                    e.target.name as keyof FormField,
                    e.target.checked
                  )
                }
                
              />
            </label>
            {field.includeComment && (
              <textarea
                name="comment"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={field.comment}
                onChange={(e) =>
                  handleFieldChange(
                    fieldIndex,
                    e.target.name as keyof FormField,
                    e.target.value
                  )
                }
                placeholder="Add comment"
              />
            )}
            {field.type === "short-text" && (
              <>
                <label className="text-gray-700 font-medium">Answer</label>
                <input disabled /> <br />
              </>
            )}
            {field.type === "long-text" && (
              <>
                <label className="text-gray-700 font-medium">Answer</label>
                <textarea disabled></textarea>
                <br />
                <label className="block mb-2">
                  Max Length:
                  <input
                    type="number"
                    name="maxLength"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={field.maxLength || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        fieldIndex,
                        e.target.name as keyof FormField,
                        parseInt(e.target.value)
                      )
                    }
                    
                  />
                </label>
              </>
            )}
            {field.type === "select" && (
              <>
                <h4 className="text-gray-700 font-semibold mb-2">Options:</h4>
                {field.options?.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          "options",
                          e.target.value,
                          optionIndex
                        )
                      }
                      className="mr-2 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      onClick={() =>
                        handleRemoveOption(fieldIndex, optionIndex)
                      }
                    >
                      X
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-3"
                  onClick={() => handleAddOption(fieldIndex)}
                >
                  Add Option
                </button>
              </>
            )}
            {field.type === "checkbox" && (
              <>
               <h4 className="text-gray-700 font-semibold mb-2">Options:</h4>
                {field.options?.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          "options",
                          e.target.value,
                          optionIndex
                        )
                      }
                      className="mr-2 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      onClick={() =>
                        handleRemoveOption(fieldIndex, optionIndex)
                      }
                    >
                      X
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-3"
                  onClick={() => handleAddOption(fieldIndex)}
                >
                  Add Option
                </button>
              </>
            )}
            {field.type === "file" && (
  <div>
    <label className="block mb-2 mr-5">
      Max Upload File Size (MB):
      <input
        type="number"
        name="maxUploadSize"
        value={field.maxUploadSize || ""}
        onChange={(e) =>
          handleFieldChange(
            fieldIndex,
            e.target.name as keyof FormField,
            parseInt(e.target.value)
          )
        }
        className="ml-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded mb-5"
      />
    </label>

    <p className="block mb-2">Allowed file types:</p>

    <label className="block mb-2">
      <input
        type="checkbox"
        value=".doc"
        checked={field.allowedTypes?.includes(".doc")}
        onChange={(e) =>
          handleFieldChange(
            fieldIndex,
            "allowedTypes",
            ".doc",
            e.target.checked
          )
        }
        className="mr-2 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
      />
      Document (DOC/DOCX)
    </label>

    <label className="block mb-2">
      <input
        type="checkbox"
        value=".pdf"
        checked={field.allowedTypes?.includes(".pdf")}
        onChange={(e) =>
          handleFieldChange(
            fieldIndex,
            "allowedTypes",
            ".pdf",
            e.target.checked
          )
        }
        className="mr-2 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
      />
      PDF
    </label>

    <label className="block mb-2">
      <input
        type="checkbox"
        value=".txt"
        checked={field.allowedTypes?.includes(".txt")}
        onChange={(e) =>
          handleFieldChange(
            fieldIndex,
            "allowedTypes",
            ".txt",
            e.target.checked
          )
        }
        className="mr-2 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
      />
      Text
    </label>

    <label className="block mb-2">
      <input
        type="checkbox"
        value=".jpg"
        checked={field.allowedTypes?.includes(".jpg")}
        onChange={(e) =>
          handleFieldChange(
            fieldIndex,
            "allowedTypes",
            ".jpg",
            e.target.checked
          )
        }
        className="mr-2 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
      />
      Image (JPG, JPEG, PNG, GIF)
    </label>

    <input type="file" disabled />
  </div>
)}
            {field.type === "date" && (
              <>
                <input type="date" disabled   className="px-3 py-2 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/> <br />
              </>
            )}
            {field.type === "time" && (
              <>
                <input type="time" disabled   className="px-3 py-2 border border-gray-300 rounded-md text-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/> <br />
              </>
            )}
            <br />
            <button type="button" onClick={() => handleRemoveField(fieldIndex)} className="bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-3">
              Remove Field
            </button>
            <button
              type="button"
              className="bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-3 ml-3"
              onClick={() => handleDuplicateField(fieldIndex)}
            >
              Duplicate
            </button>
          </div>
        ))}
      </form>
      <button onClick={handleAddField} className="bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-3">Add Field</button>
      <button onClick={handleSubmit} className="bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-3 ml-3">Save Form</button>
      </div>
    </div>
  );
};

export default AddForm;
