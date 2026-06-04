import Link from "next/link";

export default function About() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
   <Link href="/" style={styles.back}>
  ← HOME
</Link>

        <h1>atelier NAILBUG @ Millennium Bug Palace</h1>

    <p>
  atelier NAILBUG 是 Millennium Bug Palace 旗下的美甲创作项目，
  提供原创设计美甲、复古日系沙龙款式、私人个性定制与穿戴甲设计定制服务。
</p>

<p>
  MBP Salon 是 Millennium Bug Palace 旗下的健康日系美甲沙龙项目，
  提供原创流行日系沙龙美甲与私人定制通勤美甲，
  秉承前沿日系理念，宣传健康优雅美甲新风尚。
</p>

<p>
  Girls&apos; Bedroom 是 Millennium Bug Palace 旗下的美甲类 community art 项目。
</p>

        <p>
          我们重视指甲健康、整体质感与长期状态，希望呈现自然、干净、
          有审美品位，同时带有个人叙事感的美甲作品。
        </p>

        <p>
          主理人具备 Fine Art / Sculpture 艺术背景，并持有 JNA 国际美甲师认证。
        </p>

        <h2>我们的服务方向</h2>

        <ul>
          <li>原创私人定制美甲</li>
          <li>日系通勤与高级沙龙款</li>
          <li>复杂手绘、立体装饰、手作饰品</li>
          <li>穿戴甲设计与制作</li>
          <li>根据个人风格、服装、场合进行设计</li>
        </ul>

        <h2>Brand Note</h2>

        <p>
          我们不追求完全复制他人作品，而是根据您的偏好、手型、生活习惯与预算，
          重新设计更适合您的美甲方案。
        </p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f576ea",
    padding: 24,
    fontFamily: "monospace",
  },
  card: {
    maxWidth: 900,
    margin: "0 auto",
    background: "#D3D3D3",
    border: "3px solid #000",
    padding: 32,
    lineHeight: 1.9,
    fontSize: 18,
  },
  back: {
    color: "#000",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
