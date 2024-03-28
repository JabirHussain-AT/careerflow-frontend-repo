import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { SaveChatMessagesPayload } from "@/components/helper/interfaces";
import { ChatSecUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";



//for creating a chat room with the user
export const createNewChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async  ( chatRoomData : {roomCreater : string , roomJoiner : string } , { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${ChatSecUrl}/room/creat-chat-room`,
        chatRoomData,
        config
      );
      return data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);



export const saveChatMessages = createAsyncThunk(
  "chat/saveChatMessages",
  async (chatMessage: SaveChatMessagesPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${ChatSecUrl}/message/save-message`,
        chatMessage,
        config
      );
      return data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const fetchChatUsers = createAsyncThunk(
  "chat/fetchChatUsers",
  async (
    { companyId, limit }: { companyId: string; limit: number | string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `${ChatSecUrl}/room/fetch-chat-users/${companyId}/${limit}`,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const fetchChatUserChat = createAsyncThunk(
  "chat/fetchChatUserChat",
  async (
    { senderId, recieverId }: { senderId: string; recieverId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `${ChatSecUrl}/message/fetch-chat-userChat/${senderId}/${recieverId}`,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const getUnreadMessageCount = async (applicantIds: string[]) => {
  try {
    const { data } = await axios.post(
      `${ChatSecUrl}/message/unread-messages-count`,
      applicantIds,
      config
    );
    return data;
  } catch (err) {
    console.log(err, "==> error get unread message ");
  }
};

export const updateUnreadMessageCount = createAsyncThunk(
  "chat/updateUnreadMessageCount",
  async (applicantId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${ChatSecUrl}/message/update-unread-messages/${applicantId}`,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
