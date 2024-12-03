import React, { useContext, useEffect, useMemo, useState } from "react";
import { context } from "../../../App";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const { events } = useContext(context)
    const [value, setValue] = useState("")
    const navigate = useNavigate()
    
    //қайталау
    const filteredEvents = useMemo(() => {
        if (!events || typeof events !== "object") return {};
    
        return Object.keys(events).reduce((acc, category) => {
            acc[category] = events[category].filter((event) => {
                return Object.keys(event).some((key) => {
                    const field = event[key];
                    if (typeof field === "string") {
                        return field.toLowerCase().includes(value.toLowerCase());
                    } else if (Array.isArray(field)) {
                        // Search in nested arrays (e.g., cities, theaters, schedules)
                        return field.some((nestedItem) =>
                            JSON.stringify(nestedItem)
                                .toLowerCase()
                                .includes(value.toLowerCase())
                        );
                    } else if (typeof field === "object" && field !== null) {
                        // Recursively search in nested objects
                        return JSON.stringify(field)
                            .toLowerCase()
                            .includes(value.toLowerCase());
                    }
                    return false;
                });
            });
            return acc;
        }, {});
    }, [events, value]);
    
    
    useEffect(()=> {
        console.log("Filtered events by search: ", filteredEvents)
    }, [filteredEvents])
    

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
        {value.trim() !== "" && 
 Object.values(filteredEvents).flat().length > 0 && (
    <div className="dropdown">
        {Object.values(filteredEvents).flat().map((event) => (
            <div 
                key={event.id} 
                className="dropdown-item" 
                onClick={() => navigate(`/${event.category}/${event.id}`)}
            >
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