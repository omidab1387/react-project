export async function loginUser(data) {
  const res = await fetch(
    "https://fakestoreapi.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("نام کاربری یا رمز عبور اشتباه است");
  }

  return res.json();
}