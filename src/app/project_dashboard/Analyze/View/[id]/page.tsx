'use client'
import { useRouter, useParams } from 'next/navigation';
import {  useState, useEffect } from "react";

function ViewFormData(){
    const [currentPage, setCurrentPage] = useState('analysis')
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const PageContent = ({ currentPage }: { currentPage: string }) => {
        return (
          <div>
            {currentPage === "analysis" && <Analysis />}
            {currentPage === "preview" && <Preview />}
          </div>
        );
      };

      const Analysis = () => {
        return (
        <>
            <h1 className="text-black">Analysis</h1>
            <p>Form Responses: 2</p>
            
        </>
        );
      };
    
      const Preview = () => {
        return <h1 className="text-black">Preview</h1>;
      };
    return(
        <>
        <nav className='flex justify-center'>
            <button className='m-2'onClick={()=>setCurrentPage('analysis')}>Analysis</button>
            <button className='m-2' onClick={()=>setCurrentPage('preview')}>Preview</button>
        </nav>
        <div>
        <PageContent currentPage={currentPage} />
        </div>
        </>
    )
}

export default ViewFormData