import { text } from "@client/components/primitives";
import React, { ReactNode, useMemo } from "react";
import { IPersonalInfo } from "../types";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { ImageProps, Image as NUIImage } from "@nextui-org/image";
import Image from "next/image";
import { tv } from "@nextui-org/theme";
import clsx from "clsx";
import { Avatar, AvatarProps } from "@nextui-org/avatar";
import {
  Facebook,
  GithubCircle,
  Iconoir,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "iconoir-react";

type PersonalInfoProps = {
  classNames?: {
    base?: string;
    nameText?: string;
    titleText?: string;
    avatar?: string;
    contactInfo?: string;
    profileWrapper?: string;
    textsWrapper?: string;
    summary?: string;
    summaryWrapper?: string;
    socialLinkWrapper?: string;
    renderLinkWrapper?: string;
  };
  as?: keyof HTMLElementTagNameMap;
  avatarEnabled?: boolean;
  summaryEnabled?: boolean;
  avatarMode?: "avatar" | "image";
  imageProps?: ImageProps;
  avatarProps?: AvatarProps;
  renderSocial?: boolean;
  socialLinkPosition: "right" | "bottom";
};

function PersonalInfo({
  classNames = {},
  as = "div",
  avatarEnabled = false,
  summaryEnabled = false,
  avatarMode = "avatar",
  avatarProps,
  imageProps,
  renderSocial = false,
  socialLinkPosition = "right",
}: PersonalInfoProps) {
  const {
    base,
    nameText,
    titleText,
    avatar,
    contactInfo,
    profileWrapper,
    textsWrapper,
    summary,
    summaryWrapper,
    socialLinkWrapper,
    renderLinkWrapper,
  } = classNames!;
  const personalInfoVariants = useMemo(
    () =>
      tv({
        slots: {
          base: clsx("", base),
          profileWrapper: clsx("", profileWrapper),
          nameText: clsx("", nameText),
          textsWrapper: clsx("", textsWrapper),
          titleText: clsx("", titleText),
          avatar: clsx("", avatar),
          contactInfo: clsx("", contactInfo),
          summary: clsx("", summary),
          summaryWrapper: clsx("", summaryWrapper),
          socialLinkWrapper: clsx(
            "flex justify-between gap-3",
            socialLinkWrapper
          ),
          renderLinkWrapper: clsx("flex gap-3 items-top", renderLinkWrapper),
        },
      }),
    [
      base,
      nameText,
      titleText,
      avatar,
      contactInfo,
      profileWrapper,
      textsWrapper,
      summary,
      summaryWrapper,
      socialLinkWrapper,
      renderLinkWrapper,
    ]
  );
  const Component = as;
  const slots = personalInfoVariants.slots;
  return (
    <Component className={slots.base}>
      <div id="socialLink" className={slots.socialLinkWrapper}>
        <div className={slots.profileWrapper}>
          {avatarEnabled && avatarMode === "avatar" ? (
            <Avatar
              {...avatarProps}
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          ) : (
            <NUIImage
              {...imageProps}
              as={Image}
              alt="Resume Avatar"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            />
          )}

          <div className={slots.textsWrapper}>
            <div className={slots.nameText}>John Doe</div>
            <div className={slots.titleText}>Technext Ltd.</div>
          </div>
        </div>
        {renderSocial && socialLinkPosition === "right" && (
          <RenderSocialLinks
            position={socialLinkPosition}
            socialLinks={[
              { link: "", name: "Github" },
              { link: "", name: "YouTube" },
              { link: "", name: "LinkedIn" },
              { link: "", name: "Twitter" },
            ]}
            renderLinkWrapper={slots.renderLinkWrapper}
          />
        )}
      </div>

      {summaryEnabled && (
        <div className={slots.summaryWrapper}>
          <p className={slots.summary}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit in
            sint rem dolore, sed at tempore temporibus blanditiis maiores nobis
            quod quaerat. Aliquid molestiae temporibus illum esse ullam nihil
            assumenda!
          </p>
        </div>
      )}
      {renderSocial && socialLinkPosition === "bottom" && (
        <RenderSocialLinks
          position={socialLinkPosition}
          socialLinks={[
            { link: "", name: "Github" },
            { link: "", name: "YouTube" },
            { link: "", name: "LinkedIn" },
            { link: "", name: "Twitter" },
          ]}
          renderLinkWrapper={slots.renderLinkWrapper}
        />
      )}
    </Component>
  );
}

const iconMap = {
  github: <GithubCircle />,
  linkedin: <LinkedIn />,
  twitter: <Twitter />,
  facebook: <Facebook />,
  instagram: <Instagram />,
  youtube: <YouTube />,
  other: <Iconoir />,
};

function RenderSocialLinks({
  socialLinks,
  renderLinkWrapper,
  position,
}: {
  socialLinks?: { name: string; link: string }[];
  renderLinkWrapper?: string;
  position: "right" | "bottom";
}) {
  console.log(renderLinkWrapper);

  return (
    <ul
      className={
        position === "bottom"
          ? "flex flex-row gap-3 pt-2 border-t-1"
          : "flex flex-col"
      }
    >
      {socialLinks?.map(({ link, name }, index) => (
        <li className={renderLinkWrapper} key={index}>
          <div>{iconMap[name.toLowerCase() as keyof typeof iconMap]}</div>{" "}
          <div>{name}</div>
        </li>
      ))}
    </ul>
  );
}

export default PersonalInfo;
