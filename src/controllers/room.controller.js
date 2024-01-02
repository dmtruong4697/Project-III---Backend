import RoomModel from "../models/Room.js";

const createRoom = async(req, res) => {
    try {
        const { name, description, imageUrl, seats, seatCount, createAt } = req.body;
        const publisherId = req.id;

        const newRoom = new RoomModel({
            name,
            publisherId,
            description,
            imageUrl,
            seats,
            seatCount,
            createAt,
          });

      
          await newRoom.save();
          res.status(201).json({ message: 'Room created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the room' });
    }
}

const getAllRoom = async(req, res) => {
    try {
        const publisherId = req.id; 
        const rooms = await RoomModel.find({
            publisherId : publisherId,
        })

          res.status(200).json({ 
            message: 'Get rooms successfully' ,
            rooms: rooms,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while getting rooms' });
    }
}

const getRoomDetail = async(req, res) => {
    try {
        const publisherId = req.id; 
        const roomId = req.body.roomId;

        const room = await RoomModel.findOne({
            publisherId : publisherId,
            _id: roomId,
        })

          res.status(200).json({ 
            message: 'Get room detail successfully' ,
            room: room,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while getting room' });
    }
}

const updateRoom = async (req, res) => {
    try {
      const publisherId = req.id;
      const { roomId, updatedData } = req.body;
  
      const updatedRoom = await RoomModel.findOneAndUpdate(
        {
          publisherId: publisherId,
          _id: roomId,
        },
        { $set: updatedData },
        { new: true } // return the updated document
      );
  
      res.status(200).json({
        message: 'Update room successfully',
        room: updatedRoom,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating room' });
    }
  };

const deleteRoom = async(req, res) => {
    try {
        const publisherId = req.id; 
        const roomId = req.body.roomId;

        await RoomModel.deleteOne({
            publisherId : publisherId,
            _id: roomId,
        })

          res.status(200).json({ 
            message: 'Dlete room successfully' ,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while delete room' });
    }
}

export {createRoom, getAllRoom, getRoomDetail, deleteRoom, updateRoom};