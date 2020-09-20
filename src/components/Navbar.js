import React, { useEffect, useState, useMemo } from "react";
import { ReactNavbar } from "react-responsive-animate-navbar";
import logo from "../resources/logo-removebg-preview.png";
const Navbar = () => {
  const [isHovered, SetHovered] = useState(false);
  function onScroll(to) {
    window.scroll({
      top: to,
      behavior: "smooth",
    });
  }
  useMemo(() => {
    let childId = ["aboutme", "aboutme", "project", "contact"];
    const mainNavChildren = document.querySelectorAll(
      "html body .styles_navLinks__38tON ul li a"
    );
    const mobileNavChildren = document.querySelectorAll(
      "html body .MobileNav_MoNavLinks__mNUdF ul li a"
    );
    if (isHovered) {
      let index = 0;
      if (typeof mainNavChildren !== "undefined" && mainNavChildren.length) {
        console.log(mainNavChildren[0].getAttribute("listener"));
        childId.forEach((id) => {
          if (index === 0) {
            mainNavChildren[index].addEventListener("click", (e) =>
              onScroll(0)
            );
            mainNavChildren[index].addEventListener("touchmove", (e) =>
              onScroll(0)
            );
          } else {
            mainNavChildren[index].addEventListener("click", (e) =>
              onScroll(
                document.getElementById(id).getBoundingClientRect().top +
                  window.pageYOffset
              )
            );
            mainNavChildren[index].addEventListener("touchmove", (e) =>
              onScroll(
                document.getElementById(id).getBoundingClientRect().top +
                  window.pageYOffset
              )
            );
          }
          index++;
        });
      }

      if (
        typeof mobileNavChildren !== "undefined" &&
        mobileNavChildren.length
      ) {
        childId.forEach((id) => {
          if (index === 0) {
            mobileNavChildren[index].addEventListener("click", (e) =>
              onScroll(0)
            );
            mobileNavChildren[index].addEventListener("touchmove", (e) =>
              onScroll(0)
            );
          } else {
            mobileNavChildren[index].addEventListener("click", (e) =>
              onScroll(
                document.getElementById(id).getBoundingClientRect().top +
                  window.pageYOffset -
                  55
              )
            );
            mobileNavChildren[index].addEventListener("touchmove", (e) =>
              onScroll(
                document.getElementById(id).getBoundingClientRect().top +
                  window.pageYOffset -
                  55
              )
            );
          }
          index++;
        });
      }
    }
  }, [isHovered]);
  return (
    <div
      className="navbar-wrapper"
      onMouseEnter={() => SetHovered(true)}
      onMouseLeave={() => SetHovered(false)}
      onClick={() => SetHovered(true)}
    >
      <ReactNavbar
        color="rgb(25,100,50)"
        logo={logo}
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
          },
        ]}
      />
    </div>
  );
};
export default Navbar;
