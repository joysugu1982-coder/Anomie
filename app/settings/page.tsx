// "use client";

// import { useState, useEffect } from "react";

// export default function Settings() {
//   const [theme, setTheme] = useState("light");
//   const [size, setSize] = useState(16);

//   useEffect(() => {
//     document.documentElement.style.fontSize = size + "px";
//     document.body.dataset.theme = theme;
//   }, [size, theme]);

//   return (
//     <div className="page">
//       <h1>Settings</h1>

//       <h3>Theme</h3>
//       <button onClick={()=>setTheme("light")}>Light</button>
//       <button onClick={()=>setTheme("dark")}>Dark</button>

//       <h3>Text Size</h3>
//       <button onClick={()=>setSize(size + 2)}>Increase</button>
//       <button onClick={()=>setSize(size - 2)}>Decrease</button>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [textSize, setTextSize] = useState("text-normal");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedText = localStorage.getItem("textSize") || "text-normal";

    setTheme(savedTheme);
    setTextSize(savedText);

    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }

    document.body.classList.add(savedText);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");
  };

  const changeTextSize = (size: string) => {
    document.body.classList.remove(textSize);
    document.body.classList.add(size);

    setTextSize(size);
    localStorage.setItem("textSize", size);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Settings</h1>

        {/* Theme Toggle */}
        <div style={{ marginBottom: 30 }}>
          <h3 style={{ marginBottom: 10 }}>Theme</h3>
          <button className="auth-button" onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        {/* Text Size */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 10 }}>Text Size</h3>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="auth-button"
              style={{ padding: "10px" }}
              onClick={() => changeTextSize("text-small")}
            >
              A-
            </button>
            <button
              className="auth-button"
              style={{ padding: "10px" }}
              onClick={() => changeTextSize("text-normal")}
            >
              A
            </button>
            <button
              className="auth-button"
              style={{ padding: "10px" }}
              onClick={() => changeTextSize("text-large")}
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
