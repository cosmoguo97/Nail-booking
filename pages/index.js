import { useState } from "react";

const services = [
  { name: "基础设计", hours: 2 },
  { name: "设计款", hours: 3 },
  { name: "全手设计", hours: 4 },
  { name: "高级定制", hours: 8 },
];

const baseSlots = [10, 12, 14, 16, 18];

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [extension, setExtension] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const getTotalHours = () => {
    if (!selectedService) return 0;
    return selectedService.hours + (extension ? 1 : 0);
  };

  const isSlotAvailable = (startHour) => {
    const duration = getTotalHours();
    const endHour = startHour + duration;

    for (let b of bookings) {
      const bStart = b.start;
      const bEnd = b.start + b.duration;

      if (!(endHour <= bStart || startHour >= bEnd)) {
        return false;
      }
    }
    return true;
  };

  const handleBooking = () => {
    const newBooking = {
      start: selectedSlot,
      duration: getTotalHours(),
      name,
      contact,
    };

    setBookings([...bookings, newBooking]);

    setSelectedSlot(null);
    setSelectedService(null);
    setExtension(false);
    setName("");
    setContact("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h2>🍓 阿Sue美甲预约</h2>

      <h3>选择套餐</h3>
      {services.map((s) => (
        <button key={s.name} onClick={() => setSelectedService(s)}>
          {s.name}（{s.hours}h）
        </button>
      ))}

      <h3>延长</h3>
      <button onClick={() => setExtension(!extension)}>
        延长 +1小时
      </button>

      <h3>选择时间</h3>
      {baseSlots.map((hour) => {
        const available = isSlotAvailable(hour);
        return (
          <button
            key={hour}
            disabled={!available}
            onClick={() => setSelectedSlot(hour)}
          >
            {hour}:00 {available ? "" : "（已满）"}
          </button>
        );
      })}

      <h3>填写信息</h3>
      <input
        placeholder="姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="联系方式"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />

      <h3>确认</h3>
      <p>总时长：{getTotalHours()}h</p>
      <p>时间：{selectedSlot}</p>

      <button
        disabled={!selectedService || !selectedSlot || !name || !contact}
        onClick={handleBooking}
      >
        确认预约
      </button>

      <h3>今日排单</h3>
      {bookings.map((b, i) => (
        <p key={i}>
          {b.start}:00 - {b.start + b.duration}:00 ｜{b.name}
        </p>
      ))}
    </div>
  );
}
