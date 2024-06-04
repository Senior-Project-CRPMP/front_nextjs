'use client'
import { useRouter, useParams } from 'next/navigation';
import {  useEffect } from "react";

const DeleteForm: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (!id) {
            router.push("/project_dashboard/Form/FormList")
        }
    }, []);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:44316/api/Form/DeleteForm/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Faile to delete form');
            }
            router.push("/project_dashboard/Form/FormList");
        } catch (error) {
            console.error("Error Deleteing Form:",  error)
        }
    }

    const exitDelete = () => {
        router.push("/project_dashboard/Form/FormList");
    }

    return (
        <>
        <p className="delete-confirmation">
          Are you sure you want to delete this Form?
        </p>
        <div className="delete-buttons">
          <button className="button" onClick={handleDelete}>
            Yes
          </button>
          <button className="button" onClick={exitDelete}>
            No
          </button>
        </div>
      </> 
    )
}

export default DeleteForm