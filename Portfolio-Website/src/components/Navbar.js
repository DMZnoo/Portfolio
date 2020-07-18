import React, {useEffect, useState} from 'react'
import {ReactNavbar} from "react-responsive-animate-navbar";

const Navbar = () => {
    // const didMountRef = useRef(false);
    // useEffect( () => {
    //     if (didMountRef.current) {
    //
    //         document.querySelectorAll("html body .styles_navLinks__38tON ul li")[0].addEventListener('click', e=>{
    //             window.scrollTo({
    //                 top: 400,
    //                 behavior: 'smooth',
    //             });
    //             console.log("HOME");
    //         });
    //     } else
    //     {
    //         didMountRef.current = true;
    //         console.log("HERE")
    //     }
    //
    //
    // });
    const [isHovered,SetHovered] = useState(false);
    useEffect(() => {
        let childId = ['aboutme','aboutme','project','contact'];
        const mainNavChildren = document.querySelectorAll("html body .styles_navLinks__38tON ul li a");
        const mobileNavChildren = document.querySelectorAll("html body .MobileNav_MoNavLinks__mNUdF ul li a")
        if(isHovered) {

            let index = 0;
            if(typeof(mainNavChildren) !== 'undefined' && mainNavChildren.length)
            {
                childId.forEach((id)=>{
                    if(index===0)
                    {
                        mainNavChildren[index].addEventListener('click', (e) => {
                                window.scroll({
                                    top: 0,
                                    behavior: 'smooth',
                                });

                            }

                        );
                    } else
                    {
                        mainNavChildren[index].addEventListener('click', (e) => {
                                window.scroll({
                                    top: document.getElementById(id).getBoundingClientRect().top +  window.pageYOffset - 55,
                                    behavior: 'smooth',
                                });

                            }

                        );
                    }
                    index++;
                });
            }

            if(typeof(mobileNavChildren) !== 'undefined' && mobileNavChildren.length)
            {
                childId.forEach((id) => {
                    if (index === 0) {
                        mobileNavChildren[index].addEventListener('click', (e) => {

                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });

                            }
                        );
                    } else {
                        mobileNavChildren[index].addEventListener('click', (e) => {

                                window.scrollTo({
                                    top: document.getElementById(id).getBoundingClientRect().top + window.pageYOffset - 55,
                                    behavior: 'smooth',
                                });

                            }
                        );
                    }
                    index++;
                });
            }

        }

    });
    return (
        <div
            onMouseEnter={()=>SetHovered(true)}
            onMouseLeave={()=>SetHovered(false)}
        >
        <ReactNavbar
            color="rgb(25,100,50)"
            logo='logo-removebg-preview.png'

            menu={[
                { name: "HOME", to: "/" },
                { name: "ABOUT ME", to: "/" },
                { name: "PROJECT", to: "/" },
                { name: "CONTACT", to: "/" },
            ]}
            social={[
                {
                    name: "Linkedin",
                    url: "https://www.linkedin.com/in/daniel-lee-00991085",
                    icon: ["fab", "linkedin-in"],
                },
                {
                    name: "Github",
                    url: "https://github.com/DMZnoo",
                    icon: ["fab", "github"],
                }
            ]}

        />
        </div>
    )
};
export default Navbar;
