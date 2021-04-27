export type CustomField = {
  name: string;
  value: string;
};

export interface Contact {
  id: number;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  customFields: CustomField[];
  photoUrl?: string;
}

export type ContactForm = Omit<Contact, 'id'>;

export type MainInputs = Omit<Contact, 'id' | 'customFields'>;
export interface MainInputsWithFields extends MainInputs {
  newCustomFields: CustomField[];
}

export type ContactCardData = {
  previousState: {
    steps: Contact[];
    currentStep: number;
  };
  isEditing: boolean;
  editingState: {
    contact: MainInputsWithFields;
    submitError: SubmitError;
  };
};

export interface State {
  contacts: Contact[];
}

export interface NewField {
  error: string;
  isOpen: boolean;
  name: string;
}

export interface InputFormData {
  newContact: ContactForm;
}

export interface InputFormWithError extends InputFormData {
  submitError: SubmitError;
}

export interface SubmitError {
  message: string;
  fields: {
    firstName: boolean;
    phoneNumber: boolean;
  };
}

export interface ModalConfirmComponentData {
  isOpen: boolean;
  message: string | undefined;
  onAccept: Function | undefined;
}
