import React, {useState} from 'react';

const Hobbies = () => {
    const [isShown, SetShown] = useState(0);
    const [isToggled,SetToggle] = useState('down');
    const handleClick=(num,arrow)=>{
        if(num === 0)
            SetToggle('down');
        else
            SetToggle("up");
        SetShown(num);
    };
    return(
        <div>
            <h2 className="ui header">Favorite Activities</h2>
            <div className="ui center red segment"
                 onMouseEnter={() => handleClick(1)}
                 onMouseLeave={() => handleClick(0)}
                 onClick={()=>handleClick(0)}
            >
                <h3><i className="heartbeat icon"></i>Gym
                    {isShown===1 && (
                        <i className={`angle ${isToggled} icon`}></i>
                    )
                    }
                    {isShown!==1 && (
                        <i className={`angle down icon`}></i>
                    )
                    }
                </h3>
                {isShown===1 && (

                    <div className="ui center"><p>I've been into weight lifting for 10+ years. Les Mills member since 2 0 1 8! :)</p></div>
                )}
            </div>
            <div className="ui center purple segment"
                 onMouseEnter={() => handleClick(2)}
                 onMouseLeave={() => handleClick(0)}
                 onClick={()=>handleClick(0)}
            >
                <h3><i className="music icon"></i>Piano
                    {isShown===2 && (
                        <i className={`angle ${isToggled} icon`}></i>
                    )
                    }
                    {isShown!==2 && (
                        <i className={`angle down icon`}></i>
                    )
                    }
                </h3>
                {isShown===2 && (
                    <div className="ui center"><p>I've always been into music and had recently picked up piano as a hobby :)</p></div>
                )}
            </div>
            <div className="ui center blue segment"
                 onMouseEnter={() => handleClick(3)}
                 onMouseLeave={() => handleClick(0)}
                 onClick={()=>handleClick(0)}
            >
                <h3><img src={require('../resources/swimming.png')} style={{width:"1.5em",paddingRight:"0.3em",height:"1em"}}/>Swimming
                    {isShown===3 && (
                        <i className={`angle ${isToggled} icon`}></i>
                    )
                    }
                    {isShown!==3 && (
                        <i className={`angle down icon`}></i>
                    )
                    }
                </h3>
                {isShown===3 && (
                    <div className="ui center"><p>Swimmer since I was 9. Definitely not afraid of the water :)</p></div>
                )}

            </div>
            <div className="ui center yellow segment"
                 onMouseEnter={() => handleClick(4)}
                 onMouseLeave={() => handleClick(0)}
                 onClick={()=>handleClick(0)}
            >
                <h3><img src={require('../resources/Electronic_Music.png')} style={{width:"1.5em",paddingRight:"0.3em",height:"1em"}}/>Electronic Music
                    {isShown===4 && (
                        <i className={`angle ${isToggled} icon`}></i>
                    )
                    }
                    {isShown!==4 && (
                        <i className={`angle down icon`}></i>
                    )
                    }
                </h3>
                {isShown===4 && (
                    <div className="ui center"><p>I find it great for programming. I've also gone to several raves/festivals.</p></div>
                )}
            </div>
        </div>
    )
};

export default Hobbies;
