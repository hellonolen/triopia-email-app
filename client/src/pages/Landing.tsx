import { APP_LOGO, APP_TITLE } from "@/const";

export default function Landing() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      background: "#FFFBF7",
      padding: "24px"
    }}>
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <h1 style={{ 
          fontSize: "48px", 
          fontWeight: 300, 
          color: "#2A2A2A", 
          marginBottom: "16px",
          letterSpacing: "-0.02em"
        }}>
          {APP_TITLE}
        </h1>
        <p style={{ 
          fontSize: "18px", 
          color: "#666", 
          marginBottom: "32px",
          lineHeight: "1.6"
        }}>
          Welcome to your new chapter
        </p>
        <a 
          href="/app"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "#D89880",
            color: "#FFF",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: 500,
            transition: "opacity 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          Launch App
        </a>
      </div>
      <footer style={{ 
        position: "absolute", 
        bottom: "24px", 
        fontSize: "12px", 
        color: "#999" 
      }}>
        © 2025 Triopia. All rights reserved.
      </footer>
    </div>
  );
}
