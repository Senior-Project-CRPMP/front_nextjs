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
        "https://localhost:7174/api/Form/CreateForm",
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
          "https://localhost:7174/api/FormQuestion/CreateQuestion",
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
            await fetch("https://localhost:7174/api/FormOption/CreateOption", {
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
    <div>
      <h1>Create New Form</h1>
      <form>
        <label className="form-box">
          <p className="form-label"> Form Title:</p>
          <input
            className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="form-box">
          <p className="form-label">Form Description:</p>
          <textarea
            className="form-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className="form-box">
          <p className="form-label">Project ID:</p>
          <input
            className="form-input"
            type="text"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
          />
        </label>
        {formFields.map((field, fieldIndex) => (
          <div key={fieldIndex}>
            <label>
              Question Label:
              <input
                type="text"
                name="label"
                value={field.label}
                onChange={(e) =>
                  handleFieldChange(
                    fieldIndex,
                    e.target.name as keyof FormField,
                    e.target.value
                  )
                }
              />
            </label>
            <label>
              Question Type:
              <select
                name="type"
                value={field.type}
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
            <label>
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
            <label>
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
              <textarea
                name="comment"
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
                <label>Answer</label>
                <input disabled /> <br />
              </>
            )}
            {field.type === "long-text" && (
              <>
                <label>Answer</label>
                <textarea disabled></textarea>
                <br />
                <label>
                  Max Length:
                  <input
                    type="number"
                    name="maxLength"
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
                <h4>Options:</h4>
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
                    />
                    <button
                      type="button"
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
                  onClick={() => handleAddOption(fieldIndex)}
                >
                  Add Option
                </button>
              </>
            )}
            {field.type === "checkbox" && (
              <>
                <h4>Options:</h4>
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
                    />
                    <button
                      type="button"
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
                  onClick={() => handleAddOption(fieldIndex)}
                >
                  Add Option
                </button>
              </>
            )}
            {field.type === "file" && (
              <>
                <label>
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
                  />
                </label>
                Allowed file types:
                <label>
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
                  />
                  Document (DOC/DOCX)
                </label>
                <label>
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
                  />
                  PDF
                </label>
                <label>
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
                  />
                  Text
                </label>
                <label>
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
                  />
                  Image (JPG, JPEG, PNG, GIF)
                </label>
                <input type="file" disabled />
              </>
            )}
            {field.type === "date" && (
              <>
                <input type="date" disabled /> <br />
              </>
            )}
            {field.type === "time" && (
              <>
                <input type="time" disabled /> <br />
              </>
            )}
            <br />
            <button type="button" onClick={() => handleRemoveField(fieldIndex)}>
              Remove Field
            </button>
            <button
              type="button"
              onClick={() => handleDuplicateField(fieldIndex)}
            >
              Duplicate
            </button>
          </div>
        ))}
      </form>
      <button onClick={handleAddField}>Add Field</button>
      <button onClick={handleSubmit}>Save Form</button>
    </div>
  );
};

export default AddForm;
