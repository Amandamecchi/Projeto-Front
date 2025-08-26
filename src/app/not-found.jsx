
export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}>
      <h1 style={{ margin: "32px 0" }}>Página não Encontrada</h1>  
      <p style={{ fontSize: "18px", color: "#666" }}>
        Desculpe, a página que você está procurando não existe.
      </p>   
      <p style={{ fontSize: "90px", color: "black", fontWeight: "bold", margin: "20px 0" }}>
        404
      </p>   
      <a 
        href="/" 
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          background: "pink",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Voltar para a HomePage
      </a>
    </div>
  );
}