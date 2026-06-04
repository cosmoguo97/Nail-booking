import Link from "next/link";
import Head from "next/head";

export default function Policy() {
  return (
    <>
      <Head>
        <title>Policy / 预约须知</title>
      </Head>

      <main style={styles.page}>
        <section style={styles.card}>
          <Link href="/" style={styles.back}>
            ← HOME
          </Link>

          <h1 style={styles.title}>Policy / 预约须知</h1>

          <PolicyBlock title="Booking / 预约方式">
            本工作室采用预约制服务。请提前选择品牌、套餐、日期与时间，并填写姓名和联系方式。
          </PolicyBlock>

          <PolicyBlock title="Brand & Service / 品牌与服务">
            atelier NAILBUG 主要提供原创设计、私人定制、复杂手绘与穿戴甲设计服务。
            MBP Salon 主要提供日系沙龙款、通勤款、健康护理与日常优雅美甲服务。
          </PolicyBlock>

          <PolicyBlock title="Original Design / 原创设计">
            atelier NAILBUG 以原创设计为主。欢迎提供参考图片、颜色、风格或氛围关键词，
            但本店不提供对其他美甲师作品的 100% 复刻服务。
          </PolicyBlock>

          <PolicyBlock title="Time / 服务时间">
            不同套餐所需时间不同。延长服务会在原套餐基础上增加约 1 小时。
            若实际设计复杂度超过原预约范围，服务时间与费用可能会相应调整。
          </PolicyBlock>

          <PolicyBlock title="Cancellation / 取消预约">
            如需取消或更改预约，请尽量提前 24 小时联系。预约当天取消或无故未到，
            可能会影响后续预约资格。
          </PolicyBlock>

          <PolicyBlock title="Late Arrival / 迟到说明">
            迟到 15 分钟以内，服务内容可能根据剩余时间进行调整。
            迟到超过 15 分钟，预约可能需要改期或取消。
          </PolicyBlock>

          <PolicyBlock title="Warranty / 保修说明">
            正常甲保修期为 7–14 天；薄软甲、易翘甲或特殊甲型保修期为 7–10 天。
            超过保修期后的翘起、缝隙、脱落或结构变化，通常属于指甲自然生长与使用习惯导致的正常现象。
          </PolicyBlock>

          <PolicyBlock title="Nail Health / 指甲健康">
            本店重视指甲健康、长期状态与佩戴舒适度。我们会根据您的指甲状态选择合适的护理与建构方式。
          </PolicyBlock>

          <PolicyBlock title="Final Note / 最终说明">
            提交预约即代表您已阅读并理解以上预约须知。感谢您的理解与配合。
          </PolicyBlock>
        </section>
      </main>
    </>
  );
}

function PolicyBlock({ title, children }) {
  return (
    <div style={styles.block}>
      <h2 style={styles.blockTitle}>{title}</h2>
      <p style={styles.text}>{children}</p>
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
    background: "#D3D3D3",
    border: "3px solid #000",
    padding: 32,
    lineHeight: 1.8,
    boxSizing: "border-box",
  },

  back: {
    display: "inline-block",
    marginBottom: 20,
    color: "#000",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 18,
  },

  title: {
    background: "#fff",
    border: "2px solid #000",
    padding: 14,
    marginBottom: 28,
    textAlign: "center",
  },

  block: {
    background: "#fff",
    border: "2px solid #000",
    padding: 18,
    marginBottom: 18,
  },

  blockTitle: {
    margin: "0 0 10px",
    fontSize: 22,
  },

  text: {
    margin: 0,
    fontSize: 16,
  },
};
