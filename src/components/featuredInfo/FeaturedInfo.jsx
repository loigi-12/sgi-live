import React, { useEffect, useState } from "react";
import { db, firebase } from "../../firebase";
import "./featuredInfo.css";

function FeaturedInfo() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getStudent = async () => {
      await db.collection("students").onSnapshot((snapshot) => {
        setStudents(snapshot.docs.map((doc) => doc.data()));
      });

      await db.collectionGroup("s_subjects").onSnapshot((snapshot) => {
        setSubjects(snapshot.docs.map((doc) => doc.data()));
      });
    };

    getStudent();
  }, []);

  return (
    <div className="featured" style={{ marginTop: 20 }}>
      <div className="featuredItem">
        <span className="featuredTitle">Total Students</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{students.length}</span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">INCs</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {subjects.filter((s) => s.remarks == "INC").length}
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">No Grade</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {subjects.filter((s) => s.remarks == "NG").length}
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Dropped</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {subjects.filter((s) => s.remarks == "Dropped").length}
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}

export default FeaturedInfo;
