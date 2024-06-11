"use client";

import React, { useState } from "react";
import Navigation from "./navigation";
import ProfilePage from "./profileAndVisibility";
import EmailPage from "./email";
import SecurityPage from "./SecurityContent";
import AccountPreferencesPage from "./accountPreferences";

const AccountPage: React.FC = () => {
  const [selectedNavItem, setSelectedNavItem] = useState(
    "Profile and visibility"
  );

  const renderContent = () => {
    switch (selectedNavItem) {
      case "Profile and visibility":
        return <ProfilePage />;
      case "Security":
        return <SecurityPage />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div>
      <div className="flex space-x-2">
        <div className="h-screen bg-white rounded-md mr-2 w-screen">
          <div className="h-screen bg-white rounded-md my-2 mr-2 w-4/5">
            <div className="p-4 flex-col h-screen space-x-0">
              <div className="h-1/6">
                <Navigation onNavItemSelect={setSelectedNavItem} />
                <div className="border-t border-grey "></div>
              </div>
              <div className="h-5/6">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
