'use client'
import React, { useState } from 'react';
import Navigation from './navigation';
import ProfilePage from './profileAndVisibility';
import EmailPage from './email' ;
import SecurityPage from './SecurityContent' ;
import AccountPreferencesPage from './accountPreferences' ;


const AccountPage: React.FC = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('Profile and visibility');

  const renderContent = () => {
    switch (selectedNavItem) {
      case 'Profile and visibility':
        return <ProfilePage/>;
      case 'Email':
        return <EmailPage/>
      case 'Security':
        return <SecurityPage />
      case 'Account preferences':
        return <AccountPreferencesPage />
      case 'Connected APPS':
        return <div>Connected APPS content</div>;
      case 'Link preferences':
        return <div>Link preferences content</div>;
      case 'Product settings':
        return <div>Product settings content</div>;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div>
      <div className="flex space-x-2">
        <div className="w-1/5 h-screen bg-white rounded-md my-2 shadow-2xl"></div>
        <div className="h-screen bg-white rounded-md my-2 mr-2 w-4/5">
          <div className="p-4 flex-col h-screen space-x-0">
            <div className='h-1/6'>
              <Navigation onNavItemSelect={setSelectedNavItem} />
              <div className="border-t border-grey"></div>
            </div>
            <div className='h-5/6'>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;


