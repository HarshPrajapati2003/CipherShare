"use client"
// TopHeader.js

import { UserButton } from '@clerk/nextjs';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import SideNav from '../_components/SideNav';

function TopHeader() {
  const [isSideNavVisible, setSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setSideNavVisible(!isSideNavVisible);
  };

  const closeSideNav = () => {
    setSideNavVisible(false);
  };

  return (
    <>
      <div className="flex p-5 border-b items-center justify-between md:justify-end">
        <AlignJustify className="md:hidden" onClick={toggleSideNav} />
        <Image src="/logo.svg" width={150} height={100} className="md:hidden" />
        <UserButton />
      </div>
      {isSideNavVisible && <SideNav onClose={closeSideNav} />}
    </>
  );
}

export default TopHeader;
