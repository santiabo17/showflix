import './GenreSelector.css';
import downIcon from '../../static/down_arrow.svg';
import React from 'react';

function GenreSelector({values, onChange, selectedValue, columns}){
    const [showOptions, setShowOptions] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState(0);

    const genreSelector = React.useRef();

    React.useEffect(() => {
        const elemento = document.querySelector('.genre_selector_container');
        elemento.style.setProperty('--columns', columns);
        function handleClickOutside(event) {
          if (genreSelector.current && !genreSelector.current.contains(event.target)) {
            setShowOptions(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      React.useEffect(() => {
        setSelectedOption(values.findIndex(value => value == selectedValue));
      }, [selectedValue])


    return (
        <div ref={genreSelector} className='all_container'>
            <div className='genre_selector_container'>
                <div className='genre_selector_button' tabindex="0" onClick={() => setShowOptions(!showOptions)}>
                    <h4>{values[selectedOption]}</h4>
                    <img className='down_logo' src={downIcon} alt="" />
                </div>
                {showOptions &&
                    <div className='options_container'>
                        {values.map((value, key) => <option className='option' 
                        value={value} 
                        onClick={(event) => {
                            onChange(event);
                            setSelectedOption(key); 
                            setShowOptions(false);
                        }}>{value}</option>)}
                    </div>
                }
            </div>
            
        </div>
        
    )
}

export {GenreSelector};