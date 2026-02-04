export class AuthResponseDto {
  _id: string;
  name: string;
  surname: string;
  role: string;
  email: string;
  photo: string;
  token: string;
  haveToUpdatePassword: boolean;
}
