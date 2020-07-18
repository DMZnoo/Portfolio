import React, {useState} from 'react';

const NavbarTransitionFix = () => {
    const [showScroll, setShowScroll] = useState(true);

    const checkScrollTop = () => {
        if (window.scrollY === 0){
            setShowScroll(true);
        } else
        {
            setShowScroll(false);
        }
    };
    window.addEventListener('scroll', checkScrollTop);

    return(
        <div>
            {showScroll && (
                <div className="max-screen-navbar" style={{width:"100vw",height:"20vh",position:"absolute",backgroundColor:"rgb(25,100,50)",top:0}}></div>
            )
            }
        </div>
    )
};
export default NavbarTransitionFix;
