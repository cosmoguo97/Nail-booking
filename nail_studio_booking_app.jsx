import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 服务定义
const services = [
  { name: "基础设计", hours: 2 },
  { name: "设计款", hours: 3 },
  { name: "全手设计", hours: 4 },
  { name: "高级定制", hours: 8 },
];

// 时间段（可以自行扩展）
const baseSlots = [10, 12, 14, 16, 18];

export default function BookingApp() {
  const [selectedService, setSelectedService] = useState(null);
  const [extension, setExtension] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // 用户信息
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");

  const getTotalHours = () => {
    if (!selectedService) return 0;
    return selectedService.hours + (extension ? 1 : 0);
  };

  // 判断时间冲突
  const isSlotAvailable = (startHour) => {
    const duration = getTotalHours();
    const endHour = startHour + duration;

    for (let b of bookings) {
      const bStart = b.start;
      const bEnd = b.start + b.duration;

      // 时间重叠判断
      if (!(endHour <= bStart || startHour >= bEnd)) {
        return false;
      }
    }
    return true;
  };

  const handleBooking = () => {
    if (!selectedService || selectedSlot === null) return;

    const newBooking = {
      start: selectedSlot,
      duration: getTotalHours(),
      name,
      contact,
      note,
    };

    setBookings([...bookings, newBooking]);

    // reset
    setSelectedSlot(null);
    setSelectedService(null);
    setExtension(false);
    setName("");
    setContact("");
    setNote("");
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6 bg-pink-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center">🍓 阿Sue美甲店预约</h1>

      {/* 套餐选择 */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">选择套餐</h2>
          {services.map((s) => (
            <Button
              key={s.name}
              variant={selectedService?.name === s.name ? "default" : "outline"}
              onClick={() => setSelectedService(s)}
              className="w-full rounded-xl"
            >
              {s.name}（{s.hours}小时）
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* 延长 */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-4">
          <Button
            variant={extension ? "default" : "outline"}
            onClick={() => setExtension(!extension)}
            className="w-full rounded-xl"
          >
            ✨ 延长 +1小时
          </Button>
        </CardContent>
      </Card>

      {/* 时间选择（智能排单） */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">选择时间</h2>
          {baseSlots.map((hour) => {
            const available = isSlotAvailable(hour);
            return (
              <Button
                key={hour}
                disabled={!available}
                variant={selectedSlot === hour ? "default" : "outline"}
                onClick={() => setSelectedSlot(hour)}
                className="w-full rounded-xl"
              >
                {hour}:00 {available ? "" : "（已占用）"}
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* 用户信息 */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">填写信息</h2>
          <Input placeholder="姓名" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="联系方式（微信/电话）" value={contact} onChange={(e) => setContact(e.target.value)} />
          <Input placeholder="备注（可选）" value={note} onChange={(e) => setNote(e.target.value)} />
        </CardContent>
      </Card>

      {/* 确认 */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-4 space-y-2">
          <p>⏰ 总时长：{getTotalHours()} 小时</p>
          <p>📅 时间：{selectedSlot ? `${selectedSlot}:00` : "未选择"}</p>

          <Button
            className="w-full rounded-xl"
            disabled={!selectedService || !selectedSlot || !name || !contact}
            onClick={handleBooking}
          >
            💖 确认预约
          </Button>
        </CardContent>
      </Card>

      {/* 已预约列表 */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">今日排单</h2>
          {bookings.map((b, i) => (
            <p key={i}>
              {b.start}:00 - {b.start + b.duration}:00 ｜{b.name}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
