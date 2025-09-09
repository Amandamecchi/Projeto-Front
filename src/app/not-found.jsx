import Image from 'next/image';
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
                              <Image 
                                  src="/image/chapeu.jpg" 
                                  alt="Chapéu Seletor" 
                                  width={300}
                                  height={300}
                              />
      <p style={{ fontSize: "90px", color: "black", fontWeight: "bold", margin: "20px 0" }}>
        404
      </p>   
      <p style={{ fontSize: "18px", color: "#080808ff" }}>
        Desculpe, a página que você está procurando não existe.
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