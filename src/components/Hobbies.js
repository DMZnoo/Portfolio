import React, {useState} from 'react';

const Hobbies = ({config}) => {
    const [isShown, SetShown] = useState(false);
    const [isToggled,SetToggle] = useState('down');
    const handleClick=(bool)=>{
        if(bool)
            SetToggle('up');
        else
            SetToggle("down");
        SetShown(bool);
    };
    return(
        <div>
            <div className={`ui center ${config.segmentColor} segment`}
                 onMouseEnter={() => handleClick(true)}
                 onMouseLeave={() => handleClick(false)}
                 onClick={()=>handleClick(!isToggled)}
            >
                <h3>
                    {!config.image && (
                        <i className={`${config.icon} icon`}></i>
                    )
                    }
                    {config.image && (
                        config.ImageICON
                    )
                    }
                    {config.hobby}
                    {!isShown && (
                        <i className={`angle ${isToggled} icon`}></i>
                    )
                    }
                    {isShown && (
                        <i className={`angle ${isToggled} icon`}></i>
                    )
                    }
                </h3>
                {isShown && (
                    <div className="ui center"><p>{config.content}</p></div>
                )}
            </div>

        </div>
    )
};

export default Hobbies;
