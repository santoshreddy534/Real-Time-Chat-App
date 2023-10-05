import { useContext } from "react";
import {Container, Stack} from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import UserChat from "../components/chat/userChat";

const Chat =()=>{
  const {user} = useContext(AuthContext);
  const {userChats, isUserChatsLoading, userChatsError} = useContext(ChatContext);
  return (
    <Container>{userChats?.length < 1 ? null : 
    (<Stack>
      <Stack direction="horizontal" gap={4} className="align-items-start">
        <Stack className=" messages-box flex-grow-0 pe-3" gap={3}>
        {isUserChatsLoading && <p>Loading chats...</p>}
        {userChats?.map((chat, index)=>{
          return(
            <div key={index}>
              <UserChat chat={chat} user={user} />
            </div>
          )
        })}
        </Stack>
        <p>ChatBox</p>
      </Stack>
    </Stack>)}</Container>
  )
}
export default Chat;