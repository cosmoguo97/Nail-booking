import Link from "next/link";

export default function Policy() {
return ( <main style={styles.page}> <section style={styles.card}> <Link href="/home" style={styles.back}>
← HOME </Link>

```
    <h1>预约须知 / Policy</h1>

    <h2>Booking</h2>

    <p>
      本工作室采用预约制服务。
      请提前选择日期、时间及服务项目。
    </p>

    <h2>Original Design</h2>

    <p>
      atelier NAILBUG 以原创设计为主。
      我们欢迎参考图片，但不会完全复制其他美甲师作品。
    </p>

    <h2>Cancellation</h2>

    <p>
      提前24小时以上取消：免费。
    </p>

    <p>
      预约当天取消：可能影响后续预约资格。
    </p>

    <h2>Late Arrival</h2>

    <p>
      迟到15分钟以内：
      服务内容可能根据时间调整。
    </p>

    <p>
      迟到超过15分钟：
      预约可能被取消或改期。
    </p>

    <h2>Warranty</h2>

    <p>
      正常甲：
      7–14天免费保修。
    </p>

    <p>
      薄软甲：
      7–10天免费保修。
    </p>

    <p>
      超过保修期后的翘起、脱落、
      结构变化属于正常生长现象。
    </p>

    <h2>Nail Health</h2>

    <p>
      我们优先考虑指甲健康、
      长期状态与佩戴舒适度。
    </p>
  </section>
</main>
```

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
border: "3px solid black",
padding: 32,
lineHeight: 1.8,
},
back: {
color: "#000",
textDecoration: "none",
fontWeight: "bold",
},
};
