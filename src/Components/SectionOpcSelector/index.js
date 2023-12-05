import { useNavigate } from 'react-router-dom';
import './SectionOpcSelector.css'
import React from 'react';

function SectionOpcSelector(props){
    const cantSections = props.cantShows/42;
    const sections = [];
    const navigate = useNavigate();
    const myElementRef = React.useRef(null);

    for (let i = 0; i < cantSections; i++) {
        sections.push(i+1);
    }

    const [xSlide, setXSlide] = React.useState(0);

    const setSectionSelector= (sectionValue) => {
        const section_container = document.querySelector('.section_opc_container');
        const scWidth = getComputedStyle(section_container).width;
        console.log(sectionValue);
        console.log(Math.round(scWidth.substring(0, scWidth.length - 2)/55)/2);
        const xSlide = (sectionValue - 1 - Math.round(scWidth.substring(0, scWidth.length - 2)/55)/2) * -55;
        if(sectionValue > Math.round(scWidth.substring(0, scWidth.length - 2)/55)/2){
            setXSlide(xSlide);
        } else {
            setXSlide(0);
        }
    }

    React.useEffect(() => {
        setSectionSelector(props.section)
    }, [props.section]);

    return (
        <div className='section_opc_container'>
            <ul className='opc_container' style={{transform: 'translateX('+xSlide+'px)'}} ref={myElementRef}>
                {sections.map(section =>  
                <li className={section == props.section ? 'sections_opc sections_opc_selected' : 'sections_opc'}
                    onClick={(event) => {
                        window.scrollTo(0, 0);
                        navigate('/?section='+event.target.innerHTML);
                        setSectionSelector(event.target.innerHTML);
                        // const section_container = document.querySelector('.section_opc_container');
                        // const scWidth = getComputedStyle(section_container).width;
                        // console.log(scWidth);
                        // console.log(Math.round(scWidth.substring(0, scWidth.length - 2)/55) + 15/2);
                        // const opc_container = document.querySelector('.opc_container');
                        // const xSlide = (event.target.innerHTML - 1 - Math.round(scWidth.substring(0, scWidth.length - 2)/55)/2) * -55;
                        // console.log(xSlide);
                        // if(event.target.innerHTML > Math.round(scWidth.substring(0, scWidth.length - 2)/55)/2){
                        //     opc_container.style.transform = "translateX("+xSlide+"px)";
                        // } else {
                        //     opc_container.style.transform = "translateX("+0+"px)";
                        // }
                    }
                    }
                >{section}</li>)}
            
                {/* <li className='sections_opc'
                onClick={(event) => {
                    props.setSection(event.target.innerHTML);
                    }
                }
                >2</li>
                <li className='sections_opc'
                onClick={(event) => {
                    props.setSection(event.target.innerHTML);
                    }
                }
                >3</li> */}
            </ul>
        </div>
    )
}

export {SectionOpcSelector}