"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function AdminPage() {
  const [hashtag, setHashtag] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const generateLink = async () => {
  try {
    if (!hashtag.trim()) {
      alert("Please enter a hashtag");
      return;
    }

    const wallId = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    await setDoc(doc(db, "walls", wallId), {
      hashtag,
      title: `${hashtag} Wall`,
      createdAt: new Date(),
    });

    const url = `${window.location.origin}/reel/${wallId}`;

    setGeneratedUrl(url);

    alert("Wall created successfully!");
  } catch (err) {
    console.error("Firestore Error:", err);
    alert("Firestore save failed. Press F12 and check the Console.");
  }
};
    return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          AI Instagram Wall Admin
        </h1>

        <p>Enter Hashtag</p>

        <input
          type="text"
          placeholder="Example: hackathon"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={generateLink}
          style={{
            width: "100%",
            padding: "12px",
            background: "#e1306c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Generate Public Link
        </button>
                {generatedUrl && (
          <>
            <p style={{ marginTop: "20px", fontWeight: "bold" }}>
              Generated Public URL
            </p>

            <input
              type="text"
              value={generatedUrl}
              readOnly
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
              }}
            />

            <button
              onClick={() => navigator.clipboard.writeText(generatedUrl)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "12px",
                background: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Copy URL
            </button>
          </>
        )}
      </div>
    </main>
  );
}