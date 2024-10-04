interface User {
  id?: number;
  name: string;
  identifier: string;
  birthday: Date;
  email?: string;
  password?: string;
  phone_number?: string;
  address?: string;
  user_type_id?: number;
}

export default User;
