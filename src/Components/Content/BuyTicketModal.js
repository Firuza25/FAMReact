import React, { memo, useContext, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Modal, Button, InputNumber, Select, DatePicker, message } from "antd";
import useConfig from "antd/es/config-provider/hooks/useConfig";
import { context } from "../../App";


const BuyTicketModal = memo(({visible, setVisible, ticketDetails, isLoggedIn}) => {
    const {activeUser} = useContext(context)
    
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const handleBuyTicket = async () => {
        console.log("Handling buy ticket: isLoggedIn: ", isLoggedIn, ", Active user: ", activeUser, ", ticket picked: ", ticketDetails)
        if (!isLoggedIn) {
          alert("Please log in to book tickets!");
          return;
        }
    
        try {
          // Construct the booking data
          const bookingId = new Date().getTime(); // Unique ID based on timestamp
          const newBooking = {
            [bookingId]: {
              ticket: `http://localhost:3031/${ticketDetails.category}/${ticketDetails.id}`,
              bookdate: new Date().toISOString().split('T')[0], // Current date
              bookTime: dayjs().format('HH:mm:ss'),
              quantity: ticketQuantity,
            },
          };
    
          // Fetch the current user's data
          const userResponse = await axios.get(
            `http://localhost:3031/users/${activeUser.id}`
          );
          const userData = userResponse.data;
          const currentData = userData.data || { bookings: {} };

          const currentBookings = userData?.data?.bookings || {};
    
          // Merge the new booking with existing bookings
          const updatedBookings = {
            ...currentBookings,
            ...newBooking,
          };
    
          // Update the user with the new bookings data
          await axios.patch(`http://localhost:3031/users/${activeUser.id}`, {
            data: {
              ...currentData,
              bookings: updatedBookings,
            },
          });
    
          message.success("Tickets booked successfully!");
          setVisible(false);
        } catch (error) {
          console.error("Error booking tickets:", error);
          message.error("Failed to book tickets.");
        }
      };
    

    const incrementTickets = () => setTicketQuantity((prev) => prev + 1);
    const decrementTickets = () =>
    setTicketQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div>
            <Modal 
            title="Buy Tickets"
            visible={visible}
            onOk={handleBuyTicket}
            onCancel={() => setVisible(false)}
            okText="Book Now"
            cancelText="Cancel" >
                <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: 8 }}>Number of Tickets:</label>
          <Button
            type="primary"
            onClick={decrementTickets}
            disabled={ticketQuantity === 1}
          >
            -
          </Button>
          <div
            style={{
              margin: "0 16px",
              display: "inline-block",
              width: "40px",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {ticketQuantity}
          </div>
          <Button type="primary" onClick={incrementTickets}>
            +
          </Button>
        </div>

            </Modal>
        </div>
    )

})

export default BuyTicketModal