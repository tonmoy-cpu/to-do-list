const calendarService = {
  addToCalendar(task) {
    if (!task.reminder) {
      console.warn("No reminder set for task; cannot add to calendar.");
      return null;
    }

    const startTime = new Date(task.reminder);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const formatICSDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${formatICSDate(startTime)}`,
      `DTEND:${formatICSDate(endTime)}`,
      `SUMMARY:${task.title}`,
      `DESCRIPTION:Task: ${task.title} (${task.category}) - Priority: ${task.priority}`,
      task.category === "outdoor" ? `LOCATION:${task.location}` : "",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${task.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  },
};

export default calendarService;