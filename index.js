import express from 'express';
import cors from 'cors'

import {getHealth} from './controller/health.js';
import { deleteEvents, getEvents, patchEvents, postEvents, putEvents ,getEvent } from './controller/events.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.get("/health",getHealth);


app.get("/events",getEvents );


app.post("/events",postEvents );

app.delete("/events/:id",deleteEvents );

app.put("/events/:id",putEvents );

app.patch("/events/location/:id", patchEvents);

app.get("/events/:id",getEvent);


app.get('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "Invalid route"
    });
});
