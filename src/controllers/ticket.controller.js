import EventModel from "../models/Event.js";
import UserModel from "../models/User.js";


const userBuyTicket = async (req, res) => {
    try {
      const eventId = req.body.eventId;
      const userId = req.id;
      const cart = req.body.cart;
  
      const event = await EventModel.findOne({
        _id: eventId,
      });

      const user = await UserModel.findById(req.id);
  
      let errorOccurred = false;
  
      cart.forEach(item => {
        event.tickets.forEach(ticket => {
          if (ticket._id == item.id) {
            const notSoldIndex = ticket.ticketList.findIndex(
              tl => tl.status === "NOT_SOLD"
            );
  
            if (notSoldIndex === -1) {
              errorOccurred = true;
              return;
            }
  
            for (let i = notSoldIndex; i < notSoldIndex + item.quantity; i++) {
              if (i >= ticket.ticketList.length) {
                errorOccurred = true;
                return;
              }
  
              ticket.ticketList[i].ownerId = userId;
              ticket.ticketList[i].status = "AVAILABLE";
              ticket.ticketList[i].eventId = eventId;
              ticket.ticketList[i].eventName = event.name;
              ticket.ticketList[i].publisherId = event.publisherId;
              ticket.ticketList[i].location = event.location;
              ticket.ticketList[i].eventImage = event.imageUrl;
              ticket.ticketList[i].startTime = event.startTime;
              //ticket.ticketList[i].room = 
              user.tickets = user.tickets.concat(ticket.ticketList[i]);
            }
          }
        });
      });
  
      if (errorOccurred) {
        return res.status(400).json({
          message: 'Not enough available tickets for the specified events',
        });
      }
  
      const updatedEvent = await EventModel.findOneAndUpdate(
        {
          _id: eventId,
        },
        { $set: event },
        { new: true } // trả về tài liệu đã cập nhật
      );

      const updatedUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
        },
        { $set: user },
        { new: true } 
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'Update event successfully',
        event: updatedEvent,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while updating event' });
    }
  };
  

  const getTicketDetail = async (req, res) => {
    try {
      const eventId = req.body.eventId;  
      const ticketId = req.body.ticketId;

      let check = 0;

      const event = await EventModel.findOne({
        _id: eventId,
      });

      for (let i = 0; i < event.tickets.length; i++) {
        for(let j = 0; j < event.tickets[i].ticketList.length; j++) {
          if(event.tickets[i].ticketList[j].id == ticketId){
            check = 1;
            res.status(200).json({
              message: 'Get ticket successfully',
              ticket: event.tickets[i].ticketList[j],
            });
          }
        }
      }

      if (check == 0) {
        return res.status(400).json({
          message: 'Ticket Not Found',
        });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while getting ticket' });
    }
  };

  const checkinTicket = async (req, res) => {
    try {
      const eventId = req.body.eventId;  
      const ticketId = req.body.ticketId;
      const ownerId = req.body.ownerId;

      let check = 0;

      const event = await EventModel.findOne({
        _id: eventId,
      });

      const owner = await UserModel.findOne({
        _id: ownerId,
      });

      for (let i = 0; i < event.tickets.length; i++) {
        for(let j = 0; j < event.tickets[i].ticketList.length; j++) {
          if(event.tickets[i].ticketList[j].id == ticketId){
            check = 1;
            event.tickets[i].ticketList[j].status = 'CHECKED_IN';
          }
        }
      }

      for (let i = 0; i < owner.tickets.length; i++) {
          if(owner.tickets[i].id == ticketId){
            check = 1;
            owner.tickets[i].status = 'CHECKED_IN';
          }
      }

      if (check == 0) {
        return res.status(400).json({
          message: 'Ticket Not Found',
        });
      }

      const updatedEvent = await EventModel.findOneAndUpdate(
        {
          _id: eventId,
        },
        { $set: event },
        { new: true } 
      );

      const updatedUser = await UserModel.findOneAndUpdate(
        {
          _id: ownerId,
        },
        { $set: owner },
        { new: true } 
      );

      res.status(200).json({
        message: 'Checked in successfully',
        event: updatedEvent,
        owner: updatedUser,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while checking in' });
    }
  };

  const cancelTicket = async (req, res) => {
    try {
      const eventId = req.body.eventId;  
      const ticketId = req.body.ticketId;
      const ownerId = req.body.ownerId;

      let check = 0;

      const event = await EventModel.findOne({
        _id: eventId,
      });

      const owner = await UserModel.findOne({
        _id: ownerId,
      });

      for (let i = 0; i < event.tickets.length; i++) {
        for(let j = 0; j < event.tickets[i].ticketList.length; j++) {
          if(event.tickets[i].ticketList[j].id == ticketId){
            check = 1;
            event.tickets[i].ticketList[j].status = 'NOT_AVAILABLE';
          }
        }
      }

      for (let i = 0; i < owner.tickets.length; i++) {
          if(owner.tickets[i].id == ticketId){
            check = 1;
            owner.tickets[i].status = 'NOT_AVAILABLE';
          }
      }

      if (check == 0) {
        return res.status(400).json({
          message: 'Ticket Not Found',
        });
      }

      const updatedEvent = await EventModel.findOneAndUpdate(
        {
          _id: eventId,
        },
        { $set: event },
        { new: true } 
      );

      const updatedUser = await UserModel.findOneAndUpdate(
        {
          _id: ownerId,
        },
        { $set: owner },
        { new: true } 
      );

      res.status(200).json({
        message: 'Checked in successfully',
        event: updatedEvent,
        owner: updatedUser,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while checking in' });
    }
  };

  export { userBuyTicket, getTicketDetail, checkinTicket, cancelTicket };
  