import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>atelier NAILBUG @ Millennium Bug Palace</title>
      </Head>

      <main style={styles.page}>
        <section style={styles.card}>
          <img src="/mbplogort.png" alt="Millennium Bug Palace" style={styles.logo} />

          <h1 style={styles.title}>atelier NAILBUG</h1>
          <p style={styles.subtitle}>@ Millennium Bug Palace</p>

          <div style={styles.menu}>
            <MenuButton href="/index" text="预约美甲 / BOOKING" />
            <MenuButton href="/atelier-price" text="atelier NAILBUG 价格表" />
            <MenuButton href="/salon-price" text="MBP Salon 价格表" />
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
    background: "#f576ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    fontFamily: "monospace",
  },
  card: {
    width: "90vw",
    maxWidth: 760,
    background: "#D3D3D3",
    border: "3px solid #000",
    padding: 32,
    textAlign: "center",
  },
  logo: {
    width: "100%",
    maxWidth: 520,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    background: "#ffb6e8",
    border: "2px solid #000",
    padding: 12,
    margin: "0 0 12px",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 28,
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
