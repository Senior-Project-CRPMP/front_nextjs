"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormFieldType =
  | "short-text"
  | "long-text"
  | "select"
  | "radio"
  | "file"
  | "date"
  | "time";

type FormField = {
  label: string;
  type: FormFieldType;
  required: boolean;
  options: string[];
  optionInput: string;
  includeComment: boolean;
  comment: string;
  maxLength: number | null;
  maxUploadSize: number | null;
  allowedTypes: string[];
  [key: string]: any;
};

const AddForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
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
        optionInput: "",
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
    updatedFields[fieldIndex].options.push(updatedFields[fieldIndex].optionInput);
    updatedFields[fieldIndex].optionInput = "";
    setFormFields(updatedFields);
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
      const formResponse = await fetch(`${apiBaseUrl}/api/Form/CreateForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          projectId: formData.projectId,
        }),
      });

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

        if (field.type === "select" || field.type === "radio") {
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
            <p className="form-label text-gray-700 font-medium mb-2">Form Title:</p>
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
              className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-3"
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
                  <option value="select">Dropdown</option>
                  <option value="radio">Radio Button</option>
                  <option value="file">File Upload</option>
                  <option value="date">Date</option>
                  <option value="time">Time</option>
                </select>
              </label>
              {(field.type === "select" || field.type === "radio") && (
                <div>
                  {field.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex mb-2">
                      <input
                        type="text"
                        name="options"
                        value={option}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
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
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() =>
                          handleRemoveOption(fieldIndex, optionIndex)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex">
                    <input
                      type="text"
                      value={field.optionInput}
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      onChange={(e) =>
                        handleFieldChange(fieldIndex, "optionInput", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="ml-2 text-blue-500"
                      onClick={() => handleAddOption(fieldIndex)}
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              )}
              <label className="block mb-2">
                Required:
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
                />
              </label>
              <label className="block mb-2">
                Include Comment:
                <input
                  type="checkbox"
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
                <label className="block mb-2">
                  Comment:
                  <input
                    type="text"
                    name="comment"
                    value={field.comment}
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
              )}
              {field.type === "short-text" && (
                <label className="block mb-2">
                  Max Length:
                  <input
                    type="number"
                    name="maxLength"
                    value={field.maxLength || ""}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    onChange={(e) =>
                      handleFieldChange(
                        fieldIndex,
                        e.target.name as keyof FormField,
                        parseInt(e.target.value, 10) || null
                      )
                    }
                  />
                </label>
              )}
              {field.type === "file" && (
                <div className="mb-2">
                  <label className="block mb-2">
                    Max Upload Size (MB):
                    <input
                      type="number"
                      name="maxUploadSize"
                      value={field.maxUploadSize || ""}
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          e.target.name as keyof FormField,
                          parseInt(e.target.value, 10) || null
                        )
                      }
                    />
                  </label>
                  <label className="block mb-2">
                    Allowed File Types:
                    {["image/jpeg", "image/png", "application/pdf"].map(
                      (fileType) => (
                        <div key={fileType} className="flex items-center">
                          <input
                            type="checkbox"
                            name="allowedTypes"
                            value={fileType}
                            checked={field.allowedTypes.includes(fileType)}
                            onChange={(e) =>
                              handleFieldChange(
                                fieldIndex,
                                e.target.name as keyof FormField,
                                fileType,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">{fileType}</span>
                        </div>
                      )
                    )}
                  </label>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() => handleDuplicateField(fieldIndex)}
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => handleRemoveField(fieldIndex)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-3"
            onClick={handleAddField}
          >
            Add Field
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
