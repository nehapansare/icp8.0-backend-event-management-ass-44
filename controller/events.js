
import {EVENTS} from '../data/data.js';


const getEvents =(req, res) => {
    res.json({
        success: true,
        data: EVENTS,
        message: "Events data fetched successfully"
    });
}

const postEvents = (req, res) => {
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
}

const deleteEvents = (req, res) => {
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
}

const putEvents = (req, res) => {
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
}
const patchEvents = (req, res) => {
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
}
const getEvent =(req, res) => {
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
}



export{
    getEvents
    ,postEvents,
       deleteEvents,
       putEvents,
       patchEvents,
       getEvent
}