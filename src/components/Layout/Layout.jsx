import { PropTypes } from "prop-types";
import { Container } from "../container/Container";
import { SearchBox } from "../SearchBox/SearchBox";
import styles from "./Layout.module.scss";
export const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <SearchBox />
      </Container>
      <section>
        <Container>
          <div className={`${styles.layout}   `}>{children}</div>
        </Container>
      </section>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
