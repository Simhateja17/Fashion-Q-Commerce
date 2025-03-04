import axios from 'axios';

export async function placeOrder(cartItems, userId) {
  try {
    const orderData = {
      order_id: `ORDER-${Date.now()}`,
      user_id: userId,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total_price: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      status: "Pending",
    };

    const response = await axios.post("http://localhost:5000/create-order", orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
}
