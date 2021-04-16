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

export interface State {
  contacts: Contact[];
}

export interface InputFormData {
  newContact: ContactForm;
  newField: {
    error: string;
    isOpen: boolean;
    name: string;
  };
}

export interface InputFormWithError extends InputFormData {
  submitError: {
    message: string;
    fields: {
      firstName: boolean;
      phoneNumber: boolean;
    };
  };
}
