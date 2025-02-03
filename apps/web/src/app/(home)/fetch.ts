export async function getOverviewData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    views: {
      value: 3456,
      growthRate: 0.43,
    },
    profit: {
      value: 4220,
      growthRate: 4.35,
    },
    products: {
      value: 3456,
      growthRate: 2.59,
    },
    users: {
      value: 3456,
      growthRate: -0.95,
    },
  };
}

export async function getChatsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      name: "Ajay Anand",
      profile: "/images/user/user-01.png",
      isActive: true,
      lastMessage: {
        content: "See you tomorrow at the meeting!",
        type: "text",
        timestamp: "2025-02-03T10:15:00Z",
        isRead: false,
      },
      unreadCount: 3,
    },
    {
      name: "Sarvesh",
      profile: "/images/user/user-03.png",
      isActive: true,
      lastMessage: {
        content: "Thanks for the update",
        type: "text",
        timestamp: "2025-02-03T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "Hemanth Raja",
      profile: "/images/user/user-04.png",
      isActive: false,
      lastMessage: {
        content: "What's up?",
        type: "text",
        timestamp: "2025-02-03T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "Adhavan",
      profile: "/images/user/user-05.png",
      isActive: false,
      lastMessage: {
        content: "Where are you now?",
        type: "text",
        timestamp: "2025-02-03T10:15:00Z",
        isRead: true,
      },
      unreadCount: 2,
    },
    {
      name: "Harish",
      profile: "/images/user/user-07.png",
      isActive: false,
      lastMessage: {
        content: "Hey, how are you?",
        type: "text",
        timestamp: "2025-02-03T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
  ];
}