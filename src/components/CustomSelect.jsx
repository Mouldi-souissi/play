import React, { useEffect, useRef, useState } from "react";

const CustomSelect = ({ options }) => {
  const [isSelecting, toggleMenu] = useState(false);
  const [selected, setSelected] = useState("");
  const componetRef = useRef(null);

  const handleSelection = (id) => {
    setSelected(id);
    toggleMenu(false);
  };
  const handleClickOutside = (e) => {
    if (componetRef.current && !componetRef.current.contains(e.target)) {
      toggleMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [componetRef]);

  return (
    <div className="selectMenu" ref={componetRef}>
      <div
        className={`d-flex justify-content-between selectHeader p-2 ${
          isSelecting && "active"
        }`}
        onClick={() => toggleMenu(!isSelecting)}
      >
        <span>{selected ? selected : options[0]}</span>
        <i className="bi bi-chevron-down"></i>
      </div>
      {isSelecting && (
        <div className="selectOptions">
          <ul className="options">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelection(option)}
                className={`${selected === option && "active"}`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
