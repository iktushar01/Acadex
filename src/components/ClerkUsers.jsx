import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function ClerkUsers({ showUi = true }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [users, setUsers] = useState([]);
  const [savedUser, setSavedUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const payload = {
      clerkId: user.id,
      name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      image: user.imageUrl,
    };

    const syncUser = async () => {
      try {
        await axios.post(`${API_BASE}/users`, payload);
        const { data } = await axios.get(`${API_BASE}/users/${user.id}`);
        setSavedUser(data);
        const allUsers = await axios.get(`${API_BASE}/users`);
        setUsers(allUsers.data);
      } catch (error) {
        console.error("Failed to sync Clerk user:", error);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/users`)
      .then((res) => setUsers(res.data))
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  const handleUpdate = async () => {
    if (!user) return;
    setIsUpdating(true);
    try {
      const payload = {
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        image: user.imageUrl,
      };
      await axios.put(`${API_BASE}/users/${user.id}`, payload);
      const { data } = await axios.get(`${API_BASE}/users/${user.id}`);
      setSavedUser(data);
      const allUsers = await axios.get(`${API_BASE}/users`);
      setUsers(allUsers.data);
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_BASE}/users/${user.id}`);
      setSavedUser(null);
      const remaining = await axios.get(`${API_BASE}/users`);
      setUsers(remaining.data);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!showUi) return null;
  if (!isLoaded) return null;
  if (!isSignedIn) return null;

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={user.imageUrl}
          alt={user.fullName || "User Avatar"}
          className="h-20 w-20 rounded-full object-cover border border-border"
        />
        <div>
          <p className="text-sm text-muted-foreground">Acadex Profile</p>
          <p className="text-xl font-semibold">{user.fullName || "Unknown"}</p>
          <p className="text-sm text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress || "No email"}
          </p>
        </div>
      </div>

      {savedUser && (
        <div className="rounded-xl bg-muted/50 p-4">
          <h3 className="text-lg font-medium mb-2">Saved User (DB)</h3>
          <p className="text-sm text-muted-foreground">
            clerkId: <span className="font-mono">{savedUser.clerkId}</span>
          </p>
          <p>Name: {savedUser.name || "Unnamed"}</p>
          <p>Email: {savedUser.email || "No email"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
            <button
              className="rounded-lg border border-destructive px-3 py-2 text-sm text-destructive disabled:opacity-50"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete from DB"}
            </button>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-2">All Users (DB)</h3>
        <ul className="space-y-2">
          {users.map((dbUser) => (
            <li
              key={dbUser.clerkId || dbUser.email}
              className="rounded-lg border border-border p-3 text-sm"
            >
              <p className="font-medium">
                {(dbUser.name && dbUser.name.trim()) || "Unnamed"}
              </p>
              <p className="text-muted-foreground">{dbUser.email || "No email"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

