import { useState } from "react";

export default function Home() {
  const services = [
    { en: "Basic Design", zh: "基础设计", time: 2 },
    { en: "Design Set", zh: "设计款", time: 3 },
    { en: "Full Art", zh: "全手设计", time: 4 },
    { en: "Custom Ritual", zh: "高级定制", time: 8 },
  ];

  const timeSlots = [10, 12, 14, 16, 18];

  const [selectedService, setSelectedService] = useState(null);
  const [extra, setExtra] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");

  const [bookings, setBookings] = useState([
    { start: 12, end: 15, name: "cosmo", service: "Design Set" },
  ]);

  const totalTime = selectedService
    ? selectedService.time + (extra ? 1 : 0)
    : 0;

  const isAvailable = (start) => {
    if (!totalTime) return true;
    const end = start + totalTime;

    return !bookings.some((b) => {
      return start < b.end && end > b.start;
    });
  };

  const handleSubmit = () => {
    if (!selectedService || !selectedTime || !name || !contact) return;

    const newBooking = {
      start: selectedTime,
      end: selectedTime + totalTime,
      name,
      service: selectedService.en,
      note,
    };

    setBookings([...bookings, newBooking]);

    setSelectedService(null);
    setExtra(false);
    setSelectedTime(null);
    setName("");
    setContact("");
    setNote("");
  };

  const canSubmit = selectedService && selectedTime && name && contact;

  return (
    <div style={styles.page}>
      <main style={styles.container}>
        <h1 style={styles.title}>atelier NAILBUG</h1>
        <p style={styles.subtitle}>
          Millennium Bug Palace
          <br />
          线上预约 / Online Booking
        </p>

        <Section title="Select Ritual / 选择套餐">
          <div style={styles.grid}>
            {services.map((item) => {
              const active = selectedService?.en === item.en;

              return (
                <button
                  key={item.en}
                  onClick={() => {
                    setSelectedService(item);
                    setSelectedTime(null);
                  }}
                  style={{
                    ...styles.card,
                    ...(active ? styles.activeCard : {}),
                  }}
                >
                  <strong>{item.en}</strong>
                  <span>{item.zh}</span>
                  <em>{item.time}h</em>
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="Extension / 延长套餐">
          <button
            onClick={() => {
              setExtra(!extra);
              setSelectedTime(null);
            }}
            style={{
              ...styles.optionButton,
              ...(extra ? styles.activeCard : {}),
            }}
          >
            Extension Ritual / 延长 +1h
          </button>
        </Section>

        <Section title="Select Time / 选择时段">
          <div style={styles.timeGrid}>
            {timeSlots.map((t) => {
              const available = isAvailable(t);
              const active = selectedTime === t;

              return (
                <button
                  key={t}
                  disabled={!available || !selectedService}
                  onClick={() => setSelectedTime(t)}
                  style={{
                    ...styles.timeButton,
                    ...(active ? styles.activeCard : {}),
                    ...(!available || !selectedService ? styles.disabled : {}),
                  }}
                >
                  {t}:00
                  {!available && <span>FULL / 已满</span>}
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="Total Time / 总时长">
          <div style={styles.total}>
            {totalTime ? `${totalTime} hours / ${totalTime}小时` : "--"}
          </div>
        </Section>

        <Section title="Client Info / 顾客信息">
          <input
            style={styles.input}
            placeholder="Name / 姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Contact / 联系方式（WeChat / LINE）"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            placeholder="Describe your nail desire... / 请简单描述你的美甲需求"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Section>

        <Section title="Confirm / 确认预约">
          <p style={styles.preview}>
            Ritual / 套餐：
            {selectedService
              ? `${selectedService.en} / ${selectedService.zh}`
              : "--"}
          </p>
          <p style={styles.preview}>
            Time / 时间：
            {selectedTime
              ? `${selectedTime}:00 - ${selectedTime + totalTime}:00`
              : "--"}
          </p>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              ...styles.submit,
              ...(!canSubmit ? styles.submitDisabled : {}),
            }}
          >
            Submit Ritual / 提交预约
          </button>
        </Section>

        <Section title="Today Schedule / 今日排单">
          {bookings.length === 0 ? (
            <p style={styles.empty}>No booking yet / 暂无预约</p>
          ) : (
            bookings.map((b, i) => (
              <div key={i} style={styles.bookingCard}>
                <strong>
                  {b.start}:00 - {b.end}:00
                </strong>
                <span>{b.name}</span>
                <small>{b.service}</small>
              </div>
            ))
          )}
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    padding: "32px 16px",
    fontFamily: "monospace",
  },
  container: {
    maxWidth: 760,
    margin: "0 auto",
    padding: 32,
    background: "#f5f5f5",
    border: "3px solid #000",
  },
  title: {
    textAlign: "center",
    fontSize: 38,
    letterSpacing: 1,
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 500,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  card: {
    minHeight: 86,
    border: "3px solid #000",
    background: "#fff",
    color: "#000",
    cursor: "pointer",
    fontSize: 18,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  activeCard: {
    background: "#666",
    color: "#fff",
  },
  optionButton: {
    border: "3px solid #000",
    background: "#fff",
    padding: "14px 18px",
    fontSize: 18,
    cursor: "pointer",
  },
  timeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 10,
  },
  timeButton: {
    minHeight: 58,
    border: "3px solid #000",
    background: "#fff",
    color: "#000",
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    background: "#d6d6d6",
    color: "#888",
    cursor: "not-allowed",
    borderColor: "#999",
  },
  total: {
    border: "3px dashed #000",
    padding: 18,
    textAlign: "center",
    fontSize: 28,
    background: "#fff",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    marginBottom: 10,
    padding: 12,
    border: "2px solid #000",
    fontSize: 16,
    background: "#fff",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 110,
    padding: 12,
    border: "2px solid #000",
    fontSize: 16,
    background: "#fff",
    resize: "vertical",
  },
  preview: {
    fontSize: 16,
    margin: "8px 0",
  },
  submit: {
    width: "100%",
    marginTop: 14,
    padding: 16,
    background: "#000",
    color: "#fff",
    border: "3px solid #000",
    fontSize: 18,
    cursor: "pointer",
  },
  submitDisabled: {
    background: "#aaa",
    borderColor: "#aaa",
    cursor: "not-allowed",
  },
  bookingCard: {
    background: "#fff",
    border: "2px solid #000",
    padding: 12,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },
  empty: {
    color: "#666",
  },
};
