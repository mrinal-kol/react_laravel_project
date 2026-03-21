import React, { useState } from "react";
import axios from "axios";

export default function Details({ payment }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleEdit = async (id) => {
    try {
      const response = await axios.post("/payments/fetch", { id });
      setSelectedPayment(response.data.payment);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const renderBankResponse = (bankResponse) => {
    try {
      const data = JSON.parse(bankResponse);
      return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ fontWeight: 600, padding: "6px 8px", width: "40%" }}>{key}</td>
                <td style={{ padding: "6px 8px" }}>{value || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } catch (e) {
      return <p>Invalid bank response</p>;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payment.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.order_id}</td>
              <td>{item.amount}</td>
              <td style={{ color: item.status === "success" ? "green" : "red" }}>{item.status}</td>
              <td>
                <button
                  style={{
                    padding: "5px 12px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => handleEdit(item.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedPayment && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 9999
          }}
          onClick={handleClose} // click outside closes
        >
          <div
            style={{
              background: "#fff",
              padding: "20px 30px",
              borderRadius: "8px",
              width: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* <h2 style={{ marginBottom: "15px" }}>Payment Details (ID: {selectedPayment.id})</h2> */}
             <h2 style={{ marginBottom: "15px" }}>Payment Details </h2>

            <div style={{ marginBottom: "15px" }}>
              <p><strong>Order ID:</strong> {selectedPayment.order_id}</p>
              <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
              <p><strong>Status:</strong> <span style={{ color: selectedPayment.status === "success" ? "green" : "red" }}>{selectedPayment.status}</span></p>
              <p><strong>Created At:</strong> {selectedPayment.created_at}</p>
              <p><strong>Updated At:</strong> {selectedPayment.updated_at}</p>
            </div>

            <h3 style={{ marginBottom: "10px" }}>Bank Response</h3>
            <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "10px", background: "#fafafa" }}>
              {renderBankResponse(selectedPayment.bank_response)}
            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                onClick={handleClose}
                style={{
                  padding: "6px 15px",
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}