"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function PublicWall() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";

 const [posts, setPosts] = useState<any[]>([]);

 useEffect(() => {
  const loadPosts = async () => {
    const snapshot = await getDocs(collection(db, "reels"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(data);
  };

  loadPosts();
}, []);

 const filteredPosts = posts.filter((post) => {
  const postTag = post.tag || post.hashtag || "";

  return postTag.toLowerCase() === tag.toLowerCase();
});
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "#f5f5f5",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#E1306C" }}>
        Public Instagram Reel
      </h1>

      <h2 style={{ textAlign: "center" }}>
        #{tag}
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item, index) => (
            <div
              key={index}
              style={{
                width: "300px",
                background: "white",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>
  <h3>{item.title}</h3>

  <p>{item.username}</p>

  <p>❤️ {item.likes}</p>

  <p>💬 {item.comments}</p>

  <p>📤 {item.shares}</p>

  <p>🤖 {item.aiText}</p>
</div>

</div>
))
        ) : (
          <h3>No reels found for #{tag}</h3>
        )}
      </div>
    </main>
  );
}