import { useUser } from "./context/userContext.jsx";

const Child = () => {
  const { setUser } = useUser();
  return (
    <div>
      <button onClick={() => setUser("New user")}>Click me</button>
    </div>
  );
};

export default Child;
