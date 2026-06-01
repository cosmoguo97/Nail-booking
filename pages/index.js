import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const today = new Date().toISOString().split("T")[0];

  const services = [
    { en: "Basic Design", zh: "基础设计", time: 2 },
    { en: "Design Set", zh: "设计款", time: 3 },
    { en: "Full Art", zh: "全手设计", time: 4 },
    { en: "Custom Ritual", zh: "高级定制", time: 8 },
  ];

  const timeSlots = [10, 12, 14, 16, 18];

  const [date, setDate] = useState(today);
  const [service, setService] = useState(null);
  const [extension, setExtension] = useState(false);
  const [time, setTime] = useState(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");

  const [bookings, setBookings] = useState([]);
  const [success, setSuccess] = useState(null);

  const [cancelId, setCancelId] = useState("");
  const [cancelContact, setCancelContact] = useState("");
  const [cancelMsg, setCancelMsg] = useState("");

  const totalTime = service ? service.time + (extension ? 1 : 0) : 0;
  const dayBookings = bookings.filter((b) => b.date === date);

  const isAvailable = (start) => {
    if (!service) return false;
    const end = start + totalTime;
    return !dayBookings.some((b) => start < b.end && end > b.start);
  };

  const makeBookingId = () => {
    const dateCode = date.replaceAll("-", "").slice(4);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `NB-${dateCode}-${random}`;
  };

  const submitBooking = () => {
    if (!date || !service || !time || !name || !contact) return;

    const booking = {
      id: makeBookingId(),
      date,
      start: time,
      end: time + totalTime,
      name,
      contact,
      serviceEn: service.en,
      serviceZh: service.zh,
      totalTime,
      note,
    };

    setBookings([...bookings, booking]);
    setSuccess(booking);

    setService(null);
    setExtension(false);
    setTime(null);
    setName("");
    setContact("");
    setNote("");
  };

  const cancelBooking = () => {
    const found = bookings.find(
      (b) =>
        b.id.toLowerCase() === cancelId.trim().toLowerCase() &&
        b.contact.toLowerCase() === cancelContact.trim().toLowerCase()
    );

    if (!found) {
      setCancelMsg("Booking not found / 未找到预约");
      return;
    }

    setBookings(bookings.filter((b) => b.id !== found.id));
    setCancelMsg("Booking cancelled / 预约已取消");
    setCancelId("");
    setCancelContact("");
  };

  const canSubmit = date && service && time && name && contact;

  return (
    <>
      <Head>
        <title>atelier NAILBUG Booking</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={styles.page}>
        <main style={styles.container}>
          <div style={styles.logoWrap}>
            <img
              src="/mbplogort.png"
              alt="Millennium Bug Palace"
              style={styles.logo}
            />
          </div>

          <h1 style={styles.title}>atelier NAILBUG</h1>

          <p style={styles.subtitle}>
            Millennium Bug Palace
            <br />
            Online Booking / 线上预约
          </p>

          <Section title="Contact / 联系方式">
            <div style={styles.contactBox}>
              <p>Instagram：cosmo_the_nomandic</p>
              <p>WeChat：ggnail2000</p>
              <p>Location：Hangzhou, China</p>
            </div>
          </Section>

          <Section title="Calendar / 选择日期">
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime(null);
                setSuccess(null);
              }}
              style={styles.input}
            />
          </Section>

          <Section title="Select Ritual / 选择套餐">
            <div style={styles.grid}>
              {services.map((item) => (
                <button
                  key={item.en}
                  onClick={() => {
                    setService(item);
                    setTime(null);
                    setSuccess(null);
                  }}
                  style={{
                    ...styles.card,
                    ...(service?.en === item.en ? styles.active : {}),
                  }}
                >
                  <strong>{item.en}</strong>
                  <span>{item.zh}</span>
                  <em>{item.time}h</em>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Extension / 延长套餐">
            <button
              onClick={() => {
                setExtension(!extension);
                setTime(null);
                setSuccess(null);
              }}
              style={{
                ...styles.option,
                ...(extension ? styles.active : {}),
              }}
            >
              Extension Ritual / 延长 +1h
            </button>
          </Section>

          <Section title="Select Time / 选择时段">
            <div style={styles.timeGrid}>
              {timeSlots.map((slot) => {
                const available = isAvailable(slot);

                return (
                  <button
                    key={slot}
                    disabled={!available}
                    onClick={() => setTime(slot)}
                    style={{
                      ...styles.timeButton,
                      ...(time === slot ? styles.active : {}),
                      ...(!available ? styles.disabled : {}),
                    }}
                  >
                    {slot}:00
                    {!available && service && <span>FULL / 已满</span>}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Total Time / 总时长">
            <div style={styles.totalBox}>
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
            <p>Date / 日期：{date}</p>
            <p>
              Ritual / 套餐：
              {service ? `${service.en} / ${service.zh}` : "--"}
            </p>
            <p>
              Time / 时间：
              {time ? `${time}:00 - ${time + totalTime}:00` : "--"}
            </p>

            <button
              onClick={submitBooking}
              disabled={!canSubmit}
              style={{
                ...styles.submit,
                ...(!canSubmit ? styles.submitDisabled : {}),
              }}
            >
              Submit Ritual / 提交预约
            </button>
          </Section>

          {success && (
            <div style={styles.successBox}>
              <h2>Booking Confirmed / 预约成功</h2>
              <p>
                Booking ID / 预约编号：
                <strong>{success.id}</strong>
              </p>
              <p>请截图保存。取消预约时需要填写预约编号和联系方式。</p>
            </div>
          )}

          <Section title="Schedule / 当日排单">
            {dayBookings.length === 0 ? (
              <p>No booking yet / 暂无预约</p>
            ) : (
              dayBookings
                .slice()
                .sort((a, b) => a.start - b.start)
                .map((b) => (
                  <div key={b.id} style={styles.booking}>
                    <div>
                      <strong>
                        {b.start}:00 - {b.end}:00
                      </strong>
                      <br />
                      {b.serviceEn} / {b.serviceZh}
                    </div>

                    <div style={{ textAlign: "right" }}>
                      {b.name}
                      <br />
                      <small>{b.id}</small>
                    </div>
                  </div>
                ))
            )}
          </Section>

          <Section title="Cancel Booking / 取消预约">
            <input
              style={styles.input}
              placeholder="Booking ID / 预约编号"
              value={cancelId}
              onChange={(e) => setCancelId(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Contact / 预约时填写的联系方式"
              value={cancelContact}
              onChange={(e) => setCancelContact(e.target.value)}
            />

            <button onClick={cancelBooking} style={styles.cancel}>
              Cancel / 取消
            </button>

            {cancelMsg && <p>{cancelMsg}</p>}
          </Section>
        </main>
      </div>
    </>
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
    background: "#01FF01",
    fontFamily: "monospace",
    padding: "40px 0",
  },

  container: {
    width: "90vw",
    maxWidth: 900,
    minWidth: 320,
    margin: "0 auto",
    padding: 32,
    background: "#D3D3D3",
    border: "3px solid #000",
    boxSizing: "border-box",
  },

  logoWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
  },

  logo: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },

  title: {
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
    fontFamily: "'DotGothic16', monospace",
    fontSize: 56,
    letterSpacing: "4px",
    padding: "16px 8px",
    margin: "0 0 20px",
    background: "#A6E3B5",
    border: "2px solid #000",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 32,
  },

  contactBox: {
    background: "#fff",
    border: "2px solid #000",
    padding: 14,
    lineHeight: 1.7,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },

  card: {
    minHeight: 88,
    border: "3px solid #000",
    background: "#fff",
    color: "#000",
    cursor: "pointer",
    fontSize: 18,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    fontFamily: "monospace",
  },

  active: {
    background: "#A6E3B5",
    color: "#000",
  },

  option: {
    border: "3px solid #000",
    background: "#fff",
    padding: "14px 18px",
    fontSize: 18,
    cursor: "pointer",
    fontFamily: "monospace",
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
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "monospace",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  disabled: {
    background: "#c7c7c7",
    color: "#777",
    borderColor: "#999",
    cursor: "not-allowed",
  },

  totalBox: {
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
    fontFamily: "monospace",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 110,
    padding: 12,
    border: "2px solid #000",
    fontSize: 16,
    resize: "vertical",
    fontFamily: "monospace",
  },

  submit: {
    width: "100%",
    marginTop: 14,
    padding: 16,
    background: "#A6E3B5",
    color: "#000",
    border: "3px solid #000",
    fontSize: 18,
    cursor: "pointer",
    fontFamily: "monospace",
  },

  submitDisabled: {
    background: "#aaa",
    borderColor: "#aaa",
    cursor: "not-allowed",
  },

  successBox: {
    border: "3px dashed #000",
    padding: 18,
    marginBottom: 28,
    background: "#fff",
  },

  booking: {
    background: "#fff",
    border: "2px solid #000",
    padding: 12,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },

  cancel: {
    width: "100%",
    padding: 14,
    background: "#fff",
    color: "#000",
    border: "3px solid #000",
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "monospace",
  },
};
