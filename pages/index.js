import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [extra, setExtra] = useState(false);

  const menu = [
    { name: "Basic Design", time: 2 },
    { name: "Design Set", time: 3 },
    { name: "Full Art", time: 4 },
    { name: "Custom Ritual", time: 8 },
  ];

  const totalTime = selected
    ? selected.time + (extra ? 1 : 0)
    : 0;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        atelier NAILBUG
      </h1>
      <p style={styles.subtitle}>
        Millennium Bug Palace 予約系统
      </p>

      {/* 套餐 */}
      <div style={styles.section}>
        <p style={styles.label}>Select Ritual</p>
        <div style={styles.grid}>
          {menu.map((item, i) => {
            const isActive = selected?.name === item.name;

            return (
              <button
                key={i}
                onClick={() => setSelected(item)}
                style={{
                  ...styles.card,
                  background: isActive ? "#000" : "#fff",
                  color: isActive ? "#fff" : "#000",
                  opacity: isActive ? 0.6 : 1,
                }}
              >
                <div>{item.name}</div>
                <div style={{ fontSize: 12 }}>
                  {item.time}h
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 延长 */}
      <div style={styles.section}>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={extra}
            onChange={() => setExtra(!extra)}
          />
          Extension Ritual (+1h)
        </label>
      </div>

      {/* 时间 */}
      <div style={styles.section}>
        <p style={styles.label}>Total Time</p>
        <div style={styles.time}>
          {totalTime ? `${totalTime} hours` : "--"}
        </div>
      </div>

      {/* 信息收集 */}
      <div style={styles.section}>
        <p style={styles.label}>Client Info</p>
        <input placeholder="Name" style={styles.input} />
        <input placeholder="Contact (WeChat / LINE)" style={styles.input} />
        <textarea
          placeholder="Describe your nail desire..."
          style={styles.textarea}
        />
      </div>

      {/* 提交 */}
      <button style={styles.submit}>
        Submit Ritual
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: "40px auto",
    fontFamily: "monospace",
    padding: 20,
    background: "#f5f5f5",
    border: "2px solid black",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  card: {
    border: "2px solid black",
    padding: 10,
    cursor: "pointer",
  },
  checkbox: {
    fontSize: 12,
  },
  time: {
    fontSize: 18,
    border: "2px dashed black",
    padding: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 8,
    padding: 6,
    border: "1px solid black",
  },
  textarea: {
    width: "100%",
    height: 60,
    padding: 6,
    border: "1px solid black",
  },
  submit: {
    width: "100%",
    padding: 10,
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
