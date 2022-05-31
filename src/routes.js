const dashboardRoutes = [
  {
    upgrade: true,
    path: "/download",
    name: "Prospectus",
    icon: "nc-icon nc-cloud-download-93",
    accountType: "student",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    accountType: "admin",
  },
  // {
  //   path: "/home",
  //   name: "Home",
  //   icon: "nc-icon nc-chart-pie-35",
  //   accountType: ["teacher", "student"],
  // },
  // {
  //   path: "/courses",
  //   name: "Courses",
  //   icon: "nc-icon nc-chart-pie-35",
  //   accountType: "admin",
  // },
  {
    path: "/students",
    name: "Students",
    icon: "nc-icon nc-chart-pie-35",
    accountType: ["admin", "teacher"],
  },
  {
    path: "/subjects",
    name: "Subjects",
    icon: "nc-icon nc-notes",
    accountType: ["admin", "teacher", "student"],
  },
  {
    path: "/grades",
    name: "Grades",
    icon: "nc-icon nc-bulb-63",
    accountType: ["student"],
  },
  {
    path: "/messages",
    name: "Messages",
    icon: "nc-icon nc-chat-round",
    accountType: ["admin", "teacher", "student"],
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    visible: false,
  },

  {
    path: "/add-teacher",
    name: "Add Teacher",
    visible: false,
  },
  {
    path: "/add-student",
    name: "Add Student",
    visible: false,
  },
  {
    path: "/add-subject",
    name: "Add Subject",
    visible: false,
  },
];

export default dashboardRoutes;
