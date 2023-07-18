import express from 'express';
import cors from 'cors';
import connectDB from './database/db.js';
import adminRoutes from './routes/adminRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import expedientRoutes from './routes/expedientRoutes.js';

const app = express();
app.use(express.json());

connectDB();

const allowedDomains = [process.env.PROD_FRONTEND_URL, DEV_FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedDomains.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Dominio no permitido por CORS'))
        }
    },
};

app.use(cors(corsOptions));

app.use("/api/admin", adminRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/expedients", expedientRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});