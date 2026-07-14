"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function ReelPage() {
  const params = useParams();

  const [wall, setWall] = useState<any>(null);
const [posts, setPosts] = useState<any[]>([]);

useEffect(() => {
  const loadWall = async () => {
    const wallDoc = await getDoc(doc(db, "walls", params.id as string));

    if (!wallDoc.exists()) return;

    const wallData = wallDoc.data();
    setWall(wallData);

    const reelsSnapshot = await getDocs(collection(db, "reels"));

    const reels = reelsSnapshot.docs
      .map(doc => doc.data())
      .filter(reel => reel.tag === wallData.hashtag);

    setPosts(reels);
  };

  loadWall();
}, [params.id]);
  if (!wall) {
  return <h1 style={{ padding: 30 }}>Loading...</h1>;
}


  return (
    <main style={{ padding: "30px" }}>
      <h1>{wall.title}</h1>
      <h2>#{wall.hashtag}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
<div style={{ padding: "15px" }}>
  <h3>{post.title}</h3>

  <p style={{ color: "#666" }}>
    @{post.username}
  </p>

  <p>
    #{post.tag}
  </p>

  <p
  style={{
    marginTop: "10px",
    color: "#444",
    lineHeight: "1.6",
  }}
>
  {post.aiText || post.caption}
</p>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: "15px",
      fontWeight: "bold",
    }}
  >
    <span>❤️ {post.likes}</span>
    <span>💬 {post.comments}</span>
    <span>📤 {post.shares}</span>
  </div>
</div>
            
          </div>
        ))}
      </div>
    </main>
  );
}