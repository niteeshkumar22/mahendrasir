export const tabsData = [
  {
    "label": "All (30)",
    "value": "all"
  },
  {
    "label": "New Request (15)",
    "value": "new"
  },
  {
    "label": "Active User (10)",
    "value": "active"
  },
  {
    "label": "Inactive User (5)",
    "value": "inactive"
  }
]

export const userData = [
    {
      "key": "1",
      "username": "Henry Arthur",
      "gender": "Male",
      "email": "henry.arthur@example.com",
      "userId": "5873443",
      "mobile": "(704) 555-0127",
      "lastActivity": "Today",
      "status": "active",
      "avatar": "https://i.pravatar.cc/50",
    },
    {
      "key": "2",
      "username": "Henry Arthur",
      "gender": "Male",
      "email": "henry.arthur@example.com",
      "userId": "5873443",
      "mobile": "(704) 555-0127",
      "lastActivity": "Today",
      "status": "inactive",
      "avatar": "https://i.pravatar.cc/50",
    },
    {
      "key": "3",
      "username": "Henry Arthur",
      "gender": "Male",
      "email": "henry.arthur@example.com",
      "userId": "5873443",
      "mobile": "(704) 555-0127",
      "lastActivity": "Today",
      "status": "pending",
      "avatar": "https://i.pravatar.cc/50",
    },
  ];



export const getLargeDummyData = (start = 1) => {
let data = []
  for (let i = start; i <= start + 10; i++) {
    data.push({
      "key": i,
      username: `Henry Arthur ${i}`,
      gender: "Male",
      email: "henry.arthur@example.com",
      userId: "5873443",
      mobile: "(704) 555-0127",
      lastActivity: "Today",
      status: i%2 === 0 ? "active" : "pending",
      avatar: "https://i.pravatar.cc/50",
    });
  }
  return data;
};

  