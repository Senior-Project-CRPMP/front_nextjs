"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormFieldType =
  | "short-text"
  | "long-text"
  | "select"
  | "radio"
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
    setFormFields((prevFields) => [
      ...prevFields,
      {
        label: "",
        type: "short-text",
        required: false,
        options: [],
        optionInput: "",
        includeComment: false,
        comment: "",
        maxLength: null,
      },
    ]);
  };

  const handleRemoveField = (index: number) => {
    setFormFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (
    index: number,
    name: keyof FormField,
    value: any,
    optionIndex?: number | boolean
  ) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      if (name === "options" && typeof optionIndex === "number") {
        updatedFields[index].options[optionIndex] = value as string;
      } else {
        updatedFields[index][name] = value;
      }
      return updatedFields;
    });
  };

  const handleAddOption = (fieldIndex: number) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      if (updatedFields[fieldIndex].optionInput.trim()) {
        updatedFields[fieldIndex].options = [
          ...updatedFields[fieldIndex].options,
          updatedFields[fieldIndex].optionInput,
        ];
        updatedFields[fieldIndex].optionInput = "";
      }
      return updatedFields;
    });
  };

  const handleRemoveOption = (fieldIndex: number, optionIndex: number) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[fieldIndex].options.splice(optionIndex, 1);
      return updatedFields;
    });
  };

  const handleDuplicateField = (index: number) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      const fieldToDuplicate = updatedFields[index];
      const duplicatedField = { ...fieldToDuplicate, options: [...fieldToDuplicate.options] };
      updatedFields.splice(index + 1, 0, duplicatedField);
      return updatedFields;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Ensure the last input option is saved before submission
    const updatedFormFields = formFields.map((field) => {
      if ((field.type === "select" || field.type === "radio") && field.optionInput.trim()) {
        return {
          ...field,
          options: [...field.options, field.optionInput],
          optionInput: "",
        };
      }
      return field;
    });

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

      const createQuestionPromises = updatedFormFields.map(async (field) => {
        const payload: any = {
          formId,
          type: field.type,
          label: field.label,
          required: field.required,
          includeComment: field.includeComment,
        };

        if (field.comment) payload.comment = field.comment;
        if (field.maxLength !== null) payload.maxLength = field.maxLength;

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
    <div className="container mx-auto">
  <div className="flex justify-center">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 mt-6">
        <h1 className="text-xl font-semibold leading-7 text-gray-900 pb-4">Create New Form</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="form-box">
            <p className="block text-sm font-medium leading-6 text-gray-900 mb-1">Form Title:</p>
            <input
              className="block mb-3 w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter form title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label className="form-box">
            <p className="block text-sm font-medium leading-6 text-gray-900 mb-1">Form Description:</p>
            <textarea
               className="block mb-3 w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter form description here..."
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label className="form-box">
            <p className="block text-sm font-medium leading-6 text-gray-900 mb-1">Project ID:</p>
            <input
               className="block w-full rounded-md mb-3 border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter project ID"
              type="text"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
            />
          </label>
          {formFields.map((field, fieldIndex) => (
            <div key={fieldIndex}>
              <label className="block mb-2">
                <p className="block text-sm font-medium leading-6 text-gray-900 mb-1">Field Label:</p>
                <input
                 className="block w-full rounded-md mb-3 border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  value={field.label}
                  onChange={(e) => handleFieldChange(fieldIndex, "label", e.target.value)}
                />
              </label>
              <label className="block mb-2">
                <p className="block text-sm font-medium leading-6 text-gray-900 mb-1">Field Type:</p>
                <select
                  className="block w-full rounded-md mb-3 border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={field.type}
                  onChange={(e) => handleFieldChange(fieldIndex, "type", e.target.value)}
                >
                  <option value="short-text">Short Text</option>
                  <option value="long-text">Long Text</option>
                  <option value="select">Select</option>
                  <option value="radio">Radio</option>
                  <option value="date">Date</option>
                  <option value="time">Time</option>
                </select>
              </label>
              {field.type === "select" || field.type === "radio" ? (
                <div className="mb-4">
                  <p className="block text-sm font-medium leading-6 text-gray-900 mb-1">Options:</p>
                  {field.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                      <input
                        className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 mr-2"
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleFieldChange(fieldIndex, "options", e.target.value, optionIndex)
                        }
                      />
                      <button
                        type="button"
                        className="px-2 py-1 text-white bg-red-500 rounded-md"
                        onClick={() => handleRemoveOption(fieldIndex, optionIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center mb-2">
                    <input
                      className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 mr-2"
                      type="text"
                      value={field.optionInput}
                      onChange={(e) => handleFieldChange(fieldIndex, "optionInput", e.target.value)}
                    />
                    <button
                      type="button"
                      className="px-2 py-1 text-white bg-blue-500 rounded-md"
                      onClick={() => handleAddOption(fieldIndex)}
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              ) : null}
              {/* Additional field properties */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-2 py-1 text-white bg-red-500 rounded-md"
                  onClick={() => handleRemoveField(fieldIndex)}
                >
                  Remove Field
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-white bg-gray-500 rounded-md"
                  onClick={() => handleDuplicateField(fieldIndex)}
                >
                  Duplicate Field
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 text-white bg-blue-500 rounded-md mr-3"
            onClick={handleAddField}
          >
            Add Field
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded-md"
          >
            Save Form
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddForm;
