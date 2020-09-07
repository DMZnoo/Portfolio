import React, {useState,useEffect} from 'react';
import hobbiesConfig from './config/hobbiesConfig.json'
const Hobbies = () => {
    const [isConfig, SetConfig] = useState(hobbiesConfig);
    const [isShown, SetShown] = useState([false,false,false,false]);
    useEffect(()=>{
        for(let i in hobbiesConfig) {
            SetShown(isShown => [...isShown, false])
        }
    },[])



    return (
        <>
            {isConfig.map((config,idx) => {
                return (
                    <div onClick={() => {
                        SetShown(isShown => [...isShown.slice(0, idx), !isShown[idx], ...isShown.slice(idx + 1)])
                    }}>
                        <div className={`ui center ${config.segmentColor} segment`}
                        >
                            <h3>
                                <>
                                {config.image ? (
                                    <img src={`${config.ImageICON}`}
                                         style={{width: "1.5em", paddingRight: "0.3em", height: "1em"}}/>
                                ) :(
                                    <i className={`${config.icon} icon`}/>
                                )
                                }
                                </>
                                <>
                                {config.hobby}
                                {!isShown[idx] ?(
                                    <i className={`angle down icon`}/>

                                ) : (
                                    <i className={`angle up icon`}/>
                                )
                                }
                                </>
                            </h3>
                            {isShown[idx] && (
                                <div className="ui center"><p>{config.content}</p></div>
                            )}
                        </div>

                    </div>
                )
            })
            }
        </>
    )
}

export default Hobbies;
