import React, { useState } from "react";
import "./form.css";

const Days = [
  {
    title: "Sun",
    value: "Sunday",
  },
  {
    title: "Mon",
    value: "Monday",
  },
  {
    title: "Tue",
    value: "Tuesday",
  },
  {
    title: "Wed",
    value: "Wednesday",
  },
  {
    title: "Thu",
    value: "Thursday",
  },
  {
    title: "Fri",
    value: "Friday",
  },
  {
    title: "Sat",
    value: "Saturday",
  },
];

export const Form = () => {
  const [form, setForm] = useState({
    id: 1, // Add an id property to uniquely identify each form submission
    title: "",
    description: "",
    date: "",
    day: "",
  });
  const [submitedData, setSubmitedData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const[selectedDay,setSelectedDay] = useState("")
  const [active, setActive] = useState(false);
  
  // getting Day according to the date
  const getDayOfWeek = (selectedDate) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(selectedDate);
    const dayOfWeek = days[date.getDay()];
    return dayOfWeek;
  };

  const getFormData = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    // Calculate and set the day based on the selected date
    // const selectedDate = new Date(value);
    // const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
    setForm({ ...form, [name]: value, day: getDayOfWeek(value) });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newForm = { ...form, id: submitedData.length + 1 }; // Assign a unique id
    setSubmitedData([...submitedData, newForm]);
    setForm({
      id: submitedData.length + 2, // Increment the id for the next form submission
      title: "",
      description: "",
      date: "",
      day: "",
    });
    setActive(false);
    setSelectedDay("");
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //  filter Data according to day
  const handleFilter = (selectedDay,index) => {
    const filteredData = submitedData.filter(
      (item) => item.day === selectedDay
    );
    setSelectedDay(index)
    setFilterData(filteredData);
    setActive(true);
  };
  const handleCalender = (e) => {
    e.preventDefault();
    const selectedDate = e.target.value;

    // Filter submitedData based on the selected date
    const filteredData = submitedData.filter(
      (item) => item.date === selectedDate
    );

    // Set the filtered data and activate the filter
    setFilterData(filteredData);
    setActive(true);
  }
  // Delete perticular Element
  const handleDelete = (index) => {
    const updatedData = [...submitedData];
    updatedData.splice(index, 1);
    setSubmitedData(updatedData);
    
  };
  const handleDeleteFilter = (index,element) => {
    const filterUpdatedData = [...filterData];
    filterUpdatedData.splice(index, 1);
    setFilterData(filterUpdatedData);

    // Delete the same element from submitedData
    const updatedData = submitedData.filter((item) => item.id !== element.id);
    setSubmitedData(updatedData);
  }
  //Edit the element
  return (
    <div className="form-container">
      <div className="form">
        <form onSubmit={handleFormSubmit} className="">
          <div className="title">
            <p>Title</p>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={getFormData}
              required
            />
          </div>
          <div className="desc">
            <p>Description</p>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={getFormData}
              required
            />
          </div>
          <div className="date">
            <p>Select Date</p>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={getFormData}
              min={getCurrentDate()} // Set the minimum date to the current date
            />
          </div>
          <input type="submit" placeholder="Save" className="submit" />
        </form>
      </div>
      <div className="days-btn-container">
        {Days.map((ele, i) => {
          return (
            <button
              key={i}
              onClick={() => handleFilter(ele.value,i)}
              className={selectedDay === i ? "active-days-btn" : "days-btn"}
            >
              {ele.title}
            </button>
          );
        })}
       
      </div>
      <div style={{width:"100%"}}>
          <p>Get Data According to Date</p>
          <input type="date" onChange={handleCalender}/>
        </div>
      <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
        {active === true ? (
          <>
            {filterData.map((ele, i) => {
              return (
                <div key={i} className="task-container">
                  <p>{ele.title}</p>
                  <p>{ele.description}</p>
                  <p>{ele.day}</p>
                  <button onClick={() => handleDeleteFilter(i,ele)}>Delete</button>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {submitedData.map((ele, i) => {
              return (
                <div key={i} className="task-container">
                  <p>{ele.title}</p>
                  <p>{ele.description}</p>
                  <p>{ele.day}</p>
                  <button onClick={() => handleDelete(i)}>Delete</button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
