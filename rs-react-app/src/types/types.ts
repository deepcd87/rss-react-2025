export interface FormData {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptedTerms: boolean;
  picture: string;
  country: string;
  createdAt: Date;
}

export interface Country {
  name: string;
  code: string;
}

export interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  acceptedTerms?: string;
  picture?: string;
  country?: string;
}

export interface FormProps {
  onSubmitSuccess: () => void;
}

export interface ValidationMessagesProps {
  errors?: string | string[];
}
