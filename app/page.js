"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranscribe = async () => {
    if (!file) return alert("Select a file first.");
    setLoading(true);
    setTranscription("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setTranscription(data.text);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1>AudioScribe (Free)</h1>
      
      <div style={{ marginBottom: "20px", padding: "20px", border: "1px dashed #ccc" }}>
        <input 
          type="file" 
          accept="audio/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <p style={{ fontSize: "12px", color: "#666" }}>Max file size: 25MB (Groq Limit)</p>
      </div>

      <button 
        onClick={handleTranscribe} 
        disabled={loading}
        style={{
          padding: "10px 20px", 
          backgroundColor: loading ? "#ccc" : "#0070f3", 
          color: "white", 
          border: "none", 
          borderRadius: "5px",
          width: "100%"
        }}
      >
        {loading ? "Processing..." : "Transcribe Audio"}
      </button>

      {transcription && (
        <div style={{ marginTop: "30px" }}>
          <h3>Result:</h3>
          <textarea 
            value={transcription} 
            readOnly 
            style={{ width: "100%", height: "300px", padding: "10px" }}
          />
        </div>
      )}
    </div>
  );
  }
            
