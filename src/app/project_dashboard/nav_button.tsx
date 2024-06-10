import React from "react";

interface NavButtonProps {
  text: string;
  page: string;
  setCurrentPage: (page: string) => void;
}

function NavButton({ text, page, setCurrentPage }: NavButtonProps) {
  return (
    <button
      className="nav-link text-gray-600 inline-block hover:underline decoration-blue-500 decoration-2 underline-offset-[12px] hover:font-semibold hover:text-slate-400 text-sm"
      onClick={() => setCurrentPage(page)}
    >
      {text}
    </button>
  );
}

interface NavigationProps {
  setCurrentPage: (page: string) => void;
}

function Navigation({ setCurrentPage }: NavigationProps) {
  return (
    <nav className="space-x-6">
      <NavButton
        text="Overview"
        page="overview"
        setCurrentPage={setCurrentPage}
      />
      <NavButton text="Board" page="board" setCurrentPage={setCurrentPage} />
      {/* <NavButton text="List" page="list" setCurrentPage={setCurrentPage} /> */}
      {/* <NavButton
        text="Timeline"
        page="timeline"
        setCurrentPage={setCurrentPage}
      /> */}
      <NavButton
        text="Calendar"
        page="calendar"
        setCurrentPage={setCurrentPage}
      />
      {/* <NavButton
        text="Workflow"
        page="workflow"
        setCurrentPage={setCurrentPage}
      />
      <NavButton text="Files" page="files" setCurrentPage={setCurrentPage} />
      <NavButton
        text="Form builder"
        page="form_builder"
        setCurrentPage={setCurrentPage}
      /> */}
    </nav>
  );
}

export default Navigation;
