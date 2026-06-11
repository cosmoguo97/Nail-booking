import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Millennium Bug Palace</title>
      </Head>

      <main style={styles.page}>
        <section style={styles.card}>
          <img
            src="/bugpalacesmall.png"
            alt="Millennium Bug Palace"
            style={styles.logo}
          />
        // <p style={styles.subtitle}>
        
        //     线上预约/价格表/品牌介绍

        // </p>
          <h1 style={styles.mainTitle}>Millennium Bug Palace</h1>

 

          <div style={styles.brandGrid}>
            <div style={styles.nailbugBlock}>
              <h2 style={styles.brandTitle}>atelier NAILBUG</h2>
              <p style={styles.brandText}>
                Original Design Nails
                <br />
               潮流个性美甲服务
              </p>
            </div>

            <div style={styles.salonBlock}>
              <h2 style={styles.brandTitle}>MBP STUDIO</h2>
              <p style={styles.brandText}>
               Healthy Nail Care / Daily Elegance
                <br />
                日系沙龙通勤美甲服务
              </p>
            </div>
          </div>

          <div style={styles.menu}>
            <MenuButton href="/booking" text="预约美甲 / BOOKING" />
      <MenuButton href="/atelier-price" text="价格表 / atelier NAILBUG Pricing" />
<MenuButton href="/salon-price" text="价格表 / MBP Salon Pricing" />
            <MenuButton href="/about" text="品牌介绍 / ABOUT" />
            <MenuButton href="/policy" text="注意事项 / POLICY" />
            <MenuButton href="/contact" text="联系方式 / CONTACT" />
          </div>
        </section>
      </main>
    </>
  );
}

function MenuButton({ href, text }) {
  return (
    <Link href={href} style={styles.button}>
      {text}
    </Link>
  );
}

const styles = {
page: {
  minHeight: "100vh",
  background: "#FF13F0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
  fontFamily: "'DotGothic16', monospace",
},

  card: {
    width: "90vw",
    maxWidth: 820,
    background: "#D3D3D3",
    border: "3px solid #000",
    padding: 32,
    textAlign: "center",
    boxSizing: "border-box",
  },

  logo: {
    width: "100%",
    maxWidth: 520,
    marginBottom: 20,
  },

  mainTitle: {
    fontSize: 36,
    background: "#fff",
    border: "2px solid #000",
    padding: 12,
    margin: "0 0 16px",
    letterSpacing: "2px",
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 28,
  },

  brandGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginBottom: 28,
  },

  nailbugBlock: {
    background: "#ffb6e8",
    border: "3px solid #000",
    padding: 18,
  },

  salonBlock: {
    background: "#01FF01",
    border: "3px solid #000",
    padding: 18,
  },

  brandTitle: {
    fontSize: 24,
    margin: "0 0 10px",
  },

  brandText: {
    fontSize: 14, 
    lineHeight: 1.6,
    margin: 0,
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  button: {
    display: "block",
    background: "#fff",
    color: "#000",
    border: "3px solid #000",
    padding: "18px 12px",
    textDecoration: "none",
    fontSize: 20,
    fontWeight: "bold",
  },
};
