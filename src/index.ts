import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { TransactionRouter } from './router/transaction.router';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/api', new TransactionRouter().routes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

export default app;
