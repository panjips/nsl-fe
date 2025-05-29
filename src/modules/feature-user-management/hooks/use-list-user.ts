import { useMemo, useState } from "react";
import { useUserStore } from "../stores";

export const useListUser = () => {
  const { users, resetUsers } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");

  const listUsers = useMemo(() => {
    if (users.state.state === "success") {
      return users.state.data;
    }
  }, [users.state.state]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim() || !listUsers) return listUsers;

    const searchTermLower = searchTerm.toLowerCase();

    return listUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower) ||
        user.username.toLowerCase().includes(searchTermLower) ||
        user.phone_number.toLowerCase().includes(searchTermLower) ||
        user.role.name.toLowerCase().includes(searchTermLower)
    );
  }, [listUsers, searchTerm]);

  return {
    data: filteredData,
    setSearchTerm,
    searchTerm,
    state: users.state.state,
    isLoading: users.state.state === "loading",
    isError: users.state.state === "error",
    reset: resetUsers,
  };
};
