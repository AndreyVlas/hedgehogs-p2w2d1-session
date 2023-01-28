import express from 'express';
import path from 'path';
import session from 'express-session';
import storage from 'session-file-store';
import cors from 'cors';
import apiUserRouter from './routes/apiUserRouter';
import renderRouter from './routes/renderRouter';
import jsxRender from './utils/jsxRender';
import apiCarRouter from './routes/apiCarRouter';

const PORT = process.env.PORT || 3000;
const app = express();
const FileStore = storage(session);

const sessionConfig = {
  name: 'user_sid', 				// Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test',	// Секретное слово для шифрования, может быть любым
  resave: true, 				// Пересохранять ли куку при каждом запросе
  store: new FileStore(),
  saveUninitialized: false, 		// Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, 				// Серверная установка и удаление куки, по умолчанию true
  },
};

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(cors());
app.use(session(sessionConfig));
app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session.user;
  next();
});

app.use('/', renderRouter);
app.use('/api/user', apiUserRouter);
app.use('/api/car', apiCarRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
