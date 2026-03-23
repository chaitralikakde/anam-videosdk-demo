import React, { createContext, useContext, useState, useCallback } from "react";

interface FormData {
  [key: string]: string;
}

interface PageContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  formData: FormData;
  setFormField: (field: string, value: string) => void;
  resetFormData: () => void;
  highlightedElement: string | null;
  setHighlightedElement: (el: string | null) => void;
  pendingNavigation: string | null;
  setPendingNavigation: (route: string | null) => void;
  formSubmitTrigger: string | null;
  setFormSubmitTrigger: (form: string | null) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("/");
  const [formData, setFormData] = useState<FormData>({});
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [formSubmitTrigger, setFormSubmitTrigger] = useState<string | null>(null);

  const setFormField = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetFormData = useCallback(() => {
    setFormData({});
  }, []);

  return (
    <PageContext.Provider value={{
      currentPage, setCurrentPage,
      formData, setFormField, resetFormData,
      highlightedElement, setHighlightedElement,
      pendingNavigation, setPendingNavigation,
      formSubmitTrigger, setFormSubmitTrigger,
    }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePageContext must be used within PageProvider");
  return ctx;
};
