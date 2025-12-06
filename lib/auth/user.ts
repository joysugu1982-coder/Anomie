let users: any = [];

export const createUser = async (data: any) => {
  users.push({ ...data, verified: false });
  return true;
};

export const loginUser = async (email: string, password: string) => {
  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) return false;
  if (!user.verified) return false;

  return true;
};
