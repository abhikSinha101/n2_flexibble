"use client";

import React, { useCallback, useRef, ReactNode, Children } from "react";

const CreateMenu = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="modal_wrapper">
        {/**this children refers to the object inside the modal class in page.tsx of create-page**/}
        {children}
      </div>
    </div>
  );
};

export default CreateMenu;
