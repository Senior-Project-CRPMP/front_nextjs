'use client'
import React from 'react'
import KanbanBoard from '@/app/component/kanbanBoard';
import NavBar from '../nav_bar';

function MyTask(){
    return(
        <div className="flex space-x-2">
            <div className="w-1/5 h-screen bg-white rounded-md my-2 ">
                <NavBar />
            </div>
            <KanbanBoard/>
        </div>
    )
}

export default MyTask;