import { useState } from "react";
import axios from "axios";

function App() {
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  const uploadVideo = async () => {
    if (!video) {
      setMessage("Please select a video");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage("Upload failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Video Upload</h1>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadVideo}>
        Upload Video
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;