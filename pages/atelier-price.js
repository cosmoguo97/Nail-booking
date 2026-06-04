import Link from "next/link";

export default function AtelierPrice() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <Link href="/" style={styles.back}>← HOME</Link>

        <h1>atelier NAILBUG 价格表</h1>

        <h2>套餐 / Ritual</h2>
        <Price name="基础设计 Basic Design" price="¥368+" note="纯色 / 单色整地 / 简单手绘" />
        <Price name="设计款 Design Set" price="¥528+" note="跳色 / 饰品基础款 / 惊喜手绘" />
        <Price name="全手设计 Full Art" price="¥698+" note="高复杂度定制手绘 / 手工雕饰 / 手作饰品" />

        <h2>加项 / Add-ons</h2>
        <Price name="手工雕饰" price="¥50–200 / 每指" />
        <Price name="饰品 / gems" price="¥20–100 / 每指" />
        <Price name="复杂手绘" price="¥50起 / 每指" />
        <Price name="特殊甲型" price="¥30–100 / 每指" />
        <Price name="超长费" price="¥100–150 / 全手" />

        <h2>服务 / Service</h2>
        <Price name="单指延长" price="¥20 / 每指" />
        <Price name="全手延长" price="¥200 / 全手" />
        <Price name="卸甲重做" price="¥68 / 全手" />
        <Price name="甲片建构" price="¥128 / 全手" />
        <Price name="卸甲" price="¥20–100" />

        <p style={styles.note}>
          PS：在您选择预约后，我会根据您的手部风格和喜爱的颜色为您设计。
          我将充分发挥我的审美，旨在带给您独特、完整的美甲体验。
        </p>
      </section>
    </main>
  );
}

function Price({ name, price, note }) {
  return (
    <div style={styles.row}>
      <strong>{name}</strong>
      <span>{price}</span>
      {note && <small>{note}</small>}
    </div>
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
    background: "#F3E4C2",
    border: "3px solid #000",
    padding: 32,
  },
  back: {
    color: "#000",
    textDecoration: "none",
    fontWeight: "bold",
  },
  row: {
    borderBottom: "1px dashed #000",
    padding: "14px 0",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 10,
  },
  note: {
    marginTop: 28,
    lineHeight: 1.8,
  },
};
