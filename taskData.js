export const SUBJECTS = [
  "Mobile Programming",
  "Data Mining",
  "Networking",
  "Statistics",
];

// Generate a deadline relative to today
export function dateAfter(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);

  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Validate YYYY-MM-DD input
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);

  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

// Initial assignments
export const sampleTasks = [
  {
    id: "1",
    title: "Finish JavaScript exercises",
    subject: "Mobile Programming",
    deadline: dateAfter(2),
    notes: "Loops, arrays, and ES6 syntax",
    done: false,
  },
  {
    id: "2",
    title: "Data Mining worksheet",
    subject: "Data Mining",
    deadline: dateAfter(4),
    notes: "Classification vs regression",
    done: false,
  },
  {
    id: "3",
    title: "Network topology review",
    subject: "Networking",
    deadline: dateAfter(6),
    notes: "Access, distribution, and core",
    done: false,
  },
  {
    id: "4",
    title: "Statistics practice",
    subject: "Statistics",
    deadline: dateAfter(1),
    notes: "Mean, median, and mode",
    done: true,
  },
];
