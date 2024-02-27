import React, { useState, useEffect } from "react";

const featuresData = [
  {
    title: "Digital Note Creation",
    para: "Create digital notes with text, images, and multimedia elements.",
  },
  {
    title: "Organization and Categories",
    para: "Organize notes into categories or notebooks for structured information.",
  },
  {
    title: "Synchronization",
    para: "Access notes from different devices with synchronization.",
  },
  {
    title: "Search and Tagging",
    para: "Efficiently find information with search functionalities and tagging.",
  },
  {
    title: "Collaboration",
    para: "Collaborate with multiple users to work on and share notes.",
  },
  {
    title: "Reminders and Alerts",
    para: "Set deadlines and receive notifications for important tasks.",
  },
  {
    title: "Security and Privacy",
    para: "Protect sensitive information with features like password protection or encryption.",
  },
];

const About = ({ toogle }) => {
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleFeatures(featuresData.slice(0, 5)); // Show the first 5 features
    }, 10000); // 10 seconds interval

    // Initial set of features
    setVisibleFeatures(featuresData.slice(0, 5));

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex justify-content-center h-100 my-5">
      <div className={`book ${toogle ? "bg-dark text-white" : "bg-light"}`}>
        <p style={{ transformy: "rotate(100deg)" }}>Inotebook</p>
        <div className={`cover ${toogle ? "bg-dark text-white" : "bg-light"}`}>
          <p>Inotebook </p>
        </div>
        <div className="features">
          <ul>
            {visibleFeatures.map((feature, index) => (
              <li key={index}>
                <strong>{feature.title}:</strong> {feature.para}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
