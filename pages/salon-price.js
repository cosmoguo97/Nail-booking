import Link from "next/link";

export default function SalonPrice() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <Link href="/" style={styles.back}>← HOME</Link>

        <h1>MBP Nail Salon 价格表</h1>

        <h2>甘皮护理</h2>
        <Price name="温和甘皮护理" price="¥88" />
        <Price name="基础甘皮护理" price="¥168" />
        <Price name="俄式精细甘皮护理" price="¥228" />

        <h2>美甲款式</h2>
        <Price name="单色国产胶" price="¥88" />
        <Price name="单色进口胶" price="¥188" />
        <Price name="猫眼国产胶" price="¥138" />
        <Price name="猫眼进口胶" price="¥238" />
        <Price name="超水润猫眼款" price="¥288" />
        <Price name="海莉甲" price="¥268" />
        <Price name="日系 nuance 晕染" price="¥238–368" />
        <Price name="日系简约通勤款" price="¥188–218" />
        <Price name="日系精致优雅设计款" price="¥268–328" />
        <Price name="日系 premium 设计款" price="¥328–428" />
        <Price name="本季精选特惠款" price="¥228" />

        <h2>建构塑形</h2>
        <Price name="本甲微建构" price="¥48" />
        <Price name="本甲建构" price="¥68" />
        <Price name="甲片建构" price="¥188" />
        <Price name="甲片二次利用" price="¥208" />

        <h2>延长</h2>
        <Price name="Gel X 高级建构延长" price="¥268" />
        <Price name="甲膜延长" price="¥288" />
        <Price name="浅贴延长" price="¥188" />

        <h2>卸甲 / 护理</h2>
        <Price name="本店作品卸甲" price="¥30" />
        <Price name="他店作品卸甲" price="¥50" />
        <Price name="单卸甲" price="¥100" />
        <Price name="手部护理" price="¥88" />

        <p style={styles.note}>
          本工作室需提前预约，预约需支付 ¥50 定金。取消预约需提前一天。
          普通甲 10 天内免费修补，薄软甲 7 天内免费修补。
        </p>
      </section>
    </main>
  );
}

function Price({ name, price }) {
  return (
    <div style={styles.row}>
      <strong>{name}</strong>
      <span>{price}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#AFC2A9",
    padding: 24,
    fontFamily: "monospace",
  },
  card: {
    maxWidth: 900,
    margin: "0 auto",
    background: "rgba(255,255,255,0.75)",
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
