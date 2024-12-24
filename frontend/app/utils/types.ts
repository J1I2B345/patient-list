export type Patient = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  photoUrl: string;
};

export type ErrorField = {
  message: string;
  field?: string;
};
