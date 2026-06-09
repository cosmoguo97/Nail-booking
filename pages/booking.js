import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Booking() {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => window.removeEventListener("resize", checkMobile);
}, []);
  const today = new Date().toISOString().split("T")[0];

  const brands = [
    { en: "atelier NAILBUG", zh: "定制设计美甲" },
    { en: "MBP Salon", zh: "日系沙龙美甲" },
  ];

  const serviceOptions = {
    "atelier NAILBUG": [
      { en: "Basic Design", zh: "基础设计", time: 2 },
      { en: "Design Set", zh: "设计款", time: 3 },
      { en: "Full Art", zh: "全手设计", time: 4 },
      { en: "Custom Ritual", zh: "高级定制", time: 8 },
    ],
    "MBP Salon": [
      { en: "One Color / Color Mix", zh: "单色 / 跳色", time: 1.5 },
      { en: "Churu Cat Eye", zh: "Churu 猫眼", time: 2 },
      { en: "Hailey Nails", zh: "海莉甲", time: 2 },
      { en: "Japanese Simple Design", zh: "日系简约设计", time: 2 },
      { en: "Nuance / Elegant Design", zh: "日系 nuance / 日系精致设计", time: 2.5 },
      { en: "Japanese Premium", zh: "日系 Premium", time: 3 },
      { en: "Seasonal Recommendation", zh: "本季推荐款", time: 2 },
    ],
  };

  const timeSlots = [10, 14, 16, 18];

  const [date, setDate] = useState(today);
  const [brand, setBrand] = useState(null);
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

  const services = brand ? serviceOptions[brand.en] : [];
  const totalTime = service ? service.time + (extension ? 1 : 0) : 0;
  const dayBookings = bookings.filter((b) => b.date === date);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      console.log("Load bookings error:", error);
      return;
    }

    setBookings(data || []);
  };

  const formatTime = (value) => {
    if (value === null || value === undefined) return "--";
    const hour = Math.floor(value);
    const minute = value % 1 === 0.5 ? "30" : "00";
    return `${hour}:${minute}`;
  };

  const isAvailable = (startTime) => {
    if (!service) return false;

    const endTime = startTime + totalTime;

    return !dayBookings.some(
      (booking) =>
        startTime < booking.end_time &&
        endTime > booking.start_time
    );
  };

  const makeBookingId = () => {
    const dateCode = date.replaceAll("-", "").slice(4);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `NB-${dateCode}-${random}`;
  };

  const submitBooking = async () => {
    if (!date || !brand || !service || !time || !name || !contact) return;

    const booking = {
      id: makeBookingId(),
      date,
      start_time: time,
      end_time: time + totalTime,
      name,
      contact,
      service_en: `${brand.en} - ${service.en}`,
      service_zh: `${brand.zh} - ${service.zh}`,
      total_time: totalTime,
      note,
    };

    const { error } = await supabase.from("bookings").insert([booking]);

    if (error) {
      alert(`Booking Failed: ${error.message}`);
      console.log(error);
      return;
    }

    await loadBookings();

    setSuccess(booking);
    setBrand(null);
    setService(null);
    setExtension(false);
    setTime(null);
    setName("");
    setContact("");
    setNote("");
  };

  const cancelBooking = async () => {
    const found = bookings.find(
      (b) =>
        b.id.toLowerCase() === cancelId.trim().toLowerCase() &&
        b.contact.toLowerCase() === cancelContact.trim().toLowerCase()
    );

    if (!found) {
      setCancelMsg("Booking not found / 未找到预约");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", found.id);

    if (error) {
      setCancelMsg(`Delete Failed: ${error.message}`);
      return;
    }

    await loadBookings();

    setCancelMsg("Booking cancelled / 预约已取消");
    setCancelId("");
    setCancelContact("");
  };

  const canSubmit = date && brand && service && time && name && contact;

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

  <main style={isMobile ? styles.containerMobile : styles.container}>

    <Link href="/" style={styles.back}>
      ← HOME
    </Link>

    <div style={styles.logoWrap}>
      <img
        src="/mbplogort.png"
        alt="Millennium Bug Palace"
        style={styles.logo}
      />
    </div>

          <h1 style={isMobile ? styles.titleMobile : styles.title}>Booking</h1>

          <p style={styles.subtitle}>
            atelier NAILBUG @ Millennium Bug Palace
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

          <Section title="Select Brand / 选择品牌">
            <div style={isMobile ? styles.gridMobile : styles.grid}>
              {brands.map((item) => (
                <button
                  key={item.en}
                  onClick={() => {
                    setBrand(item);
                    setService(null);
                    setTime(null);
                    setSuccess(null);
                  }}
                  style={{
                    ...styles.card,
                    ...(brand?.en === item.en ? styles.active : {}),
                  }}
                >
                  <strong>{item.en}</strong>
                  <span>{item.zh}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Select Service / 选择套餐">
            {!brand ? (
              <p>Please select a brand first / 请先选择品牌</p>
            ) : (
              <div style={isMobile ? styles.gridMobile : styles.grid}>
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
            )}
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
            <div style={isMobile ? styles.timeGridMobile : styles.timeGrid}>
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
                    {formatTime(slot)}
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
            <p>
              Brand / 品牌：
              {brand ? `${brand.en} / ${brand.zh}` : "--"}
            </p>

            <p>
              Ritual / 套餐：
              {service ? `${service.en} / ${service.zh}` : "--"}
            </p>

            <p>Date / 日期：{date}</p>

            <p>
              Time / 时间：
              {time ? `${formatTime(time)} - ${formatTime(time + totalTime)}` : "--"}
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

              <div style={styles.bottomNav}>
  <Link href="/" style={styles.bottomButton}>
    ← Return Home
  </Link>
</div>
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
    background: "#f576ea",
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
    background: "#01FF01",
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
  back: {
  display: "inline-block",
  marginBottom: 20,
  color: "#000",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: 18,
},

  bottomNav: {
  marginTop: 40,
  textAlign: "center",
},

bottomButton: {
  display: "inline-block",
  background: "#fff",
  border: "2px solid #000",
  padding: "12px 24px",
  color: "#000",
  textDecoration: "none",
  fontWeight: "bold",
},
  containerMobile: {
  width: "94vw",
  margin: "0 auto",
  padding: 18,
  background: "#D3D3D3",
  border: "3px solid #000",
  boxSizing: "border-box",
},

logoMobile: {
  width: "100%",
  maxHeight: 260,
  height: "auto",
  objectFit: "contain",
},

titleMobile: {
  width: "100%",
  boxSizing: "border-box",
  textAlign: "center",
  fontFamily: "'DotGothic16', monospace",
  fontSize: 36,
  letterSpacing: "2px",
  padding: "12px 8px",
  margin: "0 0 18px",
  background: "#01FF01",
  border: "2px solid #000",
},

gridMobile: {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 12,
},

timeGridMobile: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
},
};
