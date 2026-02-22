import React, { useState } from "react";
import axios from "axios";

export default function Details() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // handle file select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // handle upload
 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("file", file); // your selected file state

  try {
    const response = await axios.post("http://localhost:8000/api/doc-to-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // for pdf download
    });

    // success → download file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();

    alert("File converted successfully ✅");

  } catch (error) {
    console.log(error);

    // Laravel error message
    if (error.response) {
      alert("Error: " + (error.response.data.error || "Something failed"));
    } else {
      alert("Server not responding");
    }
  }
};

  return (
    <div>
      <h1>Doc to PDF</h1>

      <form onSubmit={handleSubmit} >
        <table className="table">
          <tbody>
            <tr>
              <td>Choose Doc File</td>
              <td>
                <input
                  type="file"
                  name="file"
                  accept=".doc,.docx"
                  onChange={handleFileChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <input type="submit" value="Upload" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}