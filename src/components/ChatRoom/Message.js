import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 37px;
  }
`;

const ImageSend = styled.img`
  max-width: 85%;
  height: auto;
  @media (min-width: 768px) {
    max-width: 768px;
    height: auto;
  }
`;

const VideoSend = styled.video`
  max-width: 85%;
  height: auto;
`;

function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({
  text,
  displayName,
  createdAt,
  photoURL,
  linkImage,
}) {
  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {" "}
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
        {linkImage.includes('.mp4') || linkImage.includes('.mkv') ? (
          <VideoSend src={linkImage} controls="controls" autoplay="true" />
        ) : (
          <ImageSend src={linkImage} alt="khong co image" />
        )}
      </div>
    </WrapperStyled>
  );
}
