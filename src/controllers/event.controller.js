import EventModel from "../models/Event.js";
// import multer from "multer";
//import { bucket } from "../config/firebase.js";
import { storage } from "../config/firebase.js";
import { getDownloadURL, uploadBytes } from "firebase/storage";

const uploadImage = async (req, res) => {
  try {
    if (!req.image) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const storageRef = ref(storage, 'some-child');

    await uploadBytes(storageRef, req.image.buffer).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        res.status(200).json({ imageUrl: downloadURL });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading' });
  }
};

const createEvent = async(req, res) => {
    try {
        const { name, description, imageUrl, tags, ticketOpeningTime, ticketClosingTime, startTime, closeTime, location, tickets, roomIds } = req.body;
        const publisherId = req.id; 

        // const imageBuffer = Buffer.from(imageUrl, 'base64');

        const newEvent = new EventModel({
            name,
            publisherId,
            description,
            imageUrl,
            tags,
            ticketOpeningTime,
            ticketClosingTime,
            startTime,
            closeTime,
            location,
            tickets,
            roomIds,
          });
      
          await newEvent.save();
          res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the event' });
    }
}

const publisherGetAllEvent = async(req, res) => {
    try {
        const publisherId = req.id; 
        const events = await EventModel.find({
            publisherId : publisherId,
        })

          res.status(200).json({ 
            message: 'Get events successfully' ,
            events: events,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while getting events' });
    }
}

const getAllEvent = async (req, res) => {
    try {
      const events = await EventModel.find({});
      res.status(200).json({
        message: 'Get all events successfully',
        events: events,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while getting all events' });
    }
  };

  const getEventDetail = async (req, res) => {
    try {
      const eventId = req.body.eventId;  
      const event = await EventModel.findOne({
        _id: eventId,
      });
      res.status(200).json({
        message: 'Get event successfully',
        event: event,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while getting event' });
    }
  };
  
  const publisherGetEventDetail = async (req, res) => {
    try {
      const publisherId = req.id;
      const eventId = req.body.eventId;
  
      const event = await EventModel.findOne({
        publisherId: publisherId,
        _id: eventId,
      });
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.status(200).json({
        message: 'Get event detail successfully',
        event: event,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while getting event detail' });
    }
  };
  
  const publisherUpdateEvent = async (req, res) => {
    try {
      const publisherId = req.id;
      const eventId = req.body.eventId;
      const updatedData = req.body.updatedEvent;
  
      const updatedEvent = await EventModel.findOneAndUpdate(
        {
          publisherId: publisherId,
          _id: eventId,
        },
        { $set: updatedData },
        { new: true } // return the updated document
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.status(200).json({
        message: 'Update event successfully',
        event: updatedEvent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating event' });
    }
  };
  
  const publisherDeleteEvent = async (req, res) => {
    try {
      const publisherId = req.id;
      const eventId = req.body.eventId;
  
      const deletedEvent = await EventModel.findOneAndDelete({
        publisherId: publisherId,
        _id: eventId,
      });
  
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.status(200).json({
        message: 'Delete event successfully',
        event: deletedEvent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while delete event' });
    }
  };
  
  export {
    createEvent,
    getAllEvent,
    publisherGetAllEvent,
    getEventDetail,
    publisherGetEventDetail,
    publisherUpdateEvent,
    publisherDeleteEvent,
    uploadImage,
  };