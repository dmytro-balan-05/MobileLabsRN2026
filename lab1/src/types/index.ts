export interface INewsItem {
    id: string;
    title: string;
    date: string;
    description: string;
}

export interface IRegistrationForm {
    email: string;
    password: string;
    confirmPassword: string;
    lastName: string;
    firstName: string;
}