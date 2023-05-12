Notes App
Цей проект є нотатником, що зберігається на QuintaDB.

Встановлення
Для початку вам потрібно склонувати цей репозиторій та встановити залежності:

bash
Copy code
git clone https://github.com/oleksii-she/notes-app.git
cd notes-app
npm install
Використання
Для запуску додатку в режимі розробки використовуйте команду:

bash
Copy code
npm run dev
Для збірки додатку використовуйте команду:

bash
Copy code
npm run build
Для запуску локального серверу зі збіркою використовуйте команду:

bash
Copy code
npm run preview
Для деплою на GitHub Pages використовуйте команду:

bash
Copy code
npm run deploy
Залежності
Цей проект має наступні залежності:

axios
date-fns
gh-pages
react
react-dom
sass-loader
Також, для розробки, залежність devDependencies містить:

@types/react
@types/react-dom
@vitejs/plugin-react
eslint
eslint-plugin-react
eslint-plugin-react-hooks
eslint-plugin-react-refresh
less
sass
stylus
vite
vite-plugin-svgr
