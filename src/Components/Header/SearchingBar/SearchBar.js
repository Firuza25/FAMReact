import React, { useContext, useMemo, useState } from "react";
import { context } from "../../../App";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const { events } = useContext(context)
    const [value, setValue] = useState("")
    const navigate = useNavigate()

    const filteredEvents = useMemo(() => {
        if (!Array.isArray(events)) return [];
        return events.filter((event) => (
            Object.keys(event).some((key) => {
                const field = event[key];
                if (typeof field === "string") {
                    return field.toLowerCase().includes(value.toLowerCase());
                }else if (Array.isArray(field)) {
                    // Search in nested arrays (like cities, theaters, schedules)
                    return field.some((nestedItem) =>
                        JSON.stringify(nestedItem)
                            .toLowerCase()
                            .includes(value.toLowerCase())
                    );
                } else if (typeof field === "object" && field !== null) {
                    // Recursively search in nested objects
                    return Object.values(field)
                        .join(" ")
                        .toLowerCase()
                        .includes(value.toLowerCase());
                }
                return false;
                
            })
        ))
    }, [events, value])

    const handleOnChange = (event) => {
        setValue(event.target.value);
        console.log("Filtered events: ", filteredEvents)
    };

    return (<div style={{ position: "relative", width: "300px", margin: "auto" }}>
        <input type="text" onChange={handleOnChange} name="search" value={value} placeholder="Search" style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                }} />
        <div>
        {value.trim() !== "" && filteredEvents.length > 0 && (
                <div className="dropdown">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="dropdown-item" onClick={()=> {navigate(`/${event.category}/${event.id}`)}}>
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                        </div>
                    ))}
                </div>
            )}
        
        </div>

    </div>)
}
export default SearchBar