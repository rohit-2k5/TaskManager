import 'dotenv/config'

import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import tasksRouter from "./src/routes/tasks.js";

const app = express();
const port = process.env.PORT || 3001;
const DatabaseUri = process.env.DB_URL;

if (!DatabaseUri) {
	console.error("Missing DB_URL in environment. Set it in backend/.env");
	process.exit(1);
}

// cors setup 
const allowedOrigins = [
	"http://localhost:5173",
	"https://taskmanager-ncvb.onrender.com"
];

const corsOptions = {
	origin: function(origin, callback) {
		// allow requests with no origin (e.g., curl, server-to-server)
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ["GET", "POST", "PATCH", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// database connection 
const connectDB = async() => {
	try{
		await mongoose.connect(DatabaseUri);
		console.log("DB connected");
	}
	catch(e){
		console.error(`error in database connection ${e}`);
		process.exit(1);
	}
}

connectDB();

// routes
app.use('/tasks', tasksRouter);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ error: 'Not found' });
});

// error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(port , ()=>{
	console.log(`app started at port ${port}`)
})