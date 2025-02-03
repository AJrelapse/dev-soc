export async function getEventsData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
  
    return [
      {
        from: "2024-12-20T09:00:00Z",
        to: "2024-12-20T10:30:00Z",
        title: "Team Meeting",
        description: "Discuss project updates and next steps.",
      },
      {
        from: "2024-12-21T14:00:00Z",
        to: "2024-12-21T15:00:00Z",
        title: "Client Presentation",
        description: "Present the latest product demo to stakeholders.",
      },
      {
        from: "2024-12-22T11:00:00Z",
        to: "2024-12-22T12:30:00Z",
        title: "Code Review",
        description: "Review pull requests and discuss improvements.",
      },
      {
        from: "2024-12-23T16:00:00Z",
        to: "2024-12-23T17:00:00Z",
        title: "Design Sprint",
        description: "Brainstorm UI/UX improvements for the new dashboard.",
      },
    ];
  }
  