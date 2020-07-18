import React, {useState} from 'react';

const Hobbies = () => {
    const [isShown, SetShown] = useState(0);

    return(
        <div>
            <h2 className="ui header">Favorite Activities</h2>
            <div className="ui center red segment"
                 onMouseEnter={() => SetShown(1)}
                 onMouseLeave={() => SetShown(0)}
            >
                <h3><i className="heartbeat icon"></i>Gym</h3>
                {isShown===1 && (
                    <div className="ui center"><p>I've been into weight lifting for 10+ years. Les Mills member since 2 0 1 8! :)</p></div>
                )}
            </div>
            <div className="ui center purple segment"
                 onMouseEnter={() => SetShown(2)}
                 onMouseLeave={() => SetShown(0)}
            >
                <h3><i className="music icon"></i>Piano</h3>
                {isShown===2 && (
                    <div className="ui center"><p>I've always been into music and had recently picked up piano as a hobby :)</p></div>
                )}
            </div>
            <div className="ui center blue segment"
                 onMouseEnter={() => SetShown(3)}
                 onMouseLeave={() => SetShown(0)}
            >
                <h3><img src={require('../resources/swimming.png')} style={{width:"1.5em",paddingRight:"0.3em",height:"1em"}}/>Swimming</h3>
                {isShown===3 && (
                    <div className="ui center"><p>I'm not afraid of the water, but I don't think I can play water polo for hours :)</p></div>
                )}
            </div>
            <div className="ui center yellow segment"
                 onMouseEnter={() => SetShown(4)}
                 onMouseLeave={() => SetShown(0)}
            >
                <h3><img src={require('../resources/Electronic_Music.png')} style={{width:"1.5em",paddingRight:"0.3em",height:"1em"}}/>Electronic Music</h3>
                {isShown===4 && (
                    <div className="ui center"><p>Electronic Music + Programming + Coffee/Tea = Golden ratio for productivity. I've also gone to several raves/festivals, such as Ultra festival.</p></div>
                )}
            </div>
        </div>
    )
};

export default Hobbies;
