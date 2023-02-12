export type MenuItemType = "profile" | "photos" | "password" | null;

export const MenuArray = [
  { text: "Edit Photos", item: "photos" },
  { text: "Edit Profile", item: "profile" },
  { text: "Change Password", item: "password" },
  { text: "Log out", item: "logout" },
];

export const API_URL = process.env.REACT_APP_API_URL || "";
