'use client'
import { useState, ChangeEvent, FormEvent } from 'react';

interface Section {
  sectionName: string;
  sectionDesc: string;
}

interface Field {
  label: string;
  type: string;
  options?: string[];
  required: boolean;
  section: string;
  includeComment?: boolean;
  comment?: string;
  maxLength?: number | null;
  maxUploadSize?: number | null;
  allowedTypes?: string[];
}

interface FormData {
  sectionName: string;
  sectionDesc: string;
  fields: Field[];
}

const FormPage = () => {
  const [showAddSec, setShowAddSec] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionInput, setSectionInput] = useState<Partial<Section>>({});
  const [formFields, setFormFields] = useState<Field[]>([]);
  const [jsonResult, setJsonResult] = useState<string | null>(null);
  const [optionInput, setOptionInput] = useState<string>("");
  const [jsonInput, setJsonInput] = useState<string>("");
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleSectionSave = () => {
    const newSection = sectionInput as Section;
    setSections([...sections, newSection]);
    setShowAddSec(false);
    const formData = [...sections, newSection].map((section) => ({
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

  const handleSectionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSectionInput((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAddField = (section: string) => {
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

  const handleRemoveField = (index: number) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
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

  const handleFieldChange = (index: number, name: keyof Field, value: any, optionIndex?: number | string) => {
    const updatedFields = [...formFields];
    if (name === "options" && typeof optionIndex === "number") {
      updatedFields[index].options![optionIndex] = value;
    } else if (name === "allowedTypes") {
      const updatedTypes = formFields[index].allowedTypes || [];
      const optionIndexStr = optionIndex!.toString();
      if (value) {
        if (!updatedTypes.includes(optionIndexStr)) {
          updatedTypes.push(optionIndexStr);
        }
      } else if (value === false) {
        const indexToRemove = updatedTypes.indexOf(optionIndexStr);
        if (indexToRemove !== -1) {
          updatedTypes.splice(indexToRemove, 1);
        }
      }
      updatedFields[index].allowedTypes = updatedTypes;
    } else {
      updatedFields[index].allowedTypes = value;
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
  

  const handleAddOption = (fieldIndex: number) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options!.push(optionInput);
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

  const handleRemoveOption = (fieldIndex: number, optionIndex: number) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options!.splice(optionIndex, 1);
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

  const handleDuplicateField = (index: number) => {
    const updatedFields = [...formFields];
    const fieldToDuplicate = updatedFields[index];
    const duplicatedField = JSON.parse(JSON.stringify(fieldToDuplicate)) as Field;
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

  const handleJsonInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedJson: Field[] = JSON.parse(jsonInput);
      setFormFields(parsedJson);
      setFormValues({});
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
    console.log("Form Values:", formValues);
  };

  const handleFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files, checked } = event.target;
    if (type === "file") {
      const file = files![0];
      const maxUploadSizeInMB = formFields
        .find((field) => field.label === name)?.maxUploadSize;
      const maxSizeInBytes = (maxUploadSizeInMB || 0) * 1024 * 1024;
      if (file && file.size > maxSizeInBytes) {
        alert(`File size exceeds the maximum upload size of ${maxUploadSizeInMB} MB.`);
        return;
      }
      setFormValues((prevValues) => ({ ...prevValues, [name]: file }));
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: type === "checkbox" ? checked : value }));
    }
  };
  

  return (
    <div>
      <h2>Create a Section</h2>
      <div>
        <button onClick={() => setShowAddSec(true)}>Add Section</button>
      </div>
      {showAddSec && (
        <div>
          <label>
            Section Name:
            <input type="text" name="sectionName" value={sectionInput.sectionName || ''} onChange={handleSectionChange} />
          </label>
          <label>
            Section Description:
            <input type="text" name="sectionDesc" value={sectionInput.sectionDesc || ''} onChange={handleSectionChange} />
          </label>
          <button onClick={handleSectionSave}>Save Section</button>
        </div>
      )}

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3>{section.sectionName}</h3>
          <p>{section.sectionDesc}</p>
          <button onClick={() => handleAddField(section.sectionName)}>Add Field</button>
          {formFields
            .filter((field) => field.section === section.sectionName)
            .map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <label>
                  Label:
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => handleFieldChange(fieldIndex, 'label', e.target.value)}
                  />
                </label>
                <label>
                  Type:
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldChange(fieldIndex, 'type', e.target.value)}
                  >
                    <option value="short-text">Short Text</option>
                    <option value="long-text">Long Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="file">File Upload</option>
                  </select>
                </label>
                <label>
                  Required:
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => handleFieldChange(fieldIndex, 'required', e.target.checked)}
                  />
                </label>
                {['radio', 'checkbox', 'dropdown'].includes(field.type) && (
                  <div>
                    <label>
                      Options:
                      <input
                        type="text"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                      />
                      <button onClick={() => handleAddOption(fieldIndex)}>Add Option</button>
                    </label>
                    {field.options!.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleFieldChange(fieldIndex, 'options', e.target.value, optionIndex)}
                        />
                        <button onClick={() => handleRemoveOption(fieldIndex, optionIndex)}>Remove Option</button>
                      </div>
                    ))}
                  </div>
                )}
                {field.type === "file" && (
                  <div>
                    <label>
                      Allowed Types:
                      <input
                        type="checkbox"
                        checked={field.allowedTypes?.includes('image')}
                        onChange={(e) => handleFieldChange(fieldIndex, 'allowedTypes', e.target.checked, 'image')}
                      /> Image
                      <input
                        type="checkbox"
                        checked={field.allowedTypes?.includes('pdf')}
                        onChange={(e) => handleFieldChange(fieldIndex, 'allowedTypes', e.target.checked, 'pdf')}
                      /> PDF
                    </label>
                    <label>
                      Max Upload Size (MB):
                      <input
                        type="number"
                        value={field.maxUploadSize || ''}
                        onChange={(e) => handleFieldChange(fieldIndex, 'maxUploadSize', e.target.value)}
                      />
                    </label>
                  </div>
                )}
                <button onClick={() => handleDuplicateField(fieldIndex)}>Duplicate</button>
                <button onClick={() => handleRemoveField(fieldIndex)}>Remove</button>
              </div>
            ))}
        </div>
      ))}

      <div>
        <h2>Enter JSON Data</h2>
        <textarea
          rows={10}
          value={jsonInput}
          onChange={handleJsonInputChange}
        />
        <button onClick={(e)=> handleFormSubmit}>Submit</button>
      </div>

      {jsonResult && (
        <div>
          <h2>JSON Result</h2>
          <pre>{jsonResult}</pre>
        </div>
      )}
    </div>
  );
};

export default FormPage;
