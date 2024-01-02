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
              ticket.ticketList[i].status = "SOLD";
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
  
  export { userBuyTicket };
  