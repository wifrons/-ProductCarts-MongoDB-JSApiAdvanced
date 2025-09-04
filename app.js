import express from 'express';
import homeRouter from './routes/home.router.js'
import authRouter from './routes/auth.router.js';
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import sessionsRouter from './routes/sessions.router.js'
import logger from './middleware/logger.middleware.js'
import { connectAuto } from './config/db/connect.config.js'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import { initPassport } from './config/auth/passport.config.js'

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use(cookieParser('super_clave'));


const startServer = async () => {

    await connectAuto();

    const store = MongoStore.create({
        client: (await import("mongoose")).default.connection.getClient(),
        ttl: 60 * 60,
    })

    app.use(
        session({
            secret: process.env.SESSION_SECRET || "super_clave",
            resave: false,
            saveUninitialized: false,
            store,
            cookie: {
                maxAge: 1 * 60 * 60 * 1000, 
                httpOnly: true,
            },
        })
    );

    initPassport();
    app.use(passport.initialize());

    // ROUTERS
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
    app.use('/carts', cartsRouter);
    app.use('/products', productsRouter);
    app.use('/sessions', sessionsRouter);
    

    app.use((req, res) => {
        res.status(404).json({ error: "Page not fount.!" });
    })

    app.listen(PORT, () => console.log(`🤖 icoremar Server 👂 listening on http://localhost:${PORT}`));
};


await startServer();