import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const [bookings, setBookings] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  const ADMIN_PASSWORD = "nailbug2025";

  useEffect(() => {
    if (authorized) {
      loadBookings();
    }
  }, [authorized]);

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });

    if (!error) {
      setBookings(data || []);
    }
  };

  const deleteBooking = async (id) => {
    const confirmDelete = confirm(
      "Delete this booking? / 确认删除该预约？"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (!error) {
      loadBookings();
    }
  };

  const exportCSV = () => {
  const headers = [
    "Date",
    "Time",
    "Name",
    "Contact",
    "Service EN",
    "Service ZH",
    "Note",
    "Booking ID",
  ];

  const rows = filteredBookings.map((b) => [
    b.date,
    `${b.start_time}:00 - ${b.end_time}:00`,
    b.name,
    b.contact,
    b.service_en,
    b.service_zh,
    b.note || "",
    b.id,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = dateFilter
    ? `nailbug-bookings-${dateFilter}.csv`
    : "nailbug-bookings-all.csv";

  link.click();
  URL.revokeObjectURL(url);
};

  if (!authorized) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h1>NAILBUG ADMIN</h1>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button
            style={styles.button}
            onClick={() => {
              if (password === ADMIN_PASSWORD) {
                setAuthorized(true);
              } else {
                alert("Wrong Password");
              }
            }}
          >
            Login
          </button>

              
        </div>
      </div>
    );
  }

  const filteredBookings = bookings
    .filter((b) =>
      dateFilter ? b.date === dateFilter : true
    )
    .sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }

      return a.start_time - b.start_time;
    });

  return (
    <div style={styles.page}>
      <h1>Booking Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={() => setDateFilter("")}
        >
          Show All
        </button>

            <button
  style={styles.button}
  onClick={exportCSV}
>
  Export CSV
</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>日期</th>
            <th>时间</th>
            <th>姓名</th>
            <th>联系方式</th>
            <th>套餐</th>
            <th>备注</th>
            <th>编号</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((b) => (
            <tr key={b.id}>
              <td>{b.date}</td>

              <td>
                {b.start_time}:00 - {b.end_time}:00
              </td>

              <td>{b.name}</td>

              <td>{b.contact}</td>

              <td>
                {b.service_en}
                <br />
                {b.service_zh}
              </td>

              <td>{b.note}</td>

              <td>{b.id}</td>

              <td>
                <button
                  onClick={() =>
                    deleteBooking(b.id)
                  }
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  page: {
    padding: 30,
    fontFamily: "monospace",
  },

  loginPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eee",
  },

  loginBox: {
    width: 400,
    background: "#fff",
    padding: 30,
    border: "2px solid black",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },

  button: {
    padding: "10px 20px",
    cursor: "pointer",
    marginRight: 10,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
