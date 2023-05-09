import { SaidbarItem } from "./SaidbarItem";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <ul className="sidebar__list">
          <SaidbarItem />
        </ul>
      </div>
    </aside>
  );
};
