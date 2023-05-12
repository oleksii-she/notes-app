import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { Workspace } from "./components/Workspace/Workspace.jsx";
import { Layout } from "./components/Layout/Layout.jsx";

const App = () => {
  return (
    <>
      <Layout>
        <Sidebar />

        <Workspace />
      </Layout>
    </>
  );
};

export default App;
