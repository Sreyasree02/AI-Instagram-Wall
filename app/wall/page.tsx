"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WallPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const posts = [
    {
      title: "Nature Reel",
      tag: "nature",
      image: "/images/reel1.jpg",
    },
    {
      title: "Travel Reel",
      tag: "travel",
      image: "/images/reel2.jpg",
    },
    {
      title: "Food Reel",
      tag: "food",
      image: "/images/reel3.jpg",
    },
  ];

  const filteredPosts =
    search === ""
      ? posts
      : posts.filter((post) =>
          post.tag.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#E1306C",
          marginBottom: "30px",
        }}
      >
        AI Instagram Wall
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search hashtag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => router.push(`/wall?tag=${search}`)}
          style={{
            padding: "10px 20px",
            background: "#E1306C",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredPosts.map((item, index) => (
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
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3>{item.title}</h3>
              <p>#{item.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}