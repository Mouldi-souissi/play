import React, { useEffect, useRef, useState } from "react";

const CustomSelect = ({ options, getSelected, name }) => {
  const [isSelecting, toggleMenu] = useState(false);
  const [selected, setSelected] = useState("");
  const componentRef = useRef(null);

  const handleSelection = (id) => {
    setSelected(id);
    getSelected(name, id);
    toggleMenu(false);
  };
  const handleClickOutside = (e) => {
    if (componentRef.current && !componentRef.current.contains(e.target)) {
      toggleMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [componentRef]);

  return (
    <div className="selectMenu" ref={componentRef}>
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
