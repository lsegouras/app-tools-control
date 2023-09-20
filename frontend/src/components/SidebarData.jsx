import React from "react";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Mechanics",
    path: "/mechanics",
    icon: <BiIcons.BiSolidCarMechanic />,
  },
  {
    title: "Tools",
    path: "/tools",
    icon: <BsIcons.BsTools />,
  },
  {
    title: "Loans",
    path: "/loans",
    icon: <FaIcons.FaHandHolding />,
  },
];
