import type { UserProfile } from "@/types/userTypes";

export async function Login() {
  localStorage.setItem("user", JSON.stringify({
    userID: 20,
    uid: '20',
    name: "John Doe",
    email: "johndoe@example.com",
    role: "admin",
    profilePicture: undefined
  } as UserProfile));
}

export async function GetUser(): Promise<UserProfile | null> {
  const user = localStorage.getItem("user");

  if (!user) {
    const token = localStorage.getItem("token");

    if(!token) return null;

    const user = await fetch(`/api_v1/user?${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      return null;
    });

    return (user)

  }
  
  return JSON.parse(user);
}