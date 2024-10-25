import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./footer.module.css";
import instaLogo from "@/public/insta_logo.svg";
import fbLogo from "@/public/fb_logo.svg";
import twitter from "@/public/twitter.svg";
import ytLogo from "@/public/youtube.svg";
import location from "@/public/location.svg";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.grid_col_three}>
        <div className={classes.categoriesFooter}>
          <h3>Shop by category</h3>
          <Link href="/categories/Accessories">Accessories</Link>
          <Link href="/categories/Shoes">Shoes</Link>
          <Link href="/categories/Clothing">Clothing</Link>
        </div>
        <div>
          <h3>About</h3>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact us</Link>
          <Link href="/career">Career</Link>
        </div>
        <div>
          <h3>Policy</h3>
          <Link href="/">Return Policy</Link>
          <Link href="/">Terms of Use</Link>
          <Link href="/">Sitemap</Link>
          <Link href="/">Security</Link>
          <Link href="/">Privacy</Link>
          <Link href="/">EPR Compliance</Link>
        </div>
      </div>
      <div>
        <div className={classes.socMediaandRights}>
          <div className={classes.iconsFooter}>
            <Link href="/">
              <Image alt="fb logo" src={fbLogo} />
            </Link>
            <Link href="/">
              <Image alt="instagram logo" src={instaLogo} />
            </Link>
            <Link href="/">
              <Image alt="twitter logo" src={twitter} />
            </Link>
            <Link href="/">
              <Image alt="Youtube logo" src={ytLogo} />
            </Link>
          </div>
          <span>
            <span>
              <Image
                alt="location logo"
                width={20}
                height={20}
                src={location}
              />
            </span>
            <span>United States</span>
          </span>
          <div>
            <span> &copy;2021</span>
            <span>|</span>
            <span>MarkDev All Rights Reserved </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
