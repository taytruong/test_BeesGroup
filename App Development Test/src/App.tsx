import { useEffect, useState } from "react";
import "./App.css";
import UserTable from "./components/UserTable";
import { TUser } from "./model/User";
import { ConfigProvider, Spin, Switch, theme } from "antd";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://randomuser.me/api/?results=150");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error("Invalid data");
        }
        const fetchUsers: TUser[] = data.results.map(
          (user: any, index: number) => ({
            id: `user-${index + 1}`,
            name: `${user.name.first} ${user.name.last}`,
            balance: Math.floor(Math.random() * 10000) + 1000,
            email: user.email,
            registerAt: new Date(user.registered.date),
            active: Math.random() > 0.2,
          })
        );
        setUsers(fetchUsers);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, []);

  const handleEdit = (updatedUser: TUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="App">
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontFamily: "monospace" }}>MODE:</h1>
          <Switch
            checked={darkMode}
            onChange={(checked) => setDarkMode(checked)}
          />
        </div>
        {error && (
          <h1
            style={{ color: "red", marginBottom: 16, fontFamily: "monospace" }}
          >
            {error}
          </h1>
        )}
        <Spin spinning={loading}>
          <UserTable data={users} onEdit={handleEdit} onDelete={handleDelete} />
        </Spin>
      </div>
    </ConfigProvider>
  );
}

export default App;
