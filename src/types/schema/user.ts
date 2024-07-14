export interface User {
    "id": string;
    "name": string;
    "email": string;
    "password": string;
    "rights": Array<string>,
    "status": string;
}