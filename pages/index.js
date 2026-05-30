import { useState } from "react";

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
  const [extra, setExtra] = useState(false);
  const [time, setTime] = useState(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");

  const [bookings, setBookings] = useState([]);
  const [success, setSuccess] = useState(null);

  const [cancelId, setCancelId] = useState("");
  const [cancelContact, setCancelContact] = useState("");
  const [cancelMsg, setCancelMsg] = useState("");

  const total = service ? service.time + (extra ? 1 : 0) : 0;
  const dayBookings = bookings.filter((b) => b.date === date);

  const available = (start) => {
    if (!service) return false;
    const end = start + total;
    return !dayBookings.some((b) => start < b.end && end > b.start);
  };

  const makeId = () =>
    `NB-${date.replaceAll("-", "").slice(4)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

  const submit = () => {
    if (!date || !service || !time || !name || !contact) return;

    const booking = {
      id: makeId(),
      date,
      start: time,
      end: time + total,
      name,
      contact,
      serviceEn: service.en,
      serviceZh: service.zh,
      total,
      note,
    };

    setBookings([...bookings, booking]);
    setSuccess(booking);

    setService(null);
    setExtra(false);
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
      setCancelMsg("未找到预约 / Booking not found");
      return;
    }

    setBookings(bookings.filter((b) => b.id !== found.id));
    setCancelMsg("预约已取消 / Booking cancelled");
    setCancelId("");
    setCancelContact("");
  };

  const canSubmit = date && service && time && name && contact;

  return (
    <div style={styles.page}>
      <main style={styles.container}>
        <div style={styles.logoWrap}>
          <img src="/MBPLOGO.png" alt="Millennium Bug Palace" style={styles.logo} />
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
            {services.map((s) => (
              <button
                key={s.en}
                onClick={() => {
                  setService(s);
                  setTime(null);
                }}
                style={{
                  ...styles.card,
                  ...(service?.en === s.en ? styles.active : {}),
                }}
              >
                <strong>{s.en}</strong>
                <span>{s.zh}</span>
                <em>{s.time}h</em>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Extension / 延长套餐">
          <button
            onClick={() => {
              setExtra(!extra);
              setTime(null);
            }}
            style={{
              ...styles.option,
              ...(extra ? styles.active : {}),
            }}
          >
            Extension Ritual / 延长 +1h
          </button>
        </Section>

        <Section title="Select Time / 选择时段">
          <div style={styles.timeGrid}>
            {timeSlots.map((t) => {
              const ok = available(t);
              return (
                <button
                  key={t}
                  disabled={!ok}
                  onClick={() => setTime(t)}
                  style={{
                    ...styles.timeBtn,
                    ...(time === t ? styles.active : {}),
                    ...(!ok ? styles.disabled : {}),
                  }}
                >
                  {t}:00
                  {!ok && service && <span>FULL / 已满</span>}
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="Total Time / 总时长">
          <div style={styles.total}>
            {total ? `${total} hours / ${total}小时` : "--"}
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
          <p>Ritual / 套餐：{service ? `${service.en} / ${service.zh}` : "--"}</p>
          <p>Time / 时间：{time ? `${time}:00 - ${time + total}:00` : "--"}</p>

          <button
            onClick={submit}
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
          <div style={styles.success}>
            <h2>预约成功 / Booking Confirmed</h2>
            <p>
              Booking ID / 预约编号：<strong>{success.id}</strong>
            </p>
            <p>请截图保存，取消预约时需要填写编号和联系方式。</p>
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

        <div style={styles.footerBrand}>
          <a href="https://instagram.com/YOUR_ATELIER_LINK" target="_blank" rel="noreferrer">
            <img src="/atelier.png" alt="atelier NAILBUG" style={styles.footerIcon} />
          </a>

          <a href="https://instagram.com/YOUR_MBP_LINK" target="_blank" rel="noreferrer">
            <img src="/bug palace.png" alt="Millennium Bug Palace" style={styles.footerIcon} />
          </a>
        </div>
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
    background: "#fff",
    padding: "32px 16px",
    fontFamily: "monospace",
  },

  container: {
    maxWidth: 760,
    margin: "0 auto",
    padding: 32,
    background: "#f3f3f3",
    border: "3px solid #000",
  },

  logoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 16,
  },

  logo: {
    width: 280,
    maxWidth: "100%",
    objectFit: "contain",
  },

  title: {
    textAlign: "center",
    fontSize: 38,
    letterSpacing: 1,
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
    minHeight: 86,
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

  timeBtn: {
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
    background: "#d6d6d6",
    color: "#888",
    borderColor: "#999",
    cursor: "not-allowed",
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

  success: {
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

  footerBrand: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 24,
    marginTop: 60,
    paddingTop: 24,
    borderTop: "2px solid #000",
  },

  footerIcon: {
    height: 48,
    width: "auto",
    cursor: "pointer",
  },
};
