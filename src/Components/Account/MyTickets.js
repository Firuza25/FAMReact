import React, { useContext, useState, useEffect } from "react";
import { context } from "../../App";
import axios from "axios";
import { List, Card, message, Button, Modal, InputNumber } from "antd";


const MyTickets = () => {
    const {activeUser, isLoggedIn} = useContext(context)
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null); // To track ticket for return
    const [returnQuantity, setReturnQuantity] = useState(1); 
    const [returnModalVisible, setReturnModalVisible] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!isLoggedIn) {
        message.error("Please log in to view your tickets.");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3031/users/${activeUser.id}`);
        const userData = response.data;
        const userBookings = userData?.data?.bookings || {};
        const ticketArray = Object.values(userBookings);

        // Fetch detailed ticket information
        const detailedTickets = await Promise.all(
          ticketArray.map(async (ticket) => {
            try {
              const eventResponse = await axios.get(ticket.ticket); // Fetch event details using the ticket URL
              return {
                ...ticket,
                eventTitle: eventResponse.data.title, // Add the event title
              };
            } catch (error) {
              console.error(`Error fetching event details for ${ticket.ticket}:`, error);
              return { ...ticket, eventTitle: "Event not found" };
            }
          })
        );

        setTickets(detailedTickets);
        
      } catch (error) {
        console.error("Error fetching tickets:", error);
        message.error("Failed to load tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [activeUser]);


  const handleReturnTicket = async () => {
    if (!selectedTicket) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3031/users/${activeUser.id}`);
      const userData = response.data;

      const bookings = userData.data?.bookings || {};
      const bookingId = Object.keys(bookings).find(
        (key) => bookings[key].ticket === selectedTicket.ticket
      );

      if (bookingId) {
        if (selectedTicket.quantity - returnQuantity > 0) {
          // Update quantity
          bookings[bookingId].quantity -= returnQuantity;
        } else {
          // Remove the booking
          delete bookings[bookingId];
        }

        // Update user data on the server
        await axios.patch(`http://localhost:3031/users/${activeUser.id}`, {
          data: { bookings },
        });

        // Update local state
        const updatedTickets = selectedTicket.quantity - returnQuantity > 0
          ? tickets.map((ticket) =>
              ticket.ticket === selectedTicket.ticket
                ? { ...ticket, quantity: ticket.quantity - returnQuantity }
                : ticket
            )
          : tickets.filter((ticket) => ticket.ticket !== selectedTicket.ticket);

        setTickets(updatedTickets);
        message.success("Ticket(s) returned successfully!");
      }
    } catch (error) {
      console.error("Error returning tickets:", error);
      message.error("Failed to return tickets.");
    } finally {
      setLoading(false);
      setReturnModalVisible(false);
      setSelectedTicket(null);
      setReturnQuantity(1);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Tickets</h1>
      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length > 0 ? (
        <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={tickets}
        renderItem={(ticket, index) => {
            return <div>
                <List.Item>
            <Card title={`Booking #${index + 1}`}
             >
              <p><strong>Event:</strong> {ticket.eventTitle}</p>
              <p><strong>Booking Date:</strong> {ticket.bookdate}</p>
              <p><strong>Booking Time:</strong> {ticket.bookTime}</p>
              <p><strong>Quantity:</strong> {ticket.quantity}</p>
              <Button
                    type="primary"
                    danger
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setReturnModalVisible(true);
                    }}
                  >
                    Return Tickets
                  </Button>
            </Card>
          </List.Item>
         
                
            </div>
          
          
        }}
      />
      ) : (
        <p>No tickets found.</p>
      )}
       <Modal
        title="Return Ticket"
        visible={returnModalVisible}
        onOk={handleReturnTicket}
        onCancel={() => setReturnModalVisible(false)}
        okText="Return"
        cancelText="Cancel"
      >
        <p>
          How many tickets would you like to return? You have{" "}
          <strong>{selectedTicket?.quantity}</strong> tickets.
        </p>
        <InputNumber
          min={1}
          max={selectedTicket?.quantity || 1}
          value={returnQuantity}
          onChange={(value) => setReturnQuantity(value)}
        />
      </Modal>
    </div>
  );

}

export default MyTickets