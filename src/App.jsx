import { Container } from "./components/container/Container.jsx";
import { SearchBox } from "./components/SearchBox/SearchBox.jsx";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { Workspace } from "./components/Workspace/Workspace.jsx";
import { Button } from "./components/Button.jsx";
import "./App.scss";

const App = () => {
  return (
    <>
      <Container>
        <SearchBox>
          <div className="search-box__button-wrapper ">
            <Button>add</Button>
            <Button>remove post</Button>
            <Button>create post</Button>
          </div>
        </SearchBox>
      </Container>

      <section>
        <Container>
          <div className="layout">
            <Sidebar />

            <Workspace />
          </div>
        </Container>
      </section>
    </>
  );
};

export default App;
