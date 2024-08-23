import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Navbar.module.css";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";

const Navbar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "/alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USE",
      link: "/",
    },
  ];

  //USESTATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, error, createAccount } =
    useContext(ChatAppContect);

  // useEffect(() => {
  //   console.log(open);
  // }, [open]);

  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        <div className={Style.Navbar_box_left}>
          <Image src={images.logo} alt="logo" wdith={50} height={50} />
        </div>
        <div className={Style.Navbar_box_right}>
          {/* //DESKTOP */}
          <div className={Style.Navbar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.Navbar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.Navbar_box_right_menu_items_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* //MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} ${
                    active == i + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}
              <div className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          )}

          {/* //Connect wallet */}
          <div className={Style.Navbar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                {""}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          <div className={Style.Navbar_box_right_open}>
            <Image
              src={images.open}
              alt="open"
              width={30}
              height={30}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* //Model Component */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Explore the Sepolia network to find and connect with friends. Start chatting and make new connections today!"
            smaLLInfo="Kindly select your name..."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default Navbar;
