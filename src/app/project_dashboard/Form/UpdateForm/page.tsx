'use client'
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

type FormData = {
    id: string,
    name: string,
    description: string,
}

const UpdateForm: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [formData, setFormData] = useState<FormData>({
        id: id as string,
        name: '',
        description: '',
    });

    useEffect(() => {
        if(id) {
            fetchData(id as string);
        }
    }, [id]);

    const fetchData = async (formId: string) => {
        try {
            const response = await fetch(`https://localhost:44316/api/Form/SingleForm/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const responseData = await response.json();
            setFormData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://localhost:44316/api/Form/UpdateForm/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update form');
            }

            router.push('/form');
        } catch (error) {
            console.error('Error making put request: ', error)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
    return (
        <>
        <h1 className="form-header">Update Form</h1>
        <div className="form">
          <form onSubmit={handleSubmit} className="form">
            <label className="form-box">
              <p className="form-label">Form Title:</p>
              <input
                className="form-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className="form-box">
              <p className="form-label">Description:</p>
              <textarea
                className="form-input"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    )
}

export default UpdateForm