import express from 'express';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const EVENTS = [
    {
        id: 1,
        title: "Tech Conference 2024",
        date: "2024-12-10",
        time: "09:00 AM",
        description: "A conference about the latest technology innovations.",
        location: "Bangalore International Convention Centre, Bangalore"
    },
    {
        id: 2,
        title: "Web Development Bootcamp",
        date: "2024-12-12",
        time: "10:00 AM",
        description: "Learn the fundamentals of web development in this bootcamp.",
        location: "T-Hub, Hyderabad"
    },
    {
        id: 3,
        title: "Marketing Summit 2024",
        date: "2024-12-15",
        time: "11:00 AM",
        description: "A summit for marketing professionals to discuss trends and strategies.",
        location: "India Habitat Centre, New Delhi"
    },
    {
        id: 4,
        title: "AI & Machine Learning Workshop",
        date: "2024-12-18",
        time: "02:00 PM",
        description: "Hands-on workshop for beginners to explore AI and machine learning.",
        location: "IIT Madras Research Park, Chennai"
    },
];


app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running"
    });
});


app.get("/events", (req, res) => {
    res.json({
        success: true,
        data: EVENTS,
        message: "Events data fetched successfully"
    });
});


app.post("/events", (req, res) => {
    const { id, title, date, time, description, location } = req.body;

    if (!id || !title || !date || !time || !description || !location) {
        return res.json({
            success: false,
            message: "All fields (id, title, date, time, description, location) are required"
        });
    }

    const existingEvent = EVENTS.find((event) => event.id == id);

    if (existingEvent) {
        return res.json({
            success: false,
            message: "Event with this ID already exists"
        });
    }

    const newEvent = {
        id,
        title,
        date,
        time,
        description,
        location
    };

    EVENTS.push(newEvent);

    res.status(201).json({
        success: true,
        message: "Event added successfully",
        data: newEvent
    });
});

app.delete("/events/:id", (req, res) => {
    const { id } = req.params;

    const eventIndex = EVENTS.findIndex((event) => event.id == id);

    if (eventIndex == -1) {
        return res.json({
            success: false,
            message: "Event not found"
        });
    }

    EVENTS.splice(eventIndex, 1);

    res.json({
        success: true,
        message: "Event deleted successfully"
    });
});

app.put("/events/:id", (req, res) => {
    const { id } = req.params;
    const { title, date, time, description, location } = req.body;

    const eventIndex = EVENTS.findIndex((event) => event.id == id);

    if (eventIndex == -1) {
        return res.json({
            success: false,
            message: "Event not found"
        });
    }

    const updatedEvent = {
        id: Number(id), 
        title,
        date,
        time,
        description,
        location
    };

    EVENTS[eventIndex] = updatedEvent;

    res.json({
        success: true,
        data: updatedEvent,
        message: "Event updated successfully"
    });
});

app.patch("/events/location/:id", (req, res) => {
    const { id } = req.params;
    const { location } = req.body;

    const eventIndex = EVENTS.findIndex((event) => event.id == id);

    if (eventIndex == -1) {
        return res.json({
            success: false,
            message: "Event not found"
        });
    }

    EVENTS[eventIndex].location = location;

    res.json({
        success: true,
        data: EVENTS[eventIndex],
        message: "Event location updated successfully"
    });
});
app.get("/events/:id", (req, res) => {
    const { id } = req.params;  

    const eventIndex = EVENTS.findIndex((event) => event.id == id);

    if (eventIndex == -1) {
        return res.json({
            success: false,
            message: "Event not found"
        });
    }

    const event = EVENTS[eventIndex];  
    res.json({
        success: true,
        data: event,
        message: "Event fetched successfully"
    });
});


app.get('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "Invalid route"
    });
});
